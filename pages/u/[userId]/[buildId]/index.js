import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from "../../../../components/Loader/Loader.component";
import device from "../../../../commons/breakpoints";
import { useAuth } from "../../../../hooks/useAuth";
import { deleteBuild } from "../../../../firebase/firebase.utils";

const BuildContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CustomHeight = styled.div`
  display: ${(props) => (props.width ? "block" : "none")};
  margin: 0 auto;
  @media only screen and ${device.lg} {
    max-width: 100%;
    width: ${(props) => props.width}px;
  }
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const router = useRouter();
  const auth = useAuth();
  const { userId, buildId } = router.query;

  const deleteCurrentBuild = async () => {
    await deleteBuild(userId, buildId);
    router.push("/builds");
  };

  const { data, error } = useSWR(
    () =>
      userId && buildId
        ? `/api/build?userId=${userId}&buildId=${buildId}`
        : null,
    fetcher
  );

  if (error) return <div>{error.info}</div>;

  if (!data) return <Loader />;

  const onImageLoad = ({ target: img }) => {
    setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
  };

  return (
    <>
      <Head>
        <title>Build | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BuildContainer>
        <CustomHeight
          width={
            dimensions.width ? (675 / dimensions.height) * dimensions.width : 0
          }
        >
          <StyledCarousel showThumbs={false}>
            <Image
              src={data.build.summaryURL}
              onLoad={onImageLoad}
              alt="summary"
              layout="responsive"
              height={dimensions.height}
              width={dimensions.width}
              priority
            />
            <Image src={data.build.weaponURL} alt="weapon" layout="fill" />
            <Image src={data.build.flowerURL} alt="flower" layout="fill" />
            <Image src={data.build.plumeURL} alt="plume" layout="fill" />
            <Image src={data.build.sandsURL} alt="sands" layout="fill" />
            <Image src={data.build.gobletURL} alt="goblet" layout="fill" />
            <Image src={data.build.circletURL} alt="circlet" layout="fill" />
          </StyledCarousel>
        </CustomHeight>
        <h1>{data.build.buildName}</h1>
        <Link href={`/u/${userId}`}>
          <a>{data.build.username}</a>
        </Link>
        {auth.user?.uid === userId ? (
          <div onClick={deleteCurrentBuild}>Delete</div>
        ) : null}
      </BuildContainer>
    </>
  );
};

export default Build;
