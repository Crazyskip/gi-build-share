import Link from "next/link";
import { BuildContainer, BuildTitle, StyledImage } from "./BuildItem.styles";

const BuildItem = ({ build }) => {
  return (
    <Link href="/build" passHref>
      <BuildContainer>
        <StyledImage
          src={build.summaryImg}
          alt="build summary"
          layout="responsive"
          height="200"
          width="350"
        />
        <BuildTitle>{build.title}</BuildTitle>
      </BuildContainer>
    </Link>
  );
};

export default BuildItem;
