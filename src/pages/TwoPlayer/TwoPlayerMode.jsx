import React, { useState } from "react";
import { Link } from "react-router-dom";
import { randomCodeGenerator } from "../../utils/randomCodeGenerator";
import "./TwoPlayerMode.css"; // Import the CSS file

const TwoPlayerMode = () => {
  const [roomCode, setRoomCode] = useState("");

  return (
    <div className="Homepage">
      <div className="homepage-menu">
        <div className="homepage-form">
          <div className="homepage-join">
            <input
              type="text"
              placeholder="Game Code"
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Link to={`/play?roomCode=${roomCode}`}>
              <button className="game-button green">JOIN GAME</button>
            </Link>
          </div>
          <h1>OR</h1>
          <div className="homepage-create">
            <Link to={`/play?roomCode=${randomCodeGenerator(5)}`}>
              <button className="game-button orange">CREATE GAME</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoPlayerMode;
