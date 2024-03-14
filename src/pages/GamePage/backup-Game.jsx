import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../App.css";

import { players } from "../../constants/ipl";
import { shuffleDeck } from "../../util";
import { CardDetails } from "../../components/CardDetails";
import { Result } from "../../components/Result";
import { userWins } from "../../utils/userWins";
import { getAttributeBasedOnDifficulty } from "../../utils/difficulty";

let userFinalScore = 0;
let computerFinalScore = 0;

function Game({ difficulty, numberOfCards }) {
  const [userClick, setUserClick] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState(null);
  const [gameResult, setGameResult] = useState("");
  const navigate = useNavigate();
  let deck = useRef(shuffleDeck(players));
  let userCards = useRef(deck.current.slice(0, numberOfCards));
  let computerCards = useRef(
    deck.current.slice(numberOfCards, numberOfCards * 2)
  );
  let userScore = useRef(numberOfCards);
  let computerScore = useRef(numberOfCards);

  // console.log("At the start of rendering\n");
  // console.log(userCards);
  // console.log(computerCards);

  function reassignCards(attribute) {
    if (
      userWins(
        userCards.current[0]["Attributes"],
        computerCards.current[0]["Attributes"],
        attribute
      )
    ) {
      userCards.current = [
        ...userCards.current.slice(1),
        computerCards.current[0],
        userCards.current[0],
      ];
      computerCards.current = computerCards.current.slice(1);
      console.log("after wins wins..", currentAttribute);
      setUserClick(false);
      userScore.current += 1;
      computerScore.current -= 1;
    } else {
      computerCards.current = [
        ...computerCards.current.slice(1),
        userCards.current[0],
        computerCards.current[0],
      ];
      userCards.current = userCards.current.slice(1);
      // console.log(
      //   "userCards",
      //   userCards.current.map((player) => player.Name)
      // );
      // console.log(
      //   "computerCards",
      //   computerCards.current.map((player) => player.Name)
      // );
      setUserClick(true);
      setCurrentAttribute(
        getAttributeBasedOnDifficulty(
          difficulty,
          computerCards.current[0].Attributes
        )
      );
      console.log("after computer wins..", currentAttribute);
      // setCurrentAttribute(getRandomAttribute);
      computerScore.current += 1;
      userScore.current -= 1;
    }
  }

  function handleUserClick(attribute) {
    setUserClick(true);
    setCurrentAttribute(attribute);
  }

  function handleRestartButtonClick() {
    setGameOver(false);
    deck.current = shuffleDeck(players);
    userCards.current = deck.current.slice(0, numberOfCards);
    computerCards.current = deck.current.slice(
      numberOfCards,
      numberOfCards * 2
    );
    setCurrentAttribute(null);
    setGameResult("");
    setUserClick(false);
    userScore.current = numberOfCards;
    computerScore.current = numberOfCards;
  }

  function evaluateResult(userScore, computerScore) {
    if (computerScore === 0) {
      setGameResult("Congrats! You won the game");
      setGameOver(true);
      userFinalScore += 1;
    } else if (userScore === 0) {
      setGameResult("better luck next time");
      setGameOver(true);
      computerFinalScore += 1;
    }
  }

  const handleExit = () => {
    navigate("/Mode");
  };

  return (
    <>
      <div className="board">
        <section className="card">
          {!gameOver && (
            <CardDetails
              data={userCards.current[0]}
              user="user"
              handleUserClick={handleUserClick}
              userClick={userClick}
            />
          )}
        </section>

        <section>
          {userClick && !gameOver && (
            <CardDetails data={computerCards.current[0]} />
          )}
        </section>
      </div>

      {userClick && !gameOver && <p>current attribute: {currentAttribute}</p>}
      <p className="font-colour">
        You have {userScore.current} cards remaining
      </p>
      <p>Computer has {computerScore.current} cards remaining</p>

      {!gameOver && (
        <button
          onClick={() => {
            reassignCards(currentAttribute),
              evaluateResult(userScore.current, computerScore.current);
          }}
          disabled={!userClick}
        >
          Next round
        </button>
      )}

      {gameOver && (
        <Result
          userFinalScore={userFinalScore}
          computerFinalScore={computerFinalScore}
          gameResult={gameResult}
          handleRestartButtonClick={handleRestartButtonClick}
          gameOver={gameOver}
          handleExit={handleExit}
        />
      )}
    </>
  );
}

export default Game;
