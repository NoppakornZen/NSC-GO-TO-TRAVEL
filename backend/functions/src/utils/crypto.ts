import * as crypto from "crypto";

/**
 * Generate a cryptographically secure one-time redemption token.
 * Stored as SHA-256 hash in Firestore; raw token returned to user once
 * (shown as QR code by the Tourist app, scanned by Merchant app).
 */
export function generateRedemptionToken(): { raw: string; hash: string } {
  const raw = crypto.randomBytes(32).toString("base64url");
  const hash = crypto.createHash("sha256").update(raw).digest("hex");
  return { raw, hash };
}

export function hashToken(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

/**
 * Voucher code shown to humans: 8 chars, no ambiguous (0/O/1/I).
 */
export function generateVoucherCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[crypto.randomInt(0, chars.length)];
  }
  return code;
}

export function generateCollectionId(): string {
  return crypto.randomBytes(8).toString("hex");
}
