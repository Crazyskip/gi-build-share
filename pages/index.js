import Head from "next/head";
import { checkNewUser, getBuilds } from "../firebase/firebase.utils";
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
        <title>Home | GI Build Share</title>
        <meta
          name="description"
          content="A character build share application for the game Genshin Impact"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header loggedIn={loggedIn} />
    </div>
  );
}
