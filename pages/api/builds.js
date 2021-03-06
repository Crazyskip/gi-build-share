import { getBuilds, getUser } from "../../firebase/firebase.utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;
    const { user } = await getUser(userId);
    if (user) {
      const { builds, username } = await getBuilds(userId);
      if (builds) {
        return res.status(200).json({ builds, username });
      }
      return res.status(200).json({ builds: [], username });
    } else {
      return res.status(404).json({ error: { message: "User not found" } });
    }
  } else {
    return res.status(400);
  }
}
