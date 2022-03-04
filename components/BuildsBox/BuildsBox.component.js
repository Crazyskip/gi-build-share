import BuildItem from "../BuildItem/BuildItem.component";
import { BuildsContainer } from "./BuildsBox.styles";

const BuildsBox = ({ builds, userId }) => {
  return (
    <BuildsContainer>
      {builds.map((build) => (
        <BuildItem key={build.id} build={build} userId={userId} />
      ))}
    </BuildsContainer>
  );
};

export default BuildsBox;
