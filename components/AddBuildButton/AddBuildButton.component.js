import Image from "next/image";
import Link from "next/link";
import { ImageContainer, Label, StyledButton } from "./AddBuildButton.styles";

const AddBuildButton = () => (
  <Link href="/builds/add" passHref>
    <StyledButton>
      <ImageContainer>
        <Image src="/img/plus.svg" alt="Add Build" height={25} width={25} />
      </ImageContainer>
      <Label>Add Build</Label>
    </StyledButton>
  </Link>
);

export default AddBuildButton;
