import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../App.css";

import { players } from "../../constants/ipl";
import { getRandomAttribute, shuffleDeck, getBestAttribute } from "../../util";
import { CardDetails } from "../../components/CardDetails";
import { Result } from "../../components/Result";
import { userWins } from "../../utils/userWins";
import { getAttributeBasedOnDifficulty } from "../../utils/difficulty";
import { Timer } from "../../components/Timer";
import Modal from "../../components/Modal";
import { DrawDeck } from "../../components/DrawDeck";

let userFinalScore = 0;
let computerFinalScore = 0;

function Game({ difficulty, numberOfCards }) {
  const navigate = useNavigate();
  const [deck, setDeck] = useState(shuffleDeck(players));
  const [userCards, setUserCards] = useState(deck.slice(0, numberOfCards));
  const [computerCards, setComputerCards] = useState(
    deck.slice(numberOfCards, numberOfCards * 2)
  );
  const [drawCards, setDrawCards] = useState([]);
  const [userClick, setUserClick] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState(null);
  const [gameResult, setGameResult] = useState("");
  const [timeUp, setTimeUp] = useState(false);
  const [turn, setTurn] = useState("user");
  const [draw, setDraw] = useState(false);
  const [show, setShow] = useState(false);
  let userScore = useRef(numberOfCards);
  let computerScore = useRef(numberOfCards);
  let userWinningRound = useRef(0);
  let currentRound = useRef(0);
  let memory = useRef({});

  function reassignCards(attribute) {
    currentRound.current += 1;
    //Draw
    if (
      currentAttribute !== null &&
      userCards[0]["Attributes"][attribute] ===
        computerCards[0]["Attributes"][attribute]
    ) {
      setDrawCards((prevDrawCards) => [
        ...prevDrawCards,
        userCards[0],
        computerCards[0],
      ]);
      setUserCards((prevUserCards) => prevUserCards.slice(1));
      setComputerCards((prevComputerCards) => prevComputerCards.slice(1));
      setDraw(true);
      userScore.current -= 1;
      computerScore.current -= 1;
      if (turn == "user") {
        setUserClick(false);
      } else {
        if (computerCards.length == 1) {
          setCurrentAttribute(getRandomAttribute);
        } else {
          setCurrentAttribute(
            getAttributeBasedOnDifficulty(
              difficulty,
              computerCards[1].Attributes,
              memory,
              currentRound.current
            )
          );
        }
      }
    } else if (
      userWins(
        userCards[0]["Attributes"],
        computerCards[0]["Attributes"],
        attribute
      )
    ) {
      setUserCards((prevUserCards) => [
        ...prevUserCards.slice(1),
        ...drawCards,
        computerCards[0],
        userCards[0],
      ]);
      setComputerCards((prevComputerCards) => prevComputerCards.slice(1));
      setUserClick(false);
      setDrawCards([]);
      setTurn("user");
      setDraw(false);
      userScore.current += 1 + drawCards.length;
      computerScore.current -= 1;
      console.log(drawCards);
      drawCards.map((drawCard, index) => {
        memory[userWinningRound.current + numberOfCards + index + 1] =
          drawCard.Attributes;
      });
      memory[userWinningRound.current + numberOfCards + drawCards.length + 1] =
        computerCards[0].Attributes;
      memory[userWinningRound.current + numberOfCards + drawCards.length + 2] =
        userCards[0].Attributes;
      console.log("current round->", currentRound, "memory -> ", memory);
      userWinningRound.current += 2 + drawCards.length;
      //computer wins
    } else {
      setComputerCards((prevComputerCards) => [
        ...prevComputerCards.slice(1),
        ...drawCards,
        userCards[0],
        computerCards[0],
      ]);
      setUserCards((prevUserCards) => prevUserCards.slice(1));
      setUserClick(true);
      setDrawCards([]);
      setTurn("computer");
      setDraw(false);
      if (computerCards.length == 1) {
        setCurrentAttribute(getRandomAttribute);
      } else {
        setCurrentAttribute(
          getAttributeBasedOnDifficulty(
            difficulty,
            computerCards[1].Attributes,
            memory,
            currentRound.current
          )
        );
      }
      computerScore.current += 1 + drawCards.length;
      userScore.current -= 1;
    }
  }

  function handleUserClick(attribute) {
    setUserClick(true);
    setCurrentAttribute(attribute);
  }

  const handleTimeUp = () => {
    setTimeUp(true);
    setUserClick(true);
    setShow(false);
    setCurrentAttribute(null);
  };

  const showDrawCards = () => {
    setShow(true);
  };

  function handleRestartButtonClick() {
    setGameOver(false);
    setDeck(shuffleDeck(players));
    setUserCards(deck.slice(0, numberOfCards));
    setComputerCards(deck.slice(numberOfCards, numberOfCards * 2));
    setCurrentAttribute(null);
    setGameResult("");
    setUserClick(false);
    setTurn("user");
    setDrawCards([]);
    setDraw(false);
    userScore.current = numberOfCards;
    computerScore.current = numberOfCards;
    userWinningRound.current = 0;
    currentRound.current = 0;
    memory.current = {};
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

  const closeModal = () => {
    setTimeUp(false);
    setShow(false);
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
              currentAttribute={currentAttribute}
              who="user"
            />
          )}
        </section>
        <section>
          {userClick && !gameOver && (
            <CardDetails
              data={computerCards[0]}
              currentAttribute={currentAttribute}
              who="computer"
            />
          )}
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

      {!userClick && !timeUp && !gameOver && (
        <Timer timeLimit={15} onTimeUp={handleTimeUp} />
      )}

      <div className="next-round-container">
        {!gameOver && (
          <button
            className="next-round"
            onClick={() => {
              reassignCards(currentAttribute),
                evaluateResult(userScore.current, computerScore.current);
              setTimeUp(false);
            }}
            disabled={!userClick}
          >
            Next round
          </button>
        )}
        {draw && !gameOver && (
          <button className="drawDeck" onClick={showDrawCards}>
            View Draw cards
          </button>
        )}
      </div>

      <Modal isOpen={timeUp} onClose={closeModal}>
        <h2>Time is Up!</h2>
        <p>Computer will choose the next card...</p>
      </Modal>

      <Modal isOpen={show} onClose={closeModal}>
        <h2>Draw Cards</h2>
        <DrawDeck drawCards={drawCards} />
      </Modal>

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
