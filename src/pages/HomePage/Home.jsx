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
        <button onClick={() => window.alert("This mode is not available yet")}>
          Play with Friends
        </button>
      </Link>
      <Link to="/About" className="about-link">
        About
      </Link>
    </div>
  );
}

export default Home;
