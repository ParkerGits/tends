import firebase from "./firebase-admin";

export async function getTendTrends(tendId) {
    const snapshot = await firebase
        .collection("trends")
        .where("tendId", "==", tendId)
        .get();
    const trends = [];
    snapshot.forEach((doc) => {
        trends.push({ id: doc.id, ...doc.data() });
    });

    return trends;
}

export async function getUserTends(authorId) {
    const snapshot = await firebase
        .collection("tends")
        .where("authorId", "==", authorId)
        .get();
    const tends = [];
    snapshot.forEach((doc) => {
        tends.push({ id: doc.id, ...doc.data() });
    });

    return tends;
}

export async function getAllTends(authorId) {
    const snapshot = await firebase.collection("tends").get();
    const tends = [];
    snapshot.forEach((doc) => {
        tends.push({ id: doc.id, ...doc.data() });
    });

    return tends;
}
