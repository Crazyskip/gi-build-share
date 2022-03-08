import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseAuth, db, storage } from "./firebase.config";

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

export const createBuild = async (
  buildName,
  summaryImg,
  weaponImg,
  flowerImg,
  plumeImg,
  sandsImg,
  gobletImg,
  circletImg
) => {
  const summaryID = crypto.randomUUID();
  const weaponID = crypto.randomUUID();
  const flowerID = crypto.randomUUID();
  const plumeID = crypto.randomUUID();
  const sandsID = crypto.randomUUID();
  const gobletID = crypto.randomUUID();
  const circletID = crypto.randomUUID();

  const summaryRef = ref(storage, summaryID);
  const weaponRef = ref(storage, weaponID);
  const flowerRef = ref(storage, flowerID);
  const plumeRef = ref(storage, plumeID);
  const sandsRef = ref(storage, sandsID);
  const gobletRef = ref(storage, gobletID);
  const circletRef = ref(storage, circletID);

  console.log("Uploading Files...");

  const uploadPromises = [
    uploadBytes(summaryRef, summaryImg),
    uploadBytes(weaponRef, weaponImg),
    uploadBytes(flowerRef, flowerImg),
    uploadBytes(plumeRef, plumeImg),
    uploadBytes(sandsRef, sandsImg),
    uploadBytes(gobletRef, gobletImg),
    uploadBytes(circletRef, circletImg),
  ];

  await Promise.all(uploadPromises);

  console.log("Uploaded Files");
  console.log("Getting Download URLs");

  const downloadURLPromises = [
    getDownloadURL(summaryRef),
    getDownloadURL(weaponRef),
    getDownloadURL(flowerRef),
    getDownloadURL(plumeRef),
    getDownloadURL(sandsRef),
    getDownloadURL(gobletRef),
    getDownloadURL(circletRef),
  ];

  const downloadURLs = await Promise.all(downloadURLPromises);

  const createdAt = new Date();

  const newBuildRef = await addDoc(
    collection(db, "users", firebaseAuth.currentUser.uid, "builds"),
    {
      buildName,
      summaryID,
      summaryURL: downloadURLs[0],
      weaponID,
      weaponURL: downloadURLs[1],
      flowerID,
      flowerURL: downloadURLs[2],
      plumeID,
      plumeURL: downloadURLs[3],
      sandsID,
      sandsURL: downloadURLs[4],
      gobletID,
      gobletURL: downloadURLs[5],
      circletID,
      circletURL: downloadURLs[6],
      createdAt,
    }
  );

  console.log("Build added with ID: ", newBuildRef.id);
};
