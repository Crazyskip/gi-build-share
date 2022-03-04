import { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar.component";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { checkNewUser } from "../firebase/firebase.utils";
import styled from "styled-components";
import device from "../commons/breakpoints";
import { UserContext } from "../utils/UserContext";

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
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) checkNewUser(user);
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribeFromAuth;
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar isLoggedIn={currentUser ? true : false} />
      <UserContext.Provider value={currentUser}>
        <MainContainer>{children}</MainContainer>
      </UserContext.Provider>
    </>
  );
}
