import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { updateUser } from "../firebase/firebase.utils";
import { useAuth } from "../hooks/useAuth";

const CustomInput = styled.input`
  font-size: 1.2rem;
`;

const Profile = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const auth = useAuth();

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
    if (!auth.user) {
      router.push("/");
    } else {
      setUsername(auth.user.username);
    }
  }, [auth.user, router]);

  return (
    <div>
      <Head>
        <title>Profile | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Profile
      <form onSubmit={handleSubmit}>
        <div>
          <CustomInput
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
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
