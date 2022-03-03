import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getUsername, updateUser } from "../firebase/firebase.utils";

const CustomInput = styled.input`
  font-size: 1.2rem;
`;

const Profile = () => {
  const [username, setUsername] = useState("");

  const getUser = async () => {
    const usernameResponse = await getUsername();
    if (usernameResponse) setUsername(usernameResponse);
  };

  const updateCurrentUser = async () => {
    const response = await updateUser(username);
    if (response.error) alert(response.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "") {
      updateCurrentUser();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Head>
        <title>Profile | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      My Profile
      <form onSubmit={handleSubmit}>
        <div>
          <CustomInput
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <CustomInput type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
