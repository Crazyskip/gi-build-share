import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../utils/UserContext";

const AddBuild = () => {
  const user = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);

  return (
    <div>
      <Head>
        <title>Add Build | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Add Build</h1>
    </div>
  );
};

export default AddBuild;
