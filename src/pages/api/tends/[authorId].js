import { getUserTends } from "../../../lib/db-admin";

export default async (req, res) => {
    const authorId = req.query.authorId;
    const tends = await getUserTends(authorId);
    res.status(200).json({ tends });
};
