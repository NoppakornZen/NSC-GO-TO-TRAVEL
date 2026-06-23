import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "../../utils/firebase";
import { requireAuth, assertNumber } from "../../utils/validation";
import { encodeGeohash, geohashQueryRange, distanceMeters } from "../../utils/geo";
import type { Merchant, Quest } from "../../types";

const DEFAULT_SCOUT_RADIUS_M = 1000;
const MAX_SCOUT_RADIUS_M = 5000;

/**
 * Pet Scout — Location Scout.
 * Returns merchants within radius of the user, sorted by distance.
 */
export const scoutNearbyMerchants = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const lat = assertNumber(req.data?.lat, "lat");
  const lng = assertNumber(req.data?.lng, "lng");
  const radius = Math.min(
    req.data?.radius ?? DEFAULT_SCOUT_RADIUS_M,
    MAX_SCOUT_RADIUS_M
  );

  const { start, end } = geohashQueryRange(lat, lng, radius, 6);
  const snap = await db
    .collection("merchants")
    .where("isVerified", "==", true)
    .where("location.geohash", ">=", start)
    .where("location.geohash", "<=", end)
    .limit(50)
    .get();

  const merchants = snap.docs
    .map((d) => d.data() as Merchant)
    .map((m) => ({
      ...m,
      distance: distanceMeters(lat, lng, m.location.lat, m.location.lng),
    }))
    .filter((m) => m.distance <= radius)
    .sort((a, b) => a.distance - b.distance);

  return { merchants };
});

/**
 * Pet Scout — Quest Scout.
 * Returns active quests within radius.
 */
export const scoutNearbyQuests = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const lat = assertNumber(req.data?.lat, "lat");
  const lng = assertNumber(req.data?.lng, "lng");
  const radius = Math.min(
    req.data?.radius ?? DEFAULT_SCOUT_RADIUS_M,
    MAX_SCOUT_RADIUS_M
  );

  const { start, end } = geohashQueryRange(lat, lng, radius, 6);
  const now = Date.now();
  const snap = await db
    .collection("quests")
    .where("status", "==", "available")
    .where("location.geohash", ">=", start)
    .where("location.geohash", "<=", end)
    .limit(50)
    .get();

  const quests = snap.docs
    .map((d) => d.data() as Quest)
    .filter((q) => q.expiresAt === null || q.expiresAt > now)
    .map((q) => ({
      ...q,
      distance: distanceMeters(lat, lng, q.location.lat, q.location.lng),
    }))
    .filter((q) => q.distance <= radius)
    .sort((a, b) => a.distance - b.distance);

  return { quests };
});

/**
 * Helper for backend use — encode a location with geohash.
 */
export function buildGeoLocation(lat: number, lng: number, address = "") {
  return {
    lat,
    lng,
    geohash: encodeGeohash(lat, lng),
    address,
  };
}
