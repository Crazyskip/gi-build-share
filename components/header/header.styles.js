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

export const HeaderContainer = styled.nav`
  height: 65px;
  padding: 10px;
  background-color: #0c0c0c;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #e6e6e6;
`;

export const HeaderLogo = styled.h1`
  margin: 0;
  padding: 0;
`;

export const LinksContainer = styled.div`
  display: none;

  @media only screen and (max-width: 768px) {
    ${getActiveStyles}
  }

  @media only screen and ${device.sm} {
    display: flex;
    justify-content: flex-end;
  }
`;

export const StyledLink = styled.a`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 5px 0;

  &:hover {
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
  }

  @media only screen and ${device.sm} {
    font-size: 1.2rem;
    margin: 0 15px;
  }
`;

export const MenuToggle = styled.div`
  position: absolute;
  top: 15px;
  right: 10px;
  height: 30px;
  width: 30px;

  div {
    position: absolute;
    width: 30px;
    height: 3px;
    background-color: #e6e6e6;
    border-radius: 5px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }

  div:nth-child(1) {
    top: 6px;
    transform: ${({ active }) => (active ? "rotate(45deg)" : "rotate(0)")};
  }

  div:nth-child(2) {
    top: 13px;
    opacity: ${({ active }) => (active ? "0" : "1")};
    transform: ${({ active }) =>
      active ? "translateX(-20px)" : "translateX(0)"};
  }

  div:nth-child(3) {
    top: 20px;
    transform: ${({ active }) => (active ? "rotate(-45deg)" : "rotate(0)")};
  }

  &:hover {
    cursor: pointer;
  }

  @media only screen and ${device.sm} {
    display: none;
  }
`;
