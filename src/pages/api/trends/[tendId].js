import { getTendTrends } from "../../../lib/db-admin";

export default async (req, res) => {
    const tendId = req.query.tendId;
    const trends = await getTendTrends(tendId);
    res.status(200).json({ trends });
};
