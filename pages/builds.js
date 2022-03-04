import Head from "next/head";
import { useContext } from "react";
import useSWR from "swr";
import BuildsBox from "../components/BuildsBox/BuildsBox.component";
import { UserContext } from "../utils/UserContext";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Builds = () => {
  const user = useContext(UserContext);
  const { data } = useSWR(
    () => (user.uid ? `/api/builds?userId=${user.uid}` : null),
    fetcher
  );

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>My Builds | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BuildsBox builds={data.builds} userId={user.uid} />
    </div>
  );
};

export default Builds;
