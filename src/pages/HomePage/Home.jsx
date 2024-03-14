import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Assuming your CSS file is named Home.css

function Home() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/Mode" className="nav-link">
            Play Online
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Play with friends
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Home;
