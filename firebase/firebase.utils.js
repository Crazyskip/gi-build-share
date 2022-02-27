import { signInWithRedirect, GoogleAuthProvider, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase.config";

export const signInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  signInWithRedirect(auth, googleProvider);
};

export const signOutUser = () => {
  signOut(auth);
};

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

export const getBuilds = async () => {
  if (auth.currentUser) {
    const querySnapshot = await getDocs(
      collection(db, "users", auth.currentUser.uid, "builds")
    );
    const builds = [];
    querySnapshot.forEach((doc) => {
      builds.push({ id: doc.id, ...doc.data() });
    });
    console.log(builds);
  }
};
