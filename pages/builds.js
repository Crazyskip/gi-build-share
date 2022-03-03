import Head from "next/head";
import BuildsBox from "../components/BuildsBox/BuildsBox.component";

const builds = [
  { id: "1", title: "Xiao Main Build 1", summaryImg: "/img/summary.png" },
  { id: "2", title: "Xiao Main Build 2", summaryImg: "/img/summary.png" },
  { id: "3", title: "Xiao Main Build 3", summaryImg: "/img/summary.png" },
  { id: "4", title: "Xiao Main Build 4", summaryImg: "/img/summary.png" },
  { id: "5", title: "Xiao Main Build 5", summaryImg: "/img/summary.png" },
  { id: "6", title: "Xiao Main Build 6", summaryImg: "/img/summary.png" },
  { id: "7", title: "Xiao Main Build 7", summaryImg: "/img/summary.png" },
  { id: "8", title: "Xiao Main Build 8", summaryImg: "/img/summary.png" },
  { id: "9", title: "Xiao Main Build 9", summaryImg: "/img/summary.png" },
  { id: "10", title: "Xiao Main Build 10", summaryImg: "/img/summary.png" },
  { id: "11", title: "Xiao Main Build 11", summaryImg: "/img/summary.png" },
];

const Builds = () => {
  return (
    <div>
      <Head>
        <title>Builds | GI Build Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BuildsBox builds={builds} />
    </div>
  );
};

export default Builds;
