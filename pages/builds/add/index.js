import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import AddBuildForm from "../../../components/AddBuildForm/AddBuildForm.component";
import { useAuth } from "../../../hooks/useAuth";

const Title = styled.h1`
  text-align: center;
  margin: 0;
  margin-bottom: 25px;
`;

const AddBuild = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) router.push("/");
  }, [auth.user, router]);

  return (
    <div>
      <Head>
        <title>Add Build | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>Add Build</Title>
      <AddBuildForm />
    </div>
  );
};

export default AddBuild;
