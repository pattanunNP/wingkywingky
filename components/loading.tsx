import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./lottie/jumping-gift-boxes.json";
import Head from "next/head";

export default function Loading() {
  return (
    <>
      <Head>
        <title>Loading ...</title>
        <meta name="description" content="Givemeawish" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="min-h-screen bg-navy-blue-800 py-6 flex flex-col justify-center relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center">
            <Player
              autoplay
              loop
              src={animationData}
              style={{ height: "300px", width: "300px" }}
            ></Player>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-white font-Kanit">กำลังโหลด&nbsp;...</h1>
          </div>
        </div>
      </div>
    </>
  );
}
