import { useRouter } from "next/router";
import { useState } from "react";
import { createBuild } from "../../firebase/firebase.utils";
import CustomImageInput from "../CustomImageInput/CustomImageInput.component";
import {
  CustomButton,
  CustomInput,
  Invalid,
  LabelContainer,
  TextInputContainer,
} from "./AddBuildForm.styles";

const AddBuildForm = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    buildName: "",
  });
  const [disabled, setDisabled] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState({
    summaryImg: null,
    weaponImg: null,
    flowerImg: null,
    plumeImg: null,
    sandsImg: null,
    gobletImg: null,
    circletImg: null,
  });

  const [invalid, setInvalid] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (name, file) => {
    setSelectedFiles({ ...selectedFiles, [name]: file });
  };

  const onSubmit = () => {
    setInvalid(null);
    if (formValues.buildName === "") {
      setInvalid("Invalid build name");
      return;
    }
    if (Object.values(selectedFiles).every((val) => val !== null)) {
      setDisabled(true);
      createBuild(
        formValues.buildName,
        selectedFiles.summaryImg,
        selectedFiles.weaponImg,
        selectedFiles.flowerImg,
        selectedFiles.plumeImg,
        selectedFiles.sandsImg,
        selectedFiles.gobletImg,
        selectedFiles.circletImg
      ).then(() => {
        setDisabled(false);
        router.push("/builds");
      });
    } else {
      setInvalid("Ensure all images are selected");
    }
  };
  return (
    <>
      <TextInputContainer>
        <LabelContainer>Name</LabelContainer>
        <CustomInput
          name="buildName"
          type="text"
          label="Build Name"
          value={formValues.buildName}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </TextInputContainer>

      <CustomImageInput
        name="summaryImg"
        label="Summary"
        handleFileChange={handleFileChange}
        file={selectedFiles.summaryImg}
      />

      <CustomImageInput
        name="weaponImg"
        label="Weapon"
        handleFileChange={handleFileChange}
        file={selectedFiles.weaponImg}
      />

      <CustomImageInput
        name="flowerImg"
        label="Flower"
        handleFileChange={handleFileChange}
        file={selectedFiles.flowerImg}
      />

      <CustomImageInput
        name="plumeImg"
        label="Plume"
        handleFileChange={handleFileChange}
        file={selectedFiles.plumeImg}
      />

      <CustomImageInput
        name="sandsImg"
        label="Sands"
        handleFileChange={handleFileChange}
        file={selectedFiles.sandsImg}
      />

      <CustomImageInput
        name="gobletImg"
        label="Goblet"
        handleFileChange={handleFileChange}
        file={selectedFiles.gobletImg}
      />

      <CustomImageInput
        name="circletImg"
        label="Circlet"
        handleFileChange={handleFileChange}
        file={selectedFiles.circletImg}
      />
      <CustomButton onClick={onSubmit} disabled={disabled}>
        Submit
      </CustomButton>
      {invalid ? <Invalid>{invalid}</Invalid> : null}
    </>
  );
};

export default AddBuildForm;
