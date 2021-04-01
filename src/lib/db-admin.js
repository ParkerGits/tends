import { compareDesc, parseISO } from "date-fns";
import { db } from "./firebase-admin";

export async function getTendTrends(tendId) {
    const snapshot = await db
        .collection("trends")
        .where("tendId", "==", tendId)
        .get();
    const trends = [];
    snapshot.forEach((doc) => {
        trends.push({ id: doc.id, ...doc.data() });
    });

    return trends;
}

export async function getUserTends(userId) {
    const snapshot = await db
        .collection("tends")
        .where("authorId", "==", userId)
        .get();
    const tends = [];
    snapshot.forEach((doc) => {
        tends.push({ id: doc.id, ...doc.data() });
    });

    tends.sort((a, b) =>
        compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );
    return tends;
}

export async function getAllTends() {
    const snapshot = await db.collection("tends").get();
    const tends = [];
    snapshot.forEach((doc) => {
        tends.push({ id: doc.id, ...doc.data() });
    });

    return tends;
}
