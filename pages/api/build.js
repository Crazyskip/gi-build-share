import { getBuild, getUser } from "../../firebase/firebase.utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId, buildId } = req.query;
    const { user, error } = await getUser(userId);
    if (error) {
      return res.status(404).json({ error: { message: "User not found" } });
    }
    if (user) {
      const { build, error } = await getBuild(userId, buildId);
      if (error) {
        return res.status(404).json({ error: { message: "Build not found" } });
      }
      if (build) {
        build.username = user.username;
        return res.status(200).json({ build });
      }
    }
  } else {
    return res.status(400);
  }
}
