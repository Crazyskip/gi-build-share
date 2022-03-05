import { signInWithRedirect, GoogleAuthProvider, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase.config";

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
      collection(db, "users", auth.currentUser.uid, "builds"),
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

  return { error: "No userId" };
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
  if (auth.currentUser && username !== "") {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      username,
    });
    return { username };
  }
  return { error: "Failed to update user" };
};

export const getBuild = async (userId, buildId) => {
  if (!userId && !buildId) return { build: null };

  const userRef = doc(db, "users", userId);
  const buildRef = doc(db, "users", userId, "builds", buildId);
  const userSnap = await getDoc(userRef);
  const buildSnap = await getDoc(buildRef);

  if (userSnap.exists && buildSnap.exists) {
    const userData = userSnap.data();
    const buildData = buildSnap.data();
    buildData.username = userData.username;
    return { build: buildData };
  }
  return { build: null };
};
