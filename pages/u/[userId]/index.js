import Head from "next/head";
import { useRouter } from "next/router";

import useSWR from "swr";
import BuildsBox from "../../../components/BuildsBox/BuildsBox.component";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Builds = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data } = useSWR(
    () => (userId ? `/api/builds?userId=${userId}` : null),
    fetcher
  );

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Builds | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <BuildsBox builds={data.builds} userId={userId} />
      </div>
    </>
  );
};

export default Builds;
