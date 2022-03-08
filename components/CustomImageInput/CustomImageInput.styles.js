import styled from "styled-components";

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
`;

export const LabelContainer = styled.div`
  font-size: 1.25rem;
  width: 100px;
  text-align: right;
  padding-right: 20px;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
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
`;

export const SelectedImageContainer = styled.div`
  width: 50%;
  padding-left: 15px;
`;
