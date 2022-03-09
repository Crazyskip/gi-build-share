import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { updateUser } from "../firebase/firebase.utils";
import { useAuth } from "../hooks/useAuth";

const Title = styled.h2`
  margin: 0 0 25px 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const StyledLabel = styled.label`
  font-size: 1.5rem;
  margin-right: 10px;
`;

const CustomInput = styled.input`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const SuccessText = styled.span`
  color: #07d400;
  font-size: 1.2rem;
`;

const ErrorText = styled.span`
  color: #ff0000;
  font-size: 1.2rem;
`;

const Profile = () => {
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const auth = useAuth();

  const updateCurrentUser = async () => {
    const response = await updateUser(username);
    if (response.error) alert(response.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    if (username !== "") {
      updateCurrentUser().then(() =>
        setSuccess("Successfully updated username")
      );
    } else {
      setError("Failed to update username");
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
    <>
      <Head>
        <title>Profile | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>My Profile</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <StyledLabel>Username:</StyledLabel>
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
        {success ? <SuccessText>{success}</SuccessText> : null}
        {error ? <ErrorText>{error}</ErrorText> : null}
      </form>
    </>
  );
};

export default Profile;
