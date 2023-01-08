import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Anchor } from "../components/Anchor";

export default function Lose() {
  const [score, setScore] = useState(null);
  const [playOption, setPlayOption] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { score, play_option } = router.query;
    setScore(score);
    setPlayOption(play_option);
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
        <h3>You scored:</h3>
        <h1>{score}</h1>
        <div>
          <Anchor href="/" width="200px" height="50px;">
            BACK TO MENU
          </Anchor>
          <Anchor
            href="/play"
            query={{ play_option: playOption }}
            width="200px"
            height="50px;"
          >
            PLAY AGAIN
          </Anchor>
        </div>
      </main>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
        main {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        h3 {
          color: #fff;
          margin: 0;
        }
        h1 {
          color: #fff989;
          font-size: 60px;
          margin: 0;
        }
      `}</style>
    </>
  );
}
