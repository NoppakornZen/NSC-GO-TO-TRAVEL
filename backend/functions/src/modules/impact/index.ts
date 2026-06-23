import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "../../utils/firebase";
import { requireAuth, assertString } from "../../utils/validation";
import type { EconomicImpact } from "../../types";

// ─────────────────────────────────────────────
// GET MY IMPACT (tourist)
// "คุณช่วยสร้างรายได้ให้ชุมชนแล้ว X บาท"
// ─────────────────────────────────────────────

export const getMyImpact = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;

  const [impactSnap, userSnap] = await Promise.all([
    db.collection("economic_impacts").where("userId", "==", uid).get(),
    db.collection("users").doc(uid).get(),
  ]);

  const records = impactSnap.docs.map((d) => d.data() as EconomicImpact);

  const totalSpending = records.reduce((sum, r) => sum + r.amount, 0);
  const merchantsSupported = new Set(records.map((r) => r.merchantId)).size;
  const categoryCounts: Record<string, number> = {};
  for (const r of records) {
    categoryCounts[r.category] = (categoryCounts[r.category] ?? 0) + r.amount;
  }

  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return {
    totalSpending,
    merchantsSupported,
    topCategory,
    totalTransactions: records.length,
    level: userSnap.data()?.level ?? 1,
    xp: userSnap.data()?.xp ?? 0,
  };
});

// ─────────────────────────────────────────────
// GET COMMUNITY IMPACT (public / admin dashboard)
// Aggregate stats for the GO TO TRAVEL platform
// ─────────────────────────────────────────────

export const getCommunityImpact = onCall(async (_req) => {
  const snap = await db.collection("economic_impacts").get();
  const records = snap.docs.map((d) => d.data() as EconomicImpact);

  const totalRevenue = records.reduce((sum, r) => sum + r.amount, 0);
  const uniqueVisitors = new Set(records.map((r) => r.userId)).size;
  const uniqueMerchants = new Set(records.map((r) => r.merchantId)).size;

  // Revenue by category
  const byCategory: Record<string, number> = {};
  for (const r of records) {
    byCategory[r.category] = (byCategory[r.category] ?? 0) + r.amount;
  }

  // Revenue by district (address used as district proxy)
  const byDistrict: Record<string, number> = {};
  for (const r of records) {
    const key = r.district || "unknown";
    byDistrict[key] = (byDistrict[key] ?? 0) + r.amount;
  }

  // Monthly trend — last 6 months
  const now = Date.now();
  const monthlyTrend: Record<string, number> = {};
  for (const r of records) {
    const ts = typeof r.timestamp === "number" ? r.timestamp : (r.timestamp as any).toMillis();
    if (now - ts > 6 * 30 * 86_400_000) continue;
    const d = new Date(ts);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthlyTrend[key] = (monthlyTrend[key] ?? 0) + r.amount;
  }

  return {
    totalRevenue,
    totalTransactions: records.length,
    uniqueVisitors,
    uniqueMerchants,
    byCategory,
    byDistrict,
    monthlyTrend,
    province: "ชลบุรี",
  };
});

// ─────────────────────────────────────────────
// GET MEMORY BOOK DATA (tourist — trip summary)
// Feeds the Digital Memory Book screen
// ─────────────────────────────────────────────

export const getMemoryBook = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;

  const [impactSnap, voucherSnap, collectionSnap, petSnap, userSnap] = await Promise.all([
    db.collection("economic_impacts").where("userId", "==", uid).orderBy("timestamp", "desc").limit(100).get(),
    db.collection("vouchers").where("userId", "==", uid).orderBy("generatedAt", "desc").limit(20).get(),
    db.collection("jigsaw_collections").where("userId", "==", uid).get(),
    db.collection("pets").where("ownerId", "==", uid).get(),
    db.collection("users").doc(uid).get(),
  ]);

  const impacts = impactSnap.docs.map((d) => d.data() as EconomicImpact);
  const totalSpending = impacts.reduce((sum, r) => sum + r.amount, 0);
  const merchantsVisited = new Set(impacts.map((r) => r.merchantId)).size;

  const vouchers = voucherSnap.docs.map((d) => {
    const { redemptionToken, ...safe } = d.data() as any;
    return safe;
  });

  const collections = collectionSnap.docs.map((d) => d.data());
  const completedCollections = collections.filter((c: any) => c.isComplete).length;

  const pets = petSnap.docs.map((d) => d.data());
  const user = userSnap.data();

  return {
    user: {
      displayName: user?.displayName,
      level: user?.level,
      xp: user?.xp,
    },
    stats: {
      totalSpending,
      merchantsVisited,
      completedCollections,
      totalPetsCollected: pets.length,
    },
    vouchers,
    pets,
    recentImpacts: impacts.slice(0, 10),
  };
});
