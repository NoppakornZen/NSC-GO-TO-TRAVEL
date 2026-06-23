/**
 * Geohash utilities for geospatial queries.
 * Encodes (lat, lng) into a sortable string so Firestore range queries
 * can return points within a bounding box.
 */

const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";

export function encodeGeohash(lat: number, lng: number, precision = 9): string {
  let latRange = [-90, 90];
  let lngRange = [-180, 180];
  let bits = 0;
  let bit = 0;
  let even = true;
  let geohash = "";

  while (geohash.length < precision) {
    if (even) {
      const mid = (lngRange[0] + lngRange[1]) / 2;
      if (lng >= mid) {
        bits = (bits << 1) + 1;
        lngRange[0] = mid;
      } else {
        bits = bits << 1;
        lngRange[1] = mid;
      }
    } else {
      const mid = (latRange[0] + latRange[1]) / 2;
      if (lat >= mid) {
        bits = (bits << 1) + 1;
        latRange[0] = mid;
      } else {
        bits = bits << 1;
        latRange[1] = mid;
      }
    }

    even = !even;
    if (bit < 4) {
      bit++;
    } else {
      geohash += BASE32[bits];
      bits = 0;
      bit = 0;
    }
  }

  return geohash;
}

/**
 * Haversine distance in meters between two GPS points.
 * Used to verify a check-in really happened at the quest location.
 */
export function distanceMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/**
 * Geohash range covering a bounding box around a point.
 * Used by Pet Scout to fetch jigsaws/merchants within radius (m).
 */
export function geohashQueryRange(
  lat: number,
  lng: number,
  radiusM: number,
  precision = 6
): { start: string; end: string } {
  const latDelta = radiusM / 111000;
  const lngDelta = radiusM / (111000 * Math.cos((lat * Math.PI) / 180));
  const start = encodeGeohash(lat - latDelta, lng - lngDelta, precision);
  const end = encodeGeohash(lat + latDelta, lng + lngDelta, precision);
  return { start, end };
}
