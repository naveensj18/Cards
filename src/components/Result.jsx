import React from "react";

export const Result = ({
  userFinalScore,
  computerFinalScore,
  gameResult,
  handleRestartButtonClick,
  gameOver,
  handleExit,
}) => {
  return (
    <div>
      <h3>Your score: {userFinalScore}</h3>
      <h3>Computer score: {computerFinalScore}</h3>
      <p>{gameResult}</p>
      <button onClick={handleRestartButtonClick} disabled={!gameOver}>
        Restart
      </button>
      <button onClick={handleExit}>Exit Game</button>
    </div>
  );
};
