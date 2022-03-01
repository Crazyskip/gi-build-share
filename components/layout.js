import { useEffect, useState } from "react";
import Navbar from "./navbar/navbar.component";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { checkNewUser } from "../firebase/firebase.utils";

export default function Layout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkNewUser(user);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribeFromAuth;
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar loggedIn={loggedIn} />
      <main>{children}</main>
    </>
  );
}
