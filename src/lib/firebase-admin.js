import admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            private_key: process.env.FIREBASE_PRIVATE_KEY,
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        databaseURL: "https://tends-631a2.firebaseio.com",
    });
}

const auth = admin.auth()
const db = admin.firestore();
export {auth, db}
