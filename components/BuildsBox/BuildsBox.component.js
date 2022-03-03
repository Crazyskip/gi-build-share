import BuildItem from "../BuildItem/BuildItem.component";
import { BuildsContainer } from "./BuildsBox.styles";

const BuildsBox = ({ builds }) => {
  return (
    <BuildsContainer>
      {builds.map((build) => (
        <BuildItem key={build.id} build={build} />
      ))}
    </BuildsContainer>
  );
};

export default BuildsBox;
