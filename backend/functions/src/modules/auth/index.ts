import { onCall, HttpsError } from "firebase-functions/v2/https";
import { auth as authTrigger } from "firebase-functions/v1";
import { db, FieldValue, Timestamp } from "../../utils/firebase";
import { requireAuth, assertString } from "../../utils/validation";
import type { UserProfile } from "../../types";

/**
 * Auto-create user profile on first sign-in (Google Sign-In via Firebase Auth).
 * Triggered by Firebase Auth, not the app — guarantees profile exists.
 */
export const onUserCreate = authTrigger.user().onCreate(async (user) => {
  const profile: UserProfile = {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? "นักเดินทาง",
    photoURL: user.photoURL ?? null,
    level: 1,
    xp: 0,
    totalSpending: 0,
    activePetId: null,
    achievements: [],
    createdAt: Timestamp.now(),
    lastActiveAt: Timestamp.now(),
  };
  await db.collection("users").doc(user.uid).set(profile);
});

/**
 * Cleanup user-owned documents on account deletion.
 */
export const onUserDelete = authTrigger.user().onDelete(async (user) => {
  const batch = db.batch();
  batch.delete(db.collection("users").doc(user.uid));
  await batch.commit();
});

/**
 * Tourist app calls this on app open to refresh lastActiveAt + display name.
 */
export const updateProfile = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;

  const updates: Record<string, unknown> = {
    lastActiveAt: FieldValue.serverTimestamp(),
  };

  if (req.data?.displayName !== undefined) {
    updates.displayName = assertString(req.data.displayName, "displayName");
  }
  if (req.data?.photoURL !== undefined) {
    updates.photoURL = req.data.photoURL || null;
  }

  await db.collection("users").doc(uid).set(updates, { merge: true });
  return { ok: true };
});

/**
 * Get the calling user's full profile.
 */
export const getMyProfile = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const snap = await db.collection("users").doc(req.auth!.uid).get();
  if (!snap.exists) {
    throw new HttpsError("not-found", "Profile not found");
  }
  return snap.data();
});
