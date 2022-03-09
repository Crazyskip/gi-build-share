import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signInWithGoogle } from "../../firebase/firebase.utils";
import { useAuth } from "../../hooks/useAuth";
import {
  NavbarContainer,
  NavLogo,
  LinksContainer,
  MenuToggle,
  StyledLink,
} from "./Navbar.styles";

const Navbar = ({ isLoggedIn }) => {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => setActive(false));
    return () => {
      router.events.off("routeChangeComplete", () => setActive(false));
    };
  }, [router.events]);

  const signOut = () => {
    auth.signout();
    router.push("/");
  };

  return (
    <NavbarContainer>
      <Link href="/" passHref>
        <NavLogo>GI Build Share</NavLogo>
      </Link>
      <MenuToggle
        role="button"
        tabIndex="0"
        aria-pressed="false"
        aria-label="Toggle nav menu"
        onClick={() => setActive(!active)}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? setActive(!active) : null
        }
        active={active}
      >
        <div></div>
        <div></div>
        <div></div>
      </MenuToggle>
      <LinksContainer active={active}>
        <Link href="/" passHref>
          <StyledLink>Home</StyledLink>
        </Link>
        {isLoggedIn ? (
          <>
            <Link href="/builds" passHref>
              <StyledLink>Builds</StyledLink>
            </Link>
            <Link href="/profile" passHref>
              <StyledLink>Profile</StyledLink>
            </Link>
            <StyledLink
              as="div"
              role="button"
              tabIndex="0"
              aria-pressed="false"
              onClick={signOut}
              onKeyDown={(e) =>
                e.code === "Enter" || e.code === "Space" ? signOut() : null
              }
            >
              Log out
            </StyledLink>
          </>
        ) : (
          <StyledLink
            as="div"
            role="button"
            tabIndex="0"
            aria-pressed="false"
            onClick={auth.signin}
            onKeyDown={(e) =>
              e.code === "Enter" || e.code === "Space" ? auth.signin() : null
            }
          >
            Log in
          </StyledLink>
        )}
      </LinksContainer>
    </NavbarContainer>
  );
};

export default Navbar;
