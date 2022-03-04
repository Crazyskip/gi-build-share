import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import useSWR from "swr";

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
        {data.builds.map((build) => (
          <Link href={`/u/${userId}/${build.id}`} key={build.id}>
            <a>{build.title}</a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Builds;
