import Image from "next/image";
import styled from "styled-components";
import device from "../../commons/breakpoints";
import { blue, lightBlue } from "../../utils/colors";

export const StyledButton = styled.a`
  position: fixed;
  right: 20px;
  bottom: 30px;
  color: #000;
  background-color: ${blue};
  border-radius: 100%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 900;

  &:hover {
    background-color: ${lightBlue};
  }

  @media only screen and ${device.sm} {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 130px;
    height: 43px;
    border-radius: 10px;
  }
`;

export const Label = styled.span`
  display: none;

  @media only screen and ${device.sm} {
    display: block;
    margin: 0 8px;
    font-weight: 500;
  }
`;

export const ImageContainer = styled.div`
  display: block;
  height: 25px;
  width: 25px;

  @media only screen and ${device.sm} {
    display: none;
  }
`;
