import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../App.css";

import { players } from "../../constants/ipl";
import { getRandomAttribute, shuffleDeck, getBestAttribute } from "../../util";
import { CardDetails } from "../../components/CardDetails";
import { Result } from "../../components/Result";
import { userWins } from "../../utils/userWins";
import { getAttributeBasedOnDifficulty } from "../../utils/difficulty";

// const n = 8;
// let userScore.current = n / 2;
// let computerScore.current = n / 2;
let userFinalScore = 0;
let computerFinalScore = 0;

function Game({ difficulty, numberOfCards }) {
  const navigate = useNavigate();
  const [deck, setDeck] = useState(shuffleDeck(players));
  const [userCards, setUserCards] = useState(deck.slice(0, numberOfCards));
  const [computerCards, setComputerCards] = useState(
    deck.slice(numberOfCards, numberOfCards * 2)
  );
  const [userClick, setUserClick] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState(null);
  const [gameResult, setGameResult] = useState("");
  let userScore = useRef(numberOfCards);
  let computerScore = useRef(numberOfCards);

  // console.log("At the start of rendering\n");
  // console.log(userCards);
  // console.log(computerCards);

  function reassignCards(attribute) {
    if (
      userWins(
        userCards[0]["Attributes"],
        computerCards[0]["Attributes"],
        attribute
      )
    ) {
      setUserCards((prevUserCards) => [
        ...prevUserCards.slice(1),
        computerCards[0],
        userCards[0],
      ]);
      setComputerCards((prevComputerCards) => prevComputerCards.slice(1));
      setUserClick(false);
      userScore.current += 1;
      computerScore.current -= 1;
    } else {
      setComputerCards((prevComputerCards) => [
        ...prevComputerCards.slice(1),
        userCards[0],
        computerCards[0],
      ]);
      setUserCards((prevUserCards) => prevUserCards.slice(1));
      setUserClick(true);
      // setCurrentAttribute(getRandomAttribute);
      // console.log(computerCards[1].Attributes);
      if (computerCards.length == 1) {
        console.log("choosing random..", computerCards[1].Name);
        setCurrentAttribute(getRandomAttribute);
      } else {
        console.log("choosing best..", computerCards[1].Name);
        setCurrentAttribute(
          getAttributeBasedOnDifficulty(difficulty, computerCards[1].Attributes)
        );
      }
      computerScore.current += 1;
      userScore.current -= 1;
    }
    // console.log(
    //   "userCards",
    //   userCards.map((player) => player.Name)
    // );
    // console.log(
    //   "computerCards",
    //   computerCards.map((player) => player.Name)
    // );
  }

  function handleUserClick(attribute) {
    setUserClick(true);
    setCurrentAttribute(attribute);
  }

  function handleRestartButtonClick() {
    setGameOver(false);
    setDeck(shuffleDeck(players));
    setUserCards(deck.slice(0, numberOfCards));
    setComputerCards(deck.slice(numberOfCards, numberOfCards * 2));
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
      setGameResult("Better luck next time!");
      setGameOver(true);
      computerFinalScore += 1;
    }
  }

  const handleExit = () => {
    navigate("/Mode");
  };

  return (
    <div className="body">
      <div className="board">
        <section className="card">
          {!gameOver && (
            <CardDetails
              data={userCards[0]}
              user="user"
              handleUserClick={handleUserClick}
              userClick={userClick}
            />
          )}
        </section>

        <section>
          {userClick && !gameOver && <CardDetails data={computerCards[0]} />}
        </section>
      </div>

      {userClick && !gameOver && (
        <p className="round-results">current attribute: {currentAttribute}</p>
      )}

      {!gameOver && (
        <div>
          <p className="round-results">
            You have {userScore.current} cards remaining
          </p>
          <p className="round-results">
            Computer has {computerScore.current} cards remaining
          </p>
        </div>
      )}

      <div className="next-round-container">
        {!gameOver && (
          <button
            className="next-round"
            onClick={() => {
              reassignCards(currentAttribute),
                evaluateResult(userScore.current, computerScore.current);
            }}
            disabled={!userClick}
          >
            Next round
          </button>
        )}
      </div>

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
    </div>
  );
}

export default Game;
