import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseAuth, db } from "./firebase.config";

export const checkNewUser = async (user) => {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    const createdAt = new Date();

    try {
      await setDoc(docRef, {
        username: user.displayName,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }
};

export const addBuild = async () => {
  const title = "Test Build";
  const description = "Test Description";
  const createdAt = new Date();

  try {
    const docRef = await addDoc(
      collection(db, "users", firebaseAuth.currentUser.uid, "builds"),
      {
        title,
        description,
        createdAt,
      }
    );
    console.log("Build added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding build", error.message);
  }
};

export const getUser = async (userId) => {
  if (userId) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists())
      return { error: { message: "User does not exist" } };

    return { user: userSnap.data() };
  }
  return { error: { message: "No user ID" } };
};

export const getBuild = async (userId, buildId) => {
  if (userId) {
    if (buildId) {
      const buildRef = doc(db, "users", userId, "builds", buildId);
      const buildSnap = await getDoc(buildRef);

      if (!buildSnap.exists()) return { error: "Build does not exist" };

      const buildData = buildSnap.data();
      return { build: buildData };
    }
    return { error: "No build ID" };
  }
  return { error: "No user ID" };
};

export const getBuilds = async (userId) => {
  if (userId) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return { error: "User does not exist" };

    const buildsSnap = await getDocs(collection(db, "users", userId, "builds"));
    const builds = [];
    buildsSnap.forEach((doc) => {
      builds.push({ id: doc.id, ...doc.data() });
    });
    return { builds };
  }

  return { error: "No user ID" };
};

export const getUsername = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.username;
  }
  return undefined;
};

export const updateUser = async (username) => {
  if (firebaseAuth?.currentUser && username !== "") {
    const userRef = doc(db, "users", firebaseAuth.currentUser.uid);
    await updateDoc(userRef, {
      username,
    });
    return { username };
  }
  return { error: "Failed to update user" };
};
