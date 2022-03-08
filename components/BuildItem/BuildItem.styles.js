import Image from "next/image";
import styled from "styled-components";
import { grey, paleGrey } from "../../utils/colors";

export const BuildContainer = styled.a`
  width: 100%;
  text-align: center;
  border: 1px solid ${paleGrey};
  color: ${paleGrey};
  border-radius: 10px;

  &:hover {
    border: 1px solid ${grey};
    color: ${grey};
  }
`;

export const BuildTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 5px 0;
`;

export const StyledImage = styled(Image)`
  border-radius: 10px 10px 0px 0px;
  object-fit: cover;
`;
