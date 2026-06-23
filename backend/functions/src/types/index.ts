/**
 * GO TO TRAVEL — Shared Type Definitions
 * Used by both backend Cloud Functions and frontend apps.
 * Source of Truth: GO_TO_TRAVEL_AI_AGENT_MASTER.md
 */

// ─────────────────────────────────────────────
// USER (Module A)
// ─────────────────────────────────────────────
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  level: number;
  xp: number;
  totalSpending: number;
  activePetId: string | null;
  achievements: string[];
  createdAt: number;
  lastActiveAt: number;
}

// ─────────────────────────────────────────────
// PET (Module B)
// ─────────────────────────────────────────────
export type PetSpecies = "cat" | "dog" | "bird" | "rabbit" | "fox";
export type PetRarity = "common" | "rare" | "epic" | "legendary";

export interface Pet {
  petId: string;
  ownerId: string;
  species: PetSpecies;
  rarity: PetRarity;
  name: string;
  friendshipLevel: number; // 0-100
  isCompanion: boolean;
  acquiredAt: number;
}

// ─────────────────────────────────────────────
// QUEST (Module D)
// ─────────────────────────────────────────────
export type QuestType = "checkin" | "jigsaw" | "photo" | "merchant_visit";
export type QuestStatus = "available" | "in_progress" | "completed" | "expired";

export interface GeoLocation {
  lat: number;
  lng: number;
  geohash: string;
}

export interface Quest {
  questId: string;
  title: string;
  description: string;
  type: QuestType;
  location: GeoLocation & { radius: number; address: string };
  reward: {
    jigsawPieceId?: string;
    xp: number;
    petFriendship?: number;
  };
  merchantId?: string;
  status: QuestStatus;
  expiresAt: number | null;
  createdAt: number;
}

// ─────────────────────────────────────────────
// JIGSAW
// ─────────────────────────────────────────────
export interface JigsawPiece {
  jigsawId: string;
  userId: string;
  collectionId: string; // groups 6 pieces together
  pieceIndex: number; // 1-6
  collectedAt: number;
  location: GeoLocation;
  questId: string;
}

export interface JigsawCollection {
  collectionId: string;
  userId: string;
  theme: string;
  totalPieces: number; // always 6
  collectedPieces: number;
  isComplete: boolean;
  voucherIdGenerated: string | null;
  startedAt: number;
  completedAt: number | null;
}

// ─────────────────────────────────────────────
// VOUCHER (Module E)
// ─────────────────────────────────────────────
export type VoucherStatus = "active" | "redeemed" | "expired" | "revoked";

export interface Voucher {
  voucherId: string;
  code: string; // user-facing short code
  userId: string;
  merchantId: string | null; // null = any merchant in scope
  value: number; // in THB
  title: string;
  description: string;
  status: VoucherStatus;
  redemptionToken: string; // one-time secret, never exposed in lists
  collectionId: string; // jigsaw collection that produced it
  generatedAt: number;
  expiresAt: number;
  redeemedAt: number | null;
  redeemedByMerchantId: string | null;
}

// ─────────────────────────────────────────────
// MERCHANT (Module F)
// ─────────────────────────────────────────────
export type MerchantCategory =
  | "food"
  | "cafe"
  | "souvenir"
  | "experience"
  | "accommodation"
  | "transport";

export interface Merchant {
  merchantId: string;
  ownerId: string; // uid of merchant account
  name: string;
  description: string;
  category: MerchantCategory;
  location: GeoLocation & { address: string };
  voucherTypes: string[];
  operatingHours: {
    open: string;
    close: string;
    daysOpen: number[]; // 0=Sun..6=Sat
  };
  isVerified: boolean;
  rating: number;
  totalRedemptions: number;
  createdAt: number;
}

// ─────────────────────────────────────────────
// ECONOMIC IMPACT (Module G)
// ─────────────────────────────────────────────
export interface EconomicImpact {
  impactId: string;
  userId: string;
  merchantId: string;
  voucherId: string;
  amount: number;
  category: MerchantCategory;
  geohash: string; // for area-level analytics
  province: string;
  district: string;
  timestamp: number;
}

// ─────────────────────────────────────────────
// API CALL/RESPONSE PAYLOADS
// ─────────────────────────────────────────────
export interface ScoutJigsawRequest {
  lat: number;
  lng: number;
  radius?: number;
}

export interface ScoutJigsawResponse {
  pieces: Array<{
    jigsawId: string;
    location: GeoLocation;
    distance: number;
    questId: string;
  }>;
}

export interface CheckinRequest {
  questId: string;
  lat: number;
  lng: number;
}

export interface CheckinResponse {
  success: boolean;
  rewardGranted: {
    jigsawPieceId?: string;
    xp: number;
  };
  collection: JigsawCollection | null;
  voucherIssued: Voucher | null;
}

export interface RedeemVoucherRequest {
  voucherCode: string;
  redemptionToken: string;
  merchantId: string;
  amount: number;
}

export interface RedeemVoucherResponse {
  success: boolean;
  voucher: Voucher;
  impact: EconomicImpact;
}
