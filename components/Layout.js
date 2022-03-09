import Navbar from "./Navbar/Navbar.component";
import styled from "styled-components";
import device from "../commons/breakpoints";
import { UserContext } from "../utils/UserContext";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader/Loader.component";

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

const Layout = ({ children }) => {
  const auth = useAuth();

  if (auth.isLoading) return <Loader />;

  return (
    <>
      <Navbar isLoggedIn={auth.user} />
      <UserContext.Provider value={auth.user}>
        <MainContainer>{children}</MainContainer>
      </UserContext.Provider>
    </>
  );
};

export default Layout;
