import React from "react";
import "../Result.css"; // Import the CSS file

export const Result = ({
  userFinalScore,
  computerFinalScore,
  gameResult,
  handleRestartButtonClick,
  gameOver,
  handleExit,
}) => {
  return (
    <div className="result-container">
      <h3 className="score">Your score: {userFinalScore}</h3>
      <h3 className="score">Computer score: {computerFinalScore}</h3>
      <p className="game-result">{gameResult}</p>
      <div className="button-container">
        <button
          className="button"
          onClick={handleRestartButtonClick}
          disabled={!gameOver}
        >
          Restart
        </button>
        <button className="button" onClick={handleExit}>
          Exit Game
        </button>
      </div>
    </div>
  );
};
