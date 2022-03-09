import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import AddBuildForm from "../../../components/AddBuildForm/AddBuildForm.component";
import { useAuth } from "../../../hooks/useAuth";

const Title = styled.h2`
  margin: 0 0 25px 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const AddBuild = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) router.push("/");
  }, [auth.user, router]);

  return (
    <>
      <Head>
        <title>Add Build | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>Add Build</Title>
      <AddBuildForm />
    </>
  );
};

export default AddBuild;
