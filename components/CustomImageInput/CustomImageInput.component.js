import { useDropzone } from "react-dropzone";
import {
  Container,
  CustomImageInputContainer,
  LabelContainer,
  SelectedImageContainer,
} from "./CustomImageInput.styles";

const CustomImageInput = ({ name, label, handleFileChange, file }) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: ["image/jpeg", "image/png", "image/webp"],
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        handleFileChange(name, acceptedFiles[0]);
      },
    });

  return (
    <CustomImageInputContainer>
      <LabelContainer>{label}</LabelContainer>
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>
          {file
            ? file.name
            : "Drag 'n' drop image here, or click to select file"}
        </p>
      </Container>
    </CustomImageInputContainer>
  );
};

export default CustomImageInput;
