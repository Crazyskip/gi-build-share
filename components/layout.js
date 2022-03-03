import { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar.component";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { checkNewUser } from "../firebase/firebase.utils";
import styled from "styled-components";
import device from "../commons/breakpoints";

const MainContainer = styled.main`
  margin: 15px 10px;

  @media only screen and ${device.sm} {
    margin: 15px 20px;
  }

  @media only screen and ${device.md} {
    margin: 15px 50px;
  }

  @media only screen and ${device.xl} {
    margin: 15px 150px;
  }
`;

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
      <MainContainer>{children}</MainContainer>
    </>
  );
}
