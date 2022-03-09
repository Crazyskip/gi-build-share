import Image from "next/image";
import { DeleteButtonContainer } from "./DeleteButton.styles";

const DeleteButton = ({ onDelete }) => (
  <DeleteButtonContainer onClick={onDelete}>
    <Image src="/img/delete.svg" alt="delete" height="39" width="43" />
  </DeleteButtonContainer>
);

export default DeleteButton;
