import { getBuild } from "../../firebase/firebase.utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId, buildId } = req.query;
      const { build } = await getBuild(userId, buildId);
      return res.status(200).json({ build });
    } catch (error) {
      return res.status(404);
    }
  } else {
    return res.status(400);
  }
}
