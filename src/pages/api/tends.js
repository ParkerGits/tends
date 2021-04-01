import { getUserTends } from "../../lib/db-admin";
import { auth } from "../../lib/firebase-admin";

export default async (req, res) => {
    try {
        const token = req.headers.token;
        const { uid } = await auth.verifyIdToken(token);
        const tends = await getUserTends(uid);
        res.status(200).json({ tends });
    } catch (error) {
        res.status(500).json({ error });
    }
};
