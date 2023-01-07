import Head from "next/head";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";

const inter = Inter({ subsets: ["latin"] });

const sortRandom = (array) => {
  return array.sort(() => Math.round(Math.random() * -1));
};

export default function Play() {
  const [scorers, setScorers] = useState([]);
  const [scorersPlayed, setScorersPlayed] = useState(1);
  const [score, setScore] = useState(0);
  const [animation, setAnimation] = useState("vs");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://goals-hol.brucolon.workers.dev/scorers");
      const scorersData = await res.json();
      const sortScorers = sortRandom(scorersData);
      setScorers(sortScorers);
    };
    fetchData();
  }, []);

  if (scorers.length === 0) return null;

  const handleClick = (action) => {
    const goalsToGuess = scorers[scorersPlayed].goals;
    const goalsToCompare = scorers[scorersPlayed - 1].goals;

    if (action === "higher") {
      return goalsToGuess >= goalsToCompare ? correctOption() : wrongOption();
    }

    return goalsToGuess <= goalsToCompare ? correctOption() : wrongOption();
  };

  const correctOption = () => {
    setAnimation("win");
    setTimeout(() => {
      setAnimation("vs");
      setScore((prevScore) => prevScore + 1);
      scorersPlayed < scorers.length - 1
        ? setScorersPlayed((prevScorersPlayed) => prevScorersPlayed + 1)
        : console.log("You WIN");
    }, 3000);
  };

  const wrongOption = () => {
    setAnimation("lose");
    setTimeout(() => {
      setAnimation("vs");
    }, 3000);
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
        <section className="option-one">
          <h1>{scorers[scorersPlayed - 1].name}</h1>
          <span>has</span>
          <h1 className="goals">{scorers[scorersPlayed - 1].goals}</h1>
          <span>goals</span>
        </section>
        <section className="option-two">
          <h1>{scorers[scorersPlayed].name}</h1>
          <span>has</span>
          <div className="btn-cont">
            <Button onClick={() => handleClick("higher")}>Higher</Button>
          </div>
          <div className="btn-cont">
            <Button onClick={() => handleClick("lower")}>Lower</Button>
          </div>
          <span>goals than {scorers[scorersPlayed - 1].name}</span>
        </section>
        <div className={`score-cont ${animation}`}>{score}</div>
      </main>
      <style jsx>{`
        .lose {
          animation: mymoveLost 3s;
          color: #fff;
        }
        .win {
          animation: mymoveWin 3s;
          color: #fff;
        }
        @keyframes mymoveLost {
          from {
            background-color: white;
          }
          to {
            background-color: #ff5252;
          }
        }
        @keyframes mymoveWin {
          from {
            background-color: white;
          }
          to {
            background-color: #84ff52;
          }
        }
        .vs {
          color: #000;
        }
        .score-cont {
          position: absolute;
          width: 80px;
          height: 80px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 100%;
          font-size: 40px;
          font-weight: 800;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .goals {
          font-size: 60px;
          color: #fff989;
        }
        .btn-cont {
          width: 200px;
          height: 60px;
        }
        main {
          padding: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: row;
          color: white;
        }
        section {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          height: 100%;
          gap: 10px;
        }
        h1 {
          color: white;
          position: relative;
          font-size: 30px;
          margin: 0;
        }
        span {
          position: relative;
        }
        .option-one {
          background-image: url(${scorers[scorersPlayed - 1].imgURL});
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
        .option-one:before {
          content: " ";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.6);
        }
        .option-two {
          background-image: url(${scorers[scorersPlayed].imgURL});
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
      `}</style>
    </>
  );
}
