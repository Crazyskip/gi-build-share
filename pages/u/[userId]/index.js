import Head from "next/head";
import { useRouter } from "next/router";

import useSWR from "swr";
import BuildsBox from "../../../components/BuildsBox/BuildsBox.component";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    const response = await res.json();
    error.info = response.error.message;
    error.status = res.status;
    throw error;
  }
  return res.json();
};

const Builds = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data, error } = useSWR(
    () => (userId ? `/api/builds?userId=${userId}` : null),
    fetcher
  );

  if (error) return <div>{error.info}</div>;

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
