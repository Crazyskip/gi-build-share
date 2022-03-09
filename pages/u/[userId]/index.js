import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import BuildsBox from "../../../components/BuildsBox/BuildsBox.component";
import Loader from "../../../components/Loader/Loader.component";
import { useBuilds } from "../../../hooks/useBuilds";

const Title = styled.h2`
  margin: 0 0 25px 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const Builds = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data, isLoading, isError } = useBuilds(userId);

  if (isLoading) return <Loader />;

  if (isError) return <div>{isError.info}</div>;

  return (
    <>
      <Head>
        <title>Builds | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>{`${data.username}'s Builds`}</Title>
      <BuildsBox builds={data.builds} userId={userId} />
    </>
  );
};

export default Builds;
