import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from "../../../../components/Loader/Loader.component";

const BuildContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledCarousel = styled(Carousel)`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

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

const Build = () => {
  const router = useRouter();
  const { userId, buildId } = router.query;

  const { data, error } = useSWR(
    () =>
      userId && buildId
        ? `/api/build?userId=${userId}&buildId=${buildId}`
        : null,
    fetcher
  );

  if (error) return <div>{error.info}</div>;

  if (!data) return <Loader />;

  return (
    <>
      <Head>
        <title>Build | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BuildContainer>
        <StyledCarousel showThumbs={false}>
          <Image
            src={data.build.summaryImg}
            alt="summary"
            layout="responsive"
            height="900"
            width="1600"
            priority
          />
          <Image
            src={data.build.weaponImg}
            alt="weapon"
            layout="responsive"
            height="900"
            width="1600"
          />
          <Image
            src={data.build.flowerImg}
            alt="flower"
            layout="responsive"
            height="900"
            width="1600"
          />
          <Image
            src={data.build.plumeImg}
            alt="plume"
            layout="responsive"
            height="900"
            width="1600"
          />
          <Image
            src={data.build.sandsImg}
            alt="sands"
            layout="responsive"
            height="900"
            width="1600"
          />
          <Image
            src={data.build.gobletImg}
            alt="goblet"
            layout="responsive"
            height="900"
            width="1600"
          />
          <Image
            src={data.build.circletImg}
            alt="circlet"
            layout="responsive"
            height="900"
            width="1600"
          />
        </StyledCarousel>
        <h1>{data.build.title}</h1>
        <Link href={`/u/${userId}`}>
          <a>{data.build.username}</a>
        </Link>
      </BuildContainer>
    </>
  );
};

export default Build;
