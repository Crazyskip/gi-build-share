import Navbar from "./Navbar/Navbar.component";
import styled from "styled-components";
import device from "../commons/breakpoints";
import { UserContext } from "../utils/UserContext";
import { useAuth } from "../hooks/useAuth";

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
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar isLoggedIn={auth.user} />
      <UserContext.Provider value={auth.user}>
        <MainContainer>{children}</MainContainer>
      </UserContext.Provider>
    </>
  );
}
