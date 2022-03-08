import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "gi-build-share-55e57.firebaseapp.com",
  projectId: "gi-build-share-55e57",
  storageBucket: "gi-build-share-55e57.appspot.com",
  messagingSenderId: "637409378106",
  appId: "1:637409378106:web:66eb25abf3f15a9155da03",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
