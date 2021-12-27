import type { GetServerSideProps } from "next";
import Head from "next/head";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../../components/lottie/snow-fall-2.json";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import BackButton from "../../../components/back";
import Footer from "../../../components/footer";
import Link from "next/link";
import { parseCookies } from "../../../helpers";
import axios from "axios";

interface UserWishProps {
  data: [
    {
      _id: string;
      userwish_info: [
        {
          wish_id: string;
          content: string;
          creator: string;
          creator_id: string;
          hidename: boolean;
          create_at: string;
        }
      ];
    }
  ];
}

const Wish = ({ data }: UserWishProps) => {
  const { profile } = useContext(UserContext);

  return (
    <div>
      <Head>
        <title>Your Wishs</title>
        <meta property="og:title" content="Wishy Wihshy" key="title" />
        <meta name="description" content="Givemeawish" />

        <meta property="og:image" content="/logo.png" key="ogimage" />
        <meta property="og:site_name" content="wishy wishy" key="ogsitename" />
        <meta
          property="og:description"
          content="ส่งพรปีใหม่ถึงคนแปลกหน้า"
          key="ogdesc"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="manifest" href="/manifest.json" />

        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <BackButton />

      <main className="min-h-screen bg-navy-blue-800 flex flex-col justify-center relative">
        <Player
          autoplay
          loop
          renderer="svg"
          speed={0.5}
          src={animationData}
          className="z-20 absolute top-0 left-0  w-screen h-screen
          object-fill"
        />
        <div className="z-40 container mx-auto">
          <div className="m-2 mt-5 items-start justify-center w-full h-full overflow-hidden flex md:flex-row  md:space-x-5 md:space-y-0 sm:flex-col sm:space-y-2 xs:flex-col xs:space-y-4">
            {data[0].userwish_info.map((wish, index) => (
              <div
                key={index}
                className="bg-white p-2 border-b-4 border-r-4 border-black rounded-xl w-64 min-h-64"
              >
                <h1 className="text-black font-Kanit">
                  {profile?.displayName}
                </h1>
                <p className="font-Kanit p-2">&quot;{wish.content}&quot;</p>
                <p className="text-gray-600 font-Kanit">
                  จาก&nbsp;{wish.creator}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wish;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wish/getwish`;
  const cookie = parseCookies(req);

  const accessToken = cookie.accessToken;

  // console.log(accessToken);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const res = await axios.get(endpoint, { headers });

  console.log(res.data.data);

  return {
    props: { data: res.data.data },
  };
};