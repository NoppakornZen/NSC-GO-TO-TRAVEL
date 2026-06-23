import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db, FieldValue, Timestamp } from "../../utils/firebase";
import { requireAuth, assertString, assertLatLng, assertNumber } from "../../utils/validation";
import { encodeGeohash } from "../../utils/geo";
import type { Merchant } from "../../types";

// ─────────────────────────────────────────────
// REGISTER MERCHANT
// ─────────────────────────────────────────────

export const registerMerchant = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;

  const name = assertString(req.data?.name, "name");
  const description = assertString(req.data?.description, "description");
  const category = assertString(req.data?.category, "category") as Merchant["category"];
  const address = assertString(req.data?.address, "address");
  const { lat, lng } = assertLatLng(req.data?.lat, req.data?.lng);

  const validCategories: Merchant["category"][] = [
    "food", "cafe", "souvenir", "experience", "accommodation", "transport",
  ];
  if (!validCategories.includes(category)) {
    throw new HttpsError("invalid-argument", `category must be one of: ${validCategories.join(", ")}`);
  }

  // One merchant per account
  const existing = await db
    .collection("merchants")
    .where("ownerId", "==", uid)
    .limit(1)
    .get();
  if (!existing.empty) {
    throw new HttpsError("already-exists", "You already have a merchant account");
  }

  const ref = db.collection("merchants").doc();
  const merchant: Merchant = {
    merchantId: ref.id,
    ownerId: uid,
    name,
    description,
    category,
    location: { lat, lng, geohash: encodeGeohash(lat, lng), address },
    voucherTypes: [],
    operatingHours: {
      open: req.data?.open ?? "09:00",
      close: req.data?.close ?? "18:00",
      daysOpen: req.data?.daysOpen ?? [1, 2, 3, 4, 5, 6],
    },
    isVerified: false,
    rating: 0,
    totalRedemptions: 0,
    createdAt: Timestamp.now().toMillis(),
  };

  await ref.set(merchant);
  return { merchantId: ref.id, merchant };
});

// ─────────────────────────────────────────────
// GET MY MERCHANT PROFILE
// ─────────────────────────────────────────────

export const getMyMerchant = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;

  const snap = await db
    .collection("merchants")
    .where("ownerId", "==", uid)
    .limit(1)
    .get();

  if (snap.empty) throw new HttpsError("not-found", "No merchant account found");
  return { merchant: snap.docs[0].data() };
});

// ─────────────────────────────────────────────
// UPDATE MERCHANT PROFILE
// ─────────────────────────────────────────────

export const updateMerchant = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;
  const merchantId = assertString(req.data?.merchantId, "merchantId");

  const snap = await db.collection("merchants").doc(merchantId).get();
  if (!snap.exists || snap.data()?.ownerId !== uid) {
    throw new HttpsError("permission-denied", "Not your merchant account");
  }

  const updates: Record<string, unknown> = {};
  if (req.data?.name) updates.name = assertString(req.data.name, "name");
  if (req.data?.description) updates.description = assertString(req.data.description, "description");
  if (req.data?.open || req.data?.close || req.data?.daysOpen) {
    const current = snap.data()!.operatingHours;
    updates.operatingHours = {
      open: req.data?.open ?? current.open,
      close: req.data?.close ?? current.close,
      daysOpen: req.data?.daysOpen ?? current.daysOpen,
    };
  }

  await db.collection("merchants").doc(merchantId).update(updates);
  return { ok: true };
});

// ─────────────────────────────────────────────
// MERCHANT REDEMPTION HISTORY
// ─────────────────────────────────────────────

export const getMerchantRedemptions = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;
  const merchantId = assertString(req.data?.merchantId, "merchantId");

  const merchantSnap = await db.collection("merchants").doc(merchantId).get();
  if (!merchantSnap.exists || merchantSnap.data()?.ownerId !== uid) {
    throw new HttpsError("permission-denied", "Not your merchant account");
  }

  const snap = await db
    .collection("economic_impacts")
    .where("merchantId", "==", merchantId)
    .orderBy("timestamp", "desc")
    .limit(50)
    .get();

  const records = snap.docs.map((d) => d.data());
  const totalRevenue = records.reduce((sum, r) => sum + (r.amount as number), 0);

  return {
    records,
    totalRevenue,
    totalRedemptions: records.length,
  };
});
