import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import device from "../../commons/breakpoints";
import AddBuildButton from "../../components/AddBuildButton/AddBuildButton.component";
import BuildsBox from "../../components/BuildsBox/BuildsBox.component";
import { UserContext } from "../../utils/UserContext";

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
  const user = useContext(UserContext);
  const router = useRouter();
  const { data } = useSWR(
    () => (user.uid ? `/api/builds?userId=${user.uid}` : null),
    fetcher
  );

  useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);

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
      <BuildsBox builds={data.builds} userId={user.uid} />
    </div>
  );
};

export default Builds;
