import styled from "styled-components";
import device from "../../commons/breakpoints";

export const BuildsContainer = styled.div`
  display: grid;
  place-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
`;
