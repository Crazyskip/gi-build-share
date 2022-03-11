import styled from "styled-components";
import device from "../../commons/breakpoints";
import { darkGrey, grey, lightGrey } from "../../utils/colors";

export const LabelContainer = styled.div`
  font-size: 1.25rem;
  width: 100px;
  text-align: right;
  padding-right: 20px;
`;

export const TextInputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media only screen and ${device.sm} {
    flex-direction: row;
  }
`;

export const CustomInput = styled.input`
  font-size: 1.25rem;
  padding: 5px;
  width: 100%;
  border-radius: 5px;

  @media only screen and ${device.sm} {
    max-width: 300px;
  }
`;

export const CustomButton = styled.button`
  margin: 0 auto;
  width: 200px;
  font-size: 1.25rem;
  padding: 10px 30px;
  border: none;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: ${lightGrey};
  }

  &:disabled {
    color: ${grey};
    background-color: ${darkGrey};

    &:hover {
      background-color: ${darkGrey};
    }
  }

  @media only screen and ${device.sm} {
    margin-left: 100px;
  }
`;

export const Invalid = styled.div`
  color: #de0202;
  margin-top: 10px;
  font-size: 1.2rem;

  @media only screen and ${device.sm} {
    margin-left: 100px;
  }
`;
