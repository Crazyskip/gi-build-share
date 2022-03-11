import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from "../../../../components/Loader/Loader.component";
import device from "../../../../commons/breakpoints";
import { useAuth } from "../../../../hooks/useAuth";
import { deleteBuild } from "../../../../firebase/firebase.utils";
import { useBuild } from "../../../../hooks/useBuild";
import { grey, lightGrey } from "../../../../utils/colors";
import AddBuildButton from "../../../../components/AddBuildButton/AddBuildButton.component";
import DeleteButton from "../../../../components/DeleteButton/DeleteButton.component";

const BuildContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CustomWidth = styled.div`
  display: ${(props) => (props.width ? "block" : "none")};
  margin: 0 auto;
  @media only screen and ${device.lg} {
    max-width: 100%;
    width: ${(props) => props.width}px;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;

  @media only screen and ${device.sm} {
    position: relative;
  }
`;

const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const StyledCarousel = styled(Carousel)`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Details = styled.div`
  margin-top: 15px;
`;

const StyledLink = styled.a`
  margin: 50px 0 0 25px;
  font-size: 1.6rem;
  font-weight: 500;

  &:hover {
    color: ${lightGrey};
  }
`;

const Build = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const router = useRouter();
  const auth = useAuth();
  const { userId, buildId } = router.query;

  const deleteCurrentBuild = async () => {
    await deleteBuild(userId, buildId);
    router.push("/builds");
  };

  const { data, isLoading, isError } = useBuild(userId, buildId);

  if (isLoading) return <Loader />;

  if (isError) return <div>{isError.info}</div>;

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
        <StyledHeader>
          <Title>{data.build.buildName}</Title>
          {auth.user?.uid === userId ? (
            <DeleteButton onDelete={deleteCurrentBuild} />
          ) : null}
        </StyledHeader>
        <CustomWidth
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
          <Details>
            <Link href={`/u/${userId}`} passHref>
              <StyledLink>{data.build.username}</StyledLink>
            </Link>
          </Details>
        </CustomWidth>
      </BuildContainer>
    </>
  );
};

export default Build;
