import Head from "next/head";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const sortRandom = (array) => {
  return array.sort(() => Math.round(Math.random() * -1));
};

export default function Play() {
  const [scorers, setScorers] = useState([]);
  const [scorersPlayed, setScorersPlayed] = useState(1);
  const [score, setScore] = useState(0);
  const [animation, setAnimation] = useState("vs");
  const [bestScore, setBestScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://goals-hol.brucolon.workers.dev/scorers");
      const scorersData = await res.json();
      const sortScorers = sortRandom(scorersData);
      setScorers(sortScorers);
      const storedScore = JSON.parse(localStorage.getItem("score"));
      storedScore && setBestScore(storedScore);
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
    setScore((prevScore) => prevScore + 1);
    setTimeout(() => {
      setAnimation("vs");
      scorersPlayed < scorers.length - 1
        ? setScorersPlayed((prevScorersPlayed) => prevScorersPlayed + 1)
        : console.log("You WIN");
    }, 3000);
  };

  const wrongOption = () => {
    setAnimation("lose");
    score > bestScore && localStorage.setItem("score", JSON.stringify(score));
    setTimeout(() => {
      router.push({
        pathname: "/lose",
        query: { score },
      });
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
          {animation === "vs" ? (
            <>
              <Button
                onClick={() => handleClick("higher")}
                width="200px"
                heigth="60px"
              >
                Higher
              </Button>
              <Button
                onClick={() => handleClick("lower")}
                width="200px"
                heigth="60px"
              >
                Lower
              </Button>
            </>
          ) : (
            <h1 className="goals-guess">{scorers[scorersPlayed].goals}</h1>
          )}
          <span>goals than {scorers[scorersPlayed - 1].name}</span>
        </section>
        <div className={`score-cont ${animation}`}>{score}</div>
        <span className="best-score">Best score: {bestScore}</span>
      </main>
      <style jsx>{`
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
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
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
        }
        .best-score {
          position: absolute;
          font-weight: 800;
          font-size: 25px;
          top: 95%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .goals-guess {
          font-size: 60px;
          color: #fff989;
          animation: fadeIn 2s;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
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
            color: transparent;
          }
          to {
            background-color: #84ff52;
            color: #fff;
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
      `}</style>
    </>
  );
}
