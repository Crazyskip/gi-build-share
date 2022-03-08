import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../utils/UserContext";
import styled from "styled-components";
import CustomImageInput from "../../../components/CustomImageInput/CustomImageInput.component";
import { lightGrey } from "../../../utils/colors";
import { createBuild } from "../../../firebase/firebase.utils";

const Title = styled.h1`
  text-align: center;
  margin: 0;
  margin-bottom: 25px;
`;

const LabelContainer = styled.div`
  font-size: 1.25rem;
  width: 100px;
  text-align: right;
  padding-right: 20px;
`;

const TextInputContainer = styled.div`
  display: flex;
`;

const CustomInput = styled.input`
  font-size: 1.25rem;
  padding: 5px;
  margin-bottom: 20px;
  width: 255px;
`;

const CustomButton = styled.button`
  margin-left: 100px;
  font-size: 1.25rem;
  padding: 10px 30px;
  border: none;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: ${lightGrey};
  }
`;

const Invalid = styled.div`
  color: #de0202;
  margin-left: 100px;
  margin-top: 10px;
  font-size: 1.2rem;
`;

const AddBuild = () => {
  const [formValues, setFormValues] = useState({
    buildName: "",
  });
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

  const user = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);

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
        setFormValues({ buildName: "" });
        setSelectedFiles({
          summaryImg: null,
          weaponImg: null,
          flowerImg: null,
          plumeImg: null,
          sandsImg: null,
          gobletImg: null,
          circletImg: null,
        });
      });
    } else {
      setInvalid("Ensure all images are selected");
    }
  };

  return (
    <div>
      <Head>
        <title>Add Build | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>Add Build</Title>
      <TextInputContainer>
        <LabelContainer>Name</LabelContainer>
        <CustomInput
          name="buildName"
          type="text"
          label="Build Name"
          value={formValues.buildName}
          onChange={handleChange}
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
      <CustomButton onClick={onSubmit}>Submit</CustomButton>
      {invalid ? <Invalid>{invalid}</Invalid> : null}
    </div>
  );
};

export default AddBuild;
