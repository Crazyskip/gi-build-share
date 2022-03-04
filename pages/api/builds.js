import { getBuilds } from "../../firebase/firebase.utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query;
      const { builds } = await getBuilds(userId);
      return res.status(200).json({ builds });
    } catch (error) {
      return res.status(404);
    }
  } else {
    return res.status(400);
  }
}
