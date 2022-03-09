import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import device from "../../commons/breakpoints";
import AddBuildButton from "../../components/AddBuildButton/AddBuildButton.component";
import BuildsBox from "../../components/BuildsBox/BuildsBox.component";
import Loader from "../../components/Loader/Loader.component";
import { useAuth } from "../../hooks/useAuth";
import { useBuilds } from "../../hooks/useBuilds";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;

  @media only screen and ${device.sm} {
    position: relative;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const Builds = () => {
  const auth = useAuth();
  const router = useRouter();
  const { data, isLoading, isError } = useBuilds(auth.user.uid);

  useEffect(() => {
    if (!auth.user) router.push("/");
  }, [auth.user, router]);

  if (isLoading) return <Loader />;

  if (isError) return <div>{isError.info}</div>;

  return (
    <div>
      <Head>
        <title>My Builds | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledHeader>
        <Title>My Builds</Title>
        <AddBuildButton />
      </StyledHeader>
      <BuildsBox builds={data.builds} userId={auth.user.uid} />
    </div>
  );
};

export default Builds;
