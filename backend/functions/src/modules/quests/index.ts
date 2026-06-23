import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db, FieldValue, Timestamp } from "../../utils/firebase";
import { requireAuth, assertString, assertLatLng } from "../../utils/validation";
import { encodeGeohash, geohashQueryRange, distanceMeters } from "../../utils/geo";
import { generateVoucherCode, generateRedemptionToken } from "../../utils/crypto";
import type { Quest, JigsawPiece, JigsawCollection, Voucher } from "../../types";

const DEFAULT_SCOUT_RADIUS_M = 2000;
const MAX_SCOUT_RADIUS_M = 5000;
const CHECKIN_MAX_DISTANCE_M = 100;
const JIGSAW_PIECES_PER_COLLECTION = 6;
const VOUCHER_VALUE_THB = 100;
const VOUCHER_VALIDITY_DAYS = 30;

// ─────────────────────────────────────────────
// PET SCOUT — Jigsaw Scout
// ─────────────────────────────────────────────

export const scoutJigsawPieces = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;
  const { lat, lng } = assertLatLng(req.data?.lat, req.data?.lng);
  const radius = Math.min(req.data?.radius ?? DEFAULT_SCOUT_RADIUS_M, MAX_SCOUT_RADIUS_M);

  const { start, end } = geohashQueryRange(lat, lng, radius, 6);
  const snap = await db
    .collection("quests")
    .where("type", "==", "jigsaw")
    .where("status", "==", "available")
    .where("location.geohash", ">=", start)
    .where("location.geohash", "<=", end)
    .limit(20)
    .get();

  const now = Date.now();
  const active = snap.docs
    .map((d) => d.data() as Quest)
    .filter((q) => q.expiresAt === null || q.expiresAt > now);

  if (active.length === 0) return { pieces: [] };

  // Filter out pieces already collected by this user
  const completionChecks = await Promise.all(
    active.map((q) =>
      db.collection("user_quest_completions").doc(`${uid}_${q.questId}`).get()
    )
  );

  const pieces = active
    .filter((_, i) => !completionChecks[i].exists)
    .map((q) => ({
      questId: q.questId,
      location: q.location,
      distance: distanceMeters(lat, lng, q.location.lat, q.location.lng),
      pieceLabel: q.reward.jigsawPieceId ?? "piece",
      title: q.title,
    }))
    .filter((p) => p.distance <= radius)
    .sort((a, b) => a.distance - b.distance);

  return { pieces };
});

// ─────────────────────────────────────────────
// CHECK-IN
// Validates GPS, awards jigsaw piece, auto-generates Voucher on 6/6
// ─────────────────────────────────────────────

export const checkInToQuest = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;
  const questId = assertString(req.data?.questId, "questId");
  const { lat, lng } = assertLatLng(req.data?.lat, req.data?.lng);

  const questSnap = await db.collection("quests").doc(questId).get();
  if (!questSnap.exists) throw new HttpsError("not-found", "Quest not found");
  const quest = questSnap.data() as Quest;

  if (quest.status !== "available") {
    throw new HttpsError("failed-precondition", "Quest is not available");
  }
  if (quest.expiresAt !== null && quest.expiresAt < Date.now()) {
    throw new HttpsError("failed-precondition", "Quest has expired");
  }

  const distance = distanceMeters(lat, lng, quest.location.lat, quest.location.lng);
  if (distance > CHECKIN_MAX_DISTANCE_M) {
    throw new HttpsError(
      "failed-precondition",
      `You are ${Math.round(distance)}m away. Must be within ${CHECKIN_MAX_DISTANCE_M}m.`
    );
  }

  // jigsawPieceId format: "{theme}:{pieceIndex}" e.g. "chonburi_summer:3"
  const jigsawPieceId = quest.reward.jigsawPieceId ?? "default:1";
  const colonIdx = jigsawPieceId.lastIndexOf(":");
  const theme = colonIdx > 0 ? jigsawPieceId.slice(0, colonIdx) : "default";
  const pieceIndex = colonIdx > 0 ? parseInt(jigsawPieceId.slice(colonIdx + 1), 10) || 1 : 1;

  const completionRef = db.collection("user_quest_completions").doc(`${uid}_${questId}`);
  const collectionRef = db.collection("jigsaw_collections").doc(`${uid}_${theme}`);

  let voucherIssued: (Voucher & { rawToken: string }) | null = null;
  let finalCollection: JigsawCollection | null = null;

  await db.runTransaction(async (tx) => {
    const [completionSnap, collectionSnap, userSnap] = await Promise.all([
      tx.get(completionRef),
      tx.get(collectionRef),
      tx.get(db.collection("users").doc(uid)),
    ]);

    if (completionSnap.exists) {
      throw new HttpsError("already-exists", "Quest already completed");
    }
    if (!userSnap.exists) throw new HttpsError("not-found", "User not found");

    const existingCollection = collectionSnap.exists
      ? (collectionSnap.data() as JigsawCollection)
      : null;

    if (existingCollection?.isComplete) {
      throw new HttpsError("failed-precondition", "This jigsaw collection is already complete");
    }

    const collectedPieces = (existingCollection?.collectedPieces ?? 0) + 1;
    const isComplete = collectedPieces >= JIGSAW_PIECES_PER_COLLECTION;
    const now = Timestamp.now();
    const collectionId = `${uid}_${theme}`;

    // Write jigsaw piece
    const pieceRef = db.collection("jigsaws").doc();
    const piece: JigsawPiece = {
      jigsawId: pieceRef.id,
      userId: uid,
      collectionId,
      pieceIndex,
      collectedAt: now.toMillis(),
      location: { lat, lng, geohash: encodeGeohash(lat, lng) },
      questId,
    };
    tx.set(pieceRef, piece);

    // Upsert collection
    const collection: JigsawCollection = {
      collectionId,
      userId: uid,
      theme,
      totalPieces: JIGSAW_PIECES_PER_COLLECTION,
      collectedPieces,
      isComplete,
      voucherIdGenerated: existingCollection?.voucherIdGenerated ?? null,
      startedAt: existingCollection?.startedAt ?? now.toMillis(),
      completedAt: isComplete ? now.toMillis() : null,
    };

    if (isComplete) {
      const { raw, hash } = generateRedemptionToken();
      const code = generateVoucherCode();
      const voucherRef = db.collection("vouchers").doc();
      const expiresAt = now.toMillis() + VOUCHER_VALIDITY_DAYS * 86_400_000;

      const voucher: Voucher = {
        voucherId: voucherRef.id,
        code,
        userId: uid,
        merchantId: null,
        value: VOUCHER_VALUE_THB,
        title: `ครบชุด ${theme}!`,
        description: `รางวัลจากการสะสมจิ๊กซอว์ชุด "${theme}" ครบ ${JIGSAW_PIECES_PER_COLLECTION} ชิ้น`,
        status: "active",
        redemptionToken: hash,
        collectionId,
        generatedAt: now.toMillis(),
        expiresAt,
        redeemedAt: null,
        redeemedByMerchantId: null,
      };

      tx.set(voucherRef, voucher);
      // Store raw token in a separate private collection (never queried in bulk)
      tx.set(db.collection("voucher_tokens").doc(voucherRef.id), {
        raw,
        createdAt: now,
        used: false,
      });

      collection.voucherIdGenerated = voucherRef.id;
      voucherIssued = { ...voucher, rawToken: raw };
    }

    tx.set(collectionRef, collection);
    tx.set(completionRef, { uid, questId, completedAt: now, collectionId, pieceIndex });
    tx.update(db.collection("users").doc(uid), {
      xp: FieldValue.increment(quest.reward.xp + (isComplete ? 50 : 0)),
      lastActiveAt: FieldValue.serverTimestamp(),
    });

    finalCollection = collection;
  });

  return {
    success: true,
    rewardGranted: { jigsawPieceId, xp: quest.reward.xp },
    collection: finalCollection,
    voucherIssued,
  };
});

// ─────────────────────────────────────────────
// MY COLLECTIONS
// ─────────────────────────────────────────────

export const getMyCollections = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;

  const snap = await db
    .collection("jigsaw_collections")
    .where("userId", "==", uid)
    .orderBy("startedAt", "desc")
    .limit(20)
    .get();

  return { collections: snap.docs.map((d) => d.data()) };
});

export const getMyQuestHistory = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;

  const snap = await db
    .collection("user_quest_completions")
    .where("uid", "==", uid)
    .orderBy("completedAt", "desc")
    .limit(50)
    .get();

  return { history: snap.docs.map((d) => d.data()) };
});
