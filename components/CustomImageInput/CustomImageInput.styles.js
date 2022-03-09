import styled from "styled-components";
import device from "../../commons/breakpoints";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

export const CustomImageInputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media only screen and ${device.sm} {
    flex-direction: row;
  }
`;

export const LabelContainer = styled.div`
  font-size: 1.25rem;
  padding: 0;

  @media only screen and ${device.sm} {
    padding-right: 20px;
    text-align: right;
    width: 100px;
  }
`;

export const Container = styled.div`
  font-size: 0.9rem;
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0px 15px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #5a5a5a;
  outline: none;
  transition: border 0.24s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  @media only screen and ${device.md} {
    font-size: 1rem;
  }
`;
