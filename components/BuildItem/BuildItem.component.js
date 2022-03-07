import Link from "next/link";
import { BuildContainer, BuildTitle, StyledImage } from "./BuildItem.styles";

const BuildItem = ({ build, userId }) => {
  return (
    <Link href={`/u/${userId}/${build.id}`} passHref>
      <BuildContainer>
        <StyledImage
          src={build.summaryImg}
          alt="build summary"
          layout="responsive"
          height="675"
          width="1200"
          priority
        />
        <BuildTitle>{build.title}</BuildTitle>
      </BuildContainer>
    </Link>
  );
};

export default BuildItem;
