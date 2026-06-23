import * as admin from "firebase-admin";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();
export const FieldValue = admin.firestore.FieldValue;
export const Timestamp = admin.firestore.Timestamp;

db.settings({ ignoreUndefinedProperties: true });

export { admin };
