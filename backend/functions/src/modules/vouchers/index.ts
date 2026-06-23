import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db, FieldValue, Timestamp } from "../../utils/firebase";
import { requireAuth, assertString } from "../../utils/validation";
import { hashToken } from "../../utils/crypto";
import type { Voucher, EconomicImpact } from "../../types";

// ─────────────────────────────────────────────
// GET MY VOUCHERS (tourist)
// Never returns redemptionToken in list
// ─────────────────────────────────────────────

export const getMyVouchers = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;
  const status = (req.data?.status as string) ?? "active";

  const snap = await db
    .collection("vouchers")
    .where("userId", "==", uid)
    .where("status", "==", status)
    .orderBy("generatedAt", "desc")
    .limit(20)
    .get();

  return {
    vouchers: snap.docs.map((d) => {
      const { redemptionToken, ...safe } = d.data() as Voucher;
      return safe;
    }),
  };
});

// ─────────────────────────────────────────────
// GET VOUCHER QR
// Returns raw token once so tourist can show QR to merchant.
// Does NOT mark the token as "shown" — merchant redemption is what counts.
// ─────────────────────────────────────────────

export const getVoucherQR = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;
  const voucherId = assertString(req.data?.voucherId, "voucherId");

  const voucherSnap = await db.collection("vouchers").doc(voucherId).get();
  if (!voucherSnap.exists) throw new HttpsError("not-found", "Voucher not found");
  const voucher = voucherSnap.data() as Voucher;

  if (voucher.userId !== uid) throw new HttpsError("permission-denied", "Not your voucher");
  if (voucher.status !== "active") {
    throw new HttpsError("failed-precondition", `Voucher is ${voucher.status}`);
  }
  if (voucher.expiresAt < Date.now()) {
    throw new HttpsError("failed-precondition", "Voucher has expired");
  }

  const tokenSnap = await db.collection("voucher_tokens").doc(voucherId).get();
  if (!tokenSnap.exists) throw new HttpsError("internal", "Token not found");

  return {
    voucherId,
    code: voucher.code,
    rawToken: tokenSnap.data()!.raw as string,
    value: voucher.value,
    title: voucher.title,
    expiresAt: voucher.expiresAt,
  };
});

// ─────────────────────────────────────────────
// REDEEM VOUCHER (merchant)
// Atomic transaction — prevents replay attack.
// Merchant calls this after scanning tourist's QR code.
// ─────────────────────────────────────────────

export const redeemVoucher = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const merchantUid = req.auth!.uid;
  const voucherCode = assertString(req.data?.voucherCode, "voucherCode").toUpperCase();
  const rawToken = assertString(req.data?.redemptionToken, "redemptionToken");
  const merchantId = assertString(req.data?.merchantId, "merchantId");

  const merchantSnap = await db.collection("merchants").doc(merchantId).get();
  if (!merchantSnap.exists || merchantSnap.data()?.ownerId !== merchantUid) {
    throw new HttpsError("permission-denied", "Not your merchant account");
  }
  const merchantData = merchantSnap.data()!;

  const voucherQuery = await db
    .collection("vouchers")
    .where("code", "==", voucherCode)
    .limit(1)
    .get();

  if (voucherQuery.empty) throw new HttpsError("not-found", "Voucher not found");

  const voucherRef = voucherQuery.docs[0].ref;
  const tokenHash = hashToken(rawToken);

  let finalVoucher: Partial<Voucher> | null = null;
  let impactDoc: EconomicImpact | null = null;

  await db.runTransaction(async (tx) => {
    const voucherSnap = await tx.get(voucherRef);
    const voucher = voucherSnap.data() as Voucher;

    if (voucher.status !== "active") {
      throw new HttpsError("failed-precondition", `Voucher is already ${voucher.status}`);
    }
    if (voucher.expiresAt < Date.now()) {
      throw new HttpsError("failed-precondition", "Voucher has expired");
    }
    // Constant-time comparison would be ideal but Firestore hash comparison is safe here
    if (voucher.redemptionToken !== tokenHash) {
      throw new HttpsError("permission-denied", "Invalid redemption token");
    }

    const now = Timestamp.now();
    const amount = typeof req.data?.amount === "number" ? req.data.amount : voucher.value;

    tx.update(voucherRef, {
      status: "redeemed",
      redeemedAt: now,
      redeemedByMerchantId: merchantId,
    });

    const impactRef = db.collection("economic_impacts").doc();
    impactDoc = {
      impactId: impactRef.id,
      userId: voucher.userId,
      merchantId,
      voucherId: voucherRef.id,
      amount,
      category: merchantData.category,
      geohash: merchantData.location.geohash,
      province: "ชลบุรี",
      district: merchantData.location.address,
      timestamp: now.toMillis(),
    };
    tx.set(impactRef, impactDoc);

    tx.update(db.collection("users").doc(voucher.userId), {
      totalSpending: FieldValue.increment(amount),
    });
    tx.update(db.collection("merchants").doc(merchantId), {
      totalRedemptions: FieldValue.increment(1),
    });

    const { redemptionToken: _drop, ...safe } = voucher;
    finalVoucher = {
      ...safe,
      status: "redeemed",
      redeemedAt: now.toMillis(),
      redeemedByMerchantId: merchantId,
    };
  });

  return { success: true, voucher: finalVoucher, impact: impactDoc };
});

// ─────────────────────────────────────────────
// VALIDATE VOUCHER (merchant — preview only, no state change)
// ─────────────────────────────────────────────

export const validateVoucher = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const voucherCode = assertString(req.data?.voucherCode, "voucherCode").toUpperCase();

  const snap = await db
    .collection("vouchers")
    .where("code", "==", voucherCode)
    .limit(1)
    .get();

  if (snap.empty) throw new HttpsError("not-found", "Voucher not found");
  const voucher = snap.docs[0].data() as Voucher;
  const now = Date.now();

  return {
    isValid: voucher.status === "active" && voucher.expiresAt > now,
    status: voucher.status,
    value: voucher.value,
    title: voucher.title,
    expiresAt: voucher.expiresAt,
    expired: voucher.expiresAt <= now,
  };
});
