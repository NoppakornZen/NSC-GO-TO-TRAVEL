/**
 * GO TO TRAVEL — Cloud Functions Entry Point
 * Exports all callable functions grouped by module.
 */

// ── Module A: Authentication ──────────────────
export { onUserCreate, onUserDelete, updateProfile, getMyProfile } from "./modules/auth";

// ── Module B: Pet System ──────────────────────
export {
  chooseStarterPet,
  encounterWildPet,
  feedPet,
  setActivePet,
} from "./modules/pets";

// ── Module C: Map + GPS ───────────────────────
export { scoutNearbyMerchants, scoutNearbyQuests } from "./modules/map";

// ── Module D: Quest + Jigsaw Engine ──────────
export {
  scoutJigsawPieces,
  checkInToQuest,
  getMyCollections,
  getMyQuestHistory,
} from "./modules/quests";

// ── Module E: Voucher Engine ──────────────────
export {
  getMyVouchers,
  getVoucherQR,
  redeemVoucher,
  validateVoucher,
} from "./modules/vouchers";

// ── Module F: Merchant Platform ───────────────
export {
  registerMerchant,
  getMyMerchant,
  updateMerchant,
  getMerchantRedemptions,
} from "./modules/merchants";

// ── Module G: Economic Impact + Memory Book ───
export {
  getMyImpact,
  getCommunityImpact,
  getMemoryBook,
} from "./modules/impact";
