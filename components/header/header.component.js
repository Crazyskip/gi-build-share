import Link from "next/link";
import { useState } from "react";
import {
  HeaderContainer,
  HeaderLogo,
  LinksContainer,
  MenuToggle,
  StyledLink,
} from "./header.styles";

const Header = () => {
  const [active, setActive] = useState(false);
  return (
    <HeaderContainer>
      <HeaderLogo>GI Build Share</HeaderLogo>
      <LinksContainer active={active}>
        <Link href="/" passHref>
          <StyledLink>Home</StyledLink>
        </Link>
        <Link href="/" passHref>
          <StyledLink>Builds</StyledLink>
        </Link>
        <Link href="/" passHref>
          <StyledLink>Log in</StyledLink>
        </Link>
        <Link href="/" passHref>
          <StyledLink>Sign up</StyledLink>
        </Link>
      </LinksContainer>
      <MenuToggle active={active} onClick={() => setActive(!active)}>
        <div></div>
        <div></div>
        <div></div>
      </MenuToggle>
    </HeaderContainer>
  );
};

export default Header;
