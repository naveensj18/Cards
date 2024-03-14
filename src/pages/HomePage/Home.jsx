import React from "react";
import "./Home.css"; // Assuming your CSS file is named Home.css

function Home() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <a href={`/Mode`} className="nav-link">
            Play Online
          </a>
        </li>
        <li className="nav-item">
          <a href={`/`} className="nav-link">
            Play with friends
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Home;
