import Head from "next/head";
import { Inter } from "@next/font/google";
import { Anchor } from "../components/Anchor";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [score, setBestScore] = useState(null);

  useEffect(() => {
    const storedScore = JSON.parse(localStorage.getItem("score"));
    if (storedScore) {
      setBestScore(storedScore);
    }
  }, []);
  return (
    <>
      <Head>
        <title>The Higher Lower Scorers</title>
        <meta
          name="description"
          content="Play the higher or lower verison scorers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>The Higher Or Lower Game Version Scorers</h1>
        <Anchor href="/play" width="200px" height="50px;">
          PLAY
        </Anchor>
      </main>
      <style jsx>{`
        main {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        h1 {
          color: #fff;
        }
      `}</style>
    </>
  );
}
