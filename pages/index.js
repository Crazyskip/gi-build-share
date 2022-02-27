import Head from "next/head";
import {
  addBuild,
  checkNewUser,
  getBuilds,
  signInWithGoogle,
  signOutUser,
} from "../firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import Header from "../components/header/header.component";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkNewUser(user);
        setLoggedIn(true);
        getBuilds();
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribeFromAuth;
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <button onClick={() => signInWithGoogle()}>Sign in with google</button>
      <button onClick={() => signOutUser()}>Sign out</button>
      <div>{loggedIn ? "Logged in" : "Logged Out"}</div>
      <button onClick={() => addBuild()}>Add build</button>
    </div>
  );
}
