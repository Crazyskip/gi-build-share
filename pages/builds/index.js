import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import device from "../../commons/breakpoints";
import AddBuildButton from "../../components/AddBuildButton/AddBuildButton.component";
import BuildsBox from "../../components/BuildsBox/BuildsBox.component";
import { useAuth } from "../../hooks/useAuth";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;

  @media only screen and ${device.sm} {
    position: relative;
  }
`;

const Title = styled.h1`
  margin: 0;
`;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Builds = () => {
  const auth = useAuth();
  const router = useRouter();
  const { data } = useSWR(
    () => (auth.user.uid ? `/api/builds?userId=${auth.user.uid}` : null),
    fetcher
  );

  useEffect(() => {
    if (!auth.user) router.push("/");
  }, [auth.user, router]);

  if (!data) return <div>Loading...</div>;

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
