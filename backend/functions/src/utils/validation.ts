import { HttpsError } from "firebase-functions/v2/https";

export function requireAuth(uid: string | undefined): asserts uid is string {
  if (!uid) {
    throw new HttpsError("unauthenticated", "Login required");
  }
}

export function assertNumber(
  value: unknown,
  field: string,
  min?: number,
  max?: number
): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new HttpsError("invalid-argument", `${field} must be a number`);
  }
  if (min !== undefined && value < min) {
    throw new HttpsError("invalid-argument", `${field} must be >= ${min}`);
  }
  if (max !== undefined && value > max) {
    throw new HttpsError("invalid-argument", `${field} must be <= ${max}`);
  }
  return value;
}

export function assertString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new HttpsError("invalid-argument", `${field} must be a string`);
  }
  return value.trim();
}

export function assertLatLng(lat: unknown, lng: unknown): { lat: number; lng: number } {
  return {
    lat: assertNumber(lat, "lat", -90, 90),
    lng: assertNumber(lng, "lng", -180, 180),
  };
}
