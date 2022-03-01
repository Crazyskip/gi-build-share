import styled, { css } from "styled-components";
import device from "../../commons/breakpoints";

const activeStyles = css`
  position: absolute;
  top: 65px;
  left: 0;
  height: calc(100vh - 65px);
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const getActiveStyles = (props) => {
  if (props.active) return activeStyles;
};

export const NavbarContainer = styled.nav`
  height: 65px;
  padding: 0 10px;
  background-color: #1b1d2a;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #e6e6e6;

  @media only screen and ${device.sm} {
    padding: 0 20px;
  }

  @media only screen and ${device.md} {
    padding: 0 50px;
  }

  @media only screen and ${device.lg} {
    padding: 0 100px;
  }
`;

export const NavLogo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

export const LinksContainer = styled.div`
  display: none;

  @media only screen and (max-width: 768px) {
    ${getActiveStyles}
  }

  @media only screen and ${device.md} {
    display: flex;
    justify-content: flex-end;
  }
`;

export const StyledLink = styled.a`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 10px 0;

  &:hover {
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
  }

  @media only screen and ${device.md} {
    font-size: 1.2rem;
    margin: 0 15px;
  }
`;

export const MenuToggle = styled.div`
  position: absolute;
  top: 20px;
  right: ${({ active }) => (active ? "13px" : "10px")};
  height: 25px;
  width: ${({ active }) => (active ? "25px" : "33px")};
  transition: all 0.2s ease-in-out;

  @media only screen and ${device.sm} {
    right: ${({ active }) => (active ? "23px" : "20px")};
  }

  div {
    position: absolute;
    width: 33px;
    height: 3px;
    background-color: #e6e6e6;
    border-radius: 5px;
    transition: all 0.2s linear;
    position: relative;
    transform-origin: 1px;
  }

  div:nth-child(1) {
    top: 0px;
    transform: ${({ active }) => (active ? "rotate(45deg)" : "rotate(0)")};
  }

  div:nth-child(2) {
    top: 8px;
    opacity: ${({ active }) => (active ? "0" : "1")};
    width: ${({ active }) => (active ? "0" : "33px")};
  }

  div:nth-child(3) {
    top: 16px;
    transform: ${({ active }) => (active ? "rotate(-45deg)" : "rotate(0)")};
  }

  &:hover {
    cursor: pointer;
  }

  @media only screen and ${device.md} {
    display: none;
  }
`;
