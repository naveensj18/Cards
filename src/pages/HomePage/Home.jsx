import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <Link to="/Mode" className="play-online-button">
        <button>Play Online</button>
      </Link>
      <Link className="play-with-friends-button">
        <button onClick={() => window.alert("This mode not available yet")}>
          Play with Friends
        </button>
      </Link>
    </div>
  );
}

export default Home;
