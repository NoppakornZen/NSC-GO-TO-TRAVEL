import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db, FieldValue, Timestamp } from "../../utils/firebase";
import { requireAuth, assertString } from "../../utils/validation";
import type { Pet } from "../../types";

const STARTER_SPECIES = ["fox", "rabbit", "cat", "dog", "panda"] as const;
const FRIENDSHIP_MAX = 100;
const FRIENDSHIP_PER_FEED = 10;

/**
 * Choose starter pet on signup. One-time only — sets activePetId on the user.
 */
export const chooseStarterPet = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;
  const species = assertString(req.data?.species, "species");
  const name = assertString(req.data?.name, "name");

  if (!STARTER_SPECIES.includes(species as (typeof STARTER_SPECIES)[number])) {
    throw new HttpsError("invalid-argument", "Unknown starter species");
  }

  const userRef = db.collection("users").doc(uid);

  return db.runTransaction(async (tx) => {
    const userSnap = await tx.get(userRef);
    if (!userSnap.exists) throw new HttpsError("not-found", "User not found");
    if (userSnap.data()?.activePetId) {
      throw new HttpsError("failed-precondition", "Starter pet already chosen");
    }

    const petRef = db.collection("pets").doc();
    const pet: Pet = {
      petId: petRef.id,
      ownerId: uid,
      species,
      name,
      rarity: "common",
      friendshipLevel: 50,
      isCompanion: true,
      acquiredAt: Timestamp.now(),
    };

    tx.set(petRef, pet);
    tx.update(userRef, { activePetId: petRef.id });
    return { petId: petRef.id, pet };
  });
});

/**
 * Encounter a wild pet during travel (Make Friend System).
 * Pet is added to user's collection at low friendship — must feed to bond.
 */
export const encounterWildPet = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;
  const species = assertString(req.data?.species, "species");
  const rarity = (req.data?.rarity ?? "common") as Pet["rarity"];

  const petRef = db.collection("pets").doc();
  const pet: Pet = {
    petId: petRef.id,
    ownerId: uid,
    species,
    name: species,
    rarity,
    friendshipLevel: 10,
    isCompanion: false,
    acquiredAt: Timestamp.now(),
  };
  await petRef.set(pet);
  return { petId: petRef.id, pet };
});

/**
 * Feed a pet to raise friendship. When friendship hits MAX, pet enters Collection.
 */
export const feedPet = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;
  const petId = assertString(req.data?.petId, "petId");

  const petRef = db.collection("pets").doc(petId);

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(petRef);
    if (!snap.exists) throw new HttpsError("not-found", "Pet not found");
    const pet = snap.data() as Pet;
    if (pet.ownerId !== uid) {
      throw new HttpsError("permission-denied", "Not your pet");
    }
    const newLevel = Math.min(FRIENDSHIP_MAX, pet.friendshipLevel + FRIENDSHIP_PER_FEED);
    tx.update(petRef, {
      friendshipLevel: newLevel,
      lastFedAt: FieldValue.serverTimestamp(),
    });
    return {
      friendshipLevel: newLevel,
      maxed: newLevel >= FRIENDSHIP_MAX,
    };
  });
});

/**
 * Switch active companion (the one shown on the map / used by Pet Scout).
 */
export const setActivePet = onCall(async (req) => {
  requireAuth(req.auth?.uid);
  const uid = req.auth!.uid;
  const petId = assertString(req.data?.petId, "petId");

  const petSnap = await db.collection("pets").doc(petId).get();
  if (!petSnap.exists || petSnap.data()?.ownerId !== uid) {
    throw new HttpsError("permission-denied", "Not your pet");
  }
  if ((petSnap.data() as Pet).friendshipLevel < FRIENDSHIP_MAX && !petSnap.data()?.isCompanion) {
    throw new HttpsError("failed-precondition", "Friendship not yet maxed");
  }

  await db.collection("users").doc(uid).update({ activePetId: petId });
  return { ok: true };
});
