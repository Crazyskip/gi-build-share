import Link from "next/link";
import { useState } from "react";
import { signInWithGoogle, signOutUser } from "../../firebase/firebase.utils";
import {
  HeaderContainer,
  HeaderLogo,
  LinksContainer,
  MenuToggle,
  StyledLink,
} from "./header.styles";

const Header = ({ loggedIn }) => {
  const [active, setActive] = useState(false);
  return (
    <HeaderContainer>
      <Link href="/" passHref>
        <HeaderLogo>GI Build Share</HeaderLogo>
      </Link>
      <LinksContainer active={active}>
        <Link href="/" passHref>
          <StyledLink>Home</StyledLink>
        </Link>
        <Link href="/" passHref>
          <StyledLink>Builds</StyledLink>
        </Link>
        {loggedIn ? (
          <>
            <Link href="/" passHref>
              <StyledLink>Profile</StyledLink>
            </Link>
            <StyledLink
              as="div"
              role="button"
              tabIndex="0"
              aria-pressed="false"
              onClick={signOutUser}
              onKeyDown={(e) =>
                e.code === "Enter" || e.code === "Space" ? signOutUser() : null
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
            onClick={signInWithGoogle}
            onKeyDown={(e) =>
              e.code === "Enter" || e.code === "Space"
                ? signInWithGoogle()
                : null
            }
          >
            Log in
          </StyledLink>
        )}
      </LinksContainer>
      <MenuToggle
        as="div"
        role="button"
        tabIndex="0"
        aria-pressed="false"
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
    </HeaderContainer>
  );
};

export default Header;
