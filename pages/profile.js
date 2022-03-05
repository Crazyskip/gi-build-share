import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getUsername, updateUser } from "../firebase/firebase.utils";
import { UserContext } from "../utils/UserContext";

const CustomInput = styled.input`
  font-size: 1.2rem;
`;

const Profile = () => {
  const [username, setUsername] = useState("");
  const user = useContext(UserContext);
  const router = useRouter();

  const updateCurrentUser = async () => {
    const response = await updateUser(username);
    if (response.error) alert(response.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "") {
      updateCurrentUser();
    } else {
      alert("Failed to update username");
    }
  };

  useEffect(() => {
    const isMounted = true;
    if (!user) {
      router.push("/");
    } else {
      getUsername(user.uid).then((data) => {
        if (isMounted && data) setUsername(data);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {}, []);

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
