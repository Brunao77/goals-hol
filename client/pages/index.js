import Head from "next/head";
import { Inter } from "@next/font/google";
import { Anchor } from "../components/Anchor";
import Image from "next/image";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [playOption, setPlayOption] = useState("all");

  const handlePlayOption = (value) => {
    setPlayOption(value);
  };
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
        <Anchor
          href="/play"
          query={{ play_option: playOption }}
          width="200px"
          height="50px;"
        >
          PLAY
        </Anchor>
        <section>
          <div
            onClick={() => handlePlayOption("all")}
            className={`${playOption === "all" ? "checked" : ""}`}
          >
            <Image
              src="/all-world.svg"
              width="64"
              height="64"
              alt="Scorers All History"
            />
            <label class="custom-radio-btn">All</label>
          </div>
          <div
            onClick={() => handlePlayOption("argentine_league")}
            className={`${playOption === "argentine_league" ? "checked" : ""}`}
          >
            <Image
              src="/argentine-league.svg"
              width="64"
              height="64"
              alt="Scorers Argentine League"
            />
            <label class="label-btn">Argentine</label>
          </div>
          <div
            onClick={() => handlePlayOption("boca_juniors")}
            className={`${playOption === "boca_juniors" ? "checked" : ""}`}
          >
            <Image
              src="/boca-juniors.svg"
              width={64}
              height={64}
              alt="Scorers Boca Juniors"
            />
            <label class="label-btn">Boca Juniors</label>
          </div>
          <div
            onClick={() => handlePlayOption("river_plate")}
            className={`${playOption === "river_plate" ? "checked" : ""}`}
          >
            <Image
              src="/river-plate.svg"
              width={64}
              height={64}
              alt="Scorers River Plate"
            />
            <label class="label-btn">River Plate</label>
          </div>
          <div
            onClick={() => handlePlayOption("argentine_national_team")}
            className={`${
              playOption === "argentine_national_team" ? "checked" : ""
            }`}
          >
            <Image
              src="/argentine.svg"
              width="64"
              height="64"
              alt="Scorers Argentine National Team"
            />
            <label class="label-btn">Argentine</label>
          </div>
          <div
            onClick={() => handlePlayOption("world_cup")}
            className={`${playOption === "world_cup" ? "checked" : ""}`}
          >
            <Image
              src="/world-cup.svg"
              width="64"
              height="64"
              alt="Scorers World Cup"
            />
            <label class="label-btn">World Cup</label>
          </div>
        </section>
      </main>
      <footer className="contact">
        <a href="https://www.instagram.com/brunomunne/">
          <Image src="/instagram.svg" width="32" height="32" alt="Instagram" />
        </a>
        <a href="https://twitter.com/Brunao77_">
          <Image src="/twitter.svg" width="32" height="32" alt="Twitter" />
        </a>
        <a href="https://www.twitch.tv/brunao77_">
          <Image src="/twitch.svg" width="32" height="32" alt="Twitch" />
        </a>
      </footer>
      <style jsx>{`
        footer {
          display: grid;
          grid-template-columns: repeat(3, auto);
          grid-gap: 20px;
          color: #fff;
          justify-content: center;
          align-items: center;
        }
        label {
          cursor: pointer;
        }
        .checked {
          border: 2px solid #fff989;
          color: #fff989;
          box-shadow: 0px 0px 3px 3px #fff989 inset;
        }
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 2px solid #979797;
          padding: 10px;
          border-radius: 4px;
          letter-spacing: 1px;
          width: 130px;
          cursor: pointer;
        }
        section {
          display: grid;
          grid-template-columns: repeat(3, auto);
          grid-gap: 5px;
          color: #fff;
          margin-top: 10px;
        }
        main {
          width: 100%;
          height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        h1 {
          color: #fff;
        }
        @media (max-width: 650px) {
          h1 {
            font-size: 16px;
          }
          label {
            font-size: 11px;
          }
          div {
            width: 100px;
          }
        }
      `}</style>
    </>
  );
}
