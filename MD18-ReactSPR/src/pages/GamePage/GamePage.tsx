import React, { useState } from "react";
import style from "./GamePage.module.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {postResult} from "../../components/api/Client"
import { useTranslation } from 'react-i18next';

interface IChoice {
  name: string;
  img: string;
  elementImg: string;
}

const GamePage: React.FC = () => {
  
  const {t} = useTranslation();
  const choices: IChoice[] = [
    {
      name: t('water'),
      img: "images/water512.png",
      elementImg: "images/water_blow.png",
    },
    {
      name: t('frost'),
      img: "images/frost512.png",
      elementImg: "images/ice_blow.png",
    },
    {
      name: t('fire'),
      img: "images/fire512.png",
      elementImg: "images/fire_blow.png",
    },
  ];

  const [playerChoice, setPlayerChoice] = useState<IChoice | null>(null);
  const [computerChoice, setComputerChoice] = useState<IChoice | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [playerLives, setPlayerLives] = useState<number>(7);
  const [computerLives, setComputerLives] = useState<number>(7);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const postResultMutation = useMutation({
    mutationFn: postResult,
    onSuccess: () => {
      console.log("Result posted successfully");
    },
    onError: () => {
      console.log("Error posting result");
    },
  });

  const handleChoice = (choice: IChoice) => {
    if (gameOver) {
      return;
    }

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);

    // console.log(choice.name, "  ", computerChoice.name);

    if (choice === computerChoice) {
      setResult(t('collision'));
    } else if (
      (choice === choices[0] && computerChoice === choices[2] ) ||
      (choice === choices[1] && computerChoice === choices[0]) ||
      (choice === choices[2]  && computerChoice === choices[1])
    ) {
      setResult(t('youWin'));
      setComputerLives(computerLives - 1);
      const winnerLives = playerLives-computerLives+1;
      if (computerLives - 1 === 0) {
        setResult(t('youWinGame'));
        setGameOver(true);
        postResultMutation.mutate({winnerLives});
      }
    } else {
      setResult(t('botWin'));
      const winnerLives = playerLives-computerLives-1;
      setPlayerLives(playerLives - 1);
      if (playerLives - 1 === 0) {
        setResult(t('botWinGame'));
        setGameOver(true);
        postResultMutation.mutate({winnerLives});
      }
    }
  };

  const handleReset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setPlayerLives(7);
    setComputerLives(7);
    setGameOver(false)
  };

  return (
    <div className="wrapper">
      <div className={style.gameContainer}>
      <div className={style.titleBox}>
          <h2 className={style.pageTitle}>{t('title')}</h2>
          </div>
        <div className={style.duelView}>
          <div className={`${style.player} ${style.oponent}`}>
            {playerChoice ? (
              [
                <img
                  className={style.imgChoice}
                  src={playerChoice.elementImg}
                  alt={playerChoice.name}
                />,
                <h4 className={style.choiceText}>{playerChoice.name}</h4>,
              ]
            ) : (
              <h4 className={style.choiceText}>{t('makeYourChoice')}</h4>
            )}
            <div className={style.oponentText}>
            <h2>{t('you')}</h2>
            <h5>{t('livesLeft')}: {playerLives}</h5>
            </div>
          </div>

          <div className={style.resultBox}>
            <h2 className={style.result}>{result}</h2>
            {gameOver && (
              <button className={style.startButton} onClick={handleReset}>
                {t('playAgain')}
              </button>
            )}
          </div>

          <div className={`${style.computer} ${style.oponent}`}>
            {computerChoice ? (
              [<h4 className={style.choiceText}>{computerChoice.name}</h4>,
                <img
                  className={`${style.imgChoice} ${style.invertedImg}`}
                  src={computerChoice.elementImg}
                  alt={computerChoice.name}
                />
              ]
            ) : (
              <h4 className={style.choiceText}>{t('botWaits')}</h4>
            )}
            <div className={style.oponentText}>
            <h2>{t('bot')}</h2>
            <h5>{t('livesLeft')}: {computerLives}</h5>
            </div>
          </div>
        </div>
        <div className={style.choicesBox}>
          {choices.map((choice) => (
            <button
              className={style.choice}
              key={choice.name}
              onClick={() => handleChoice(choice)}
              disabled={gameOver}
            >
              <img
                key={`button-${choice.name}`}
                className={style.imgButton}
                src={choice.img}
                alt={choice.name}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
