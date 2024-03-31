import React from "react";
import "./About.css"; // Import the CSS file for the About component

export const About = () => {
  return (
    <div className="about-container">
      <h2>About</h2>
      <p>
        This is an online version of a traditional card game that many of us
        have played during our childhood.
      </p>
      <p>
        In the play online mode, you can play against a bot. This mode has three
        levels:
      </p>
      <ol>
        <li>
          Easy - Bot doesn't know cricket, it chooses some attribute randomly.
        </li>
        <li>Medium - Bot knows cricket, it chooses attributes wisely.</li>
        <li>
          Hard - Bot knows cricket and has good memory. It remembers the cards
          you stack behind after each round.
        </li>
      </ol>
      <img
        src="https://90smittaikadai.com/wp-content/uploads/2023/03/CRICKET-CARD.webp"
        alt="Cricket Card"
      />
    </div>
  );
};
