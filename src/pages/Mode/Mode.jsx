import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Mode.css";

function Mode() {
  const [formData, setFormData] = useState({
    difficulty: "easy",
    numberOfCards: "5",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Construct query string with form data
    const queryString = Object.keys(formData)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`
      )
      .join("&");

    // Navigate to Game and pass form data as query parameters
    navigate(`/Game?${queryString}`);
  };

  return (
    <div className="mode-container">
      <h2>Choose Your Mode</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="easy"
              checked={formData.difficulty === "easy"}
              onChange={handleInputChange}
            />
            Easy
          </label>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="medium"
              checked={formData.difficulty === "medium"}
              onChange={handleInputChange}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="hard"
              checked={formData.difficulty === "hard"}
              onChange={handleInputChange}
              disabled
            />
            Hard
          </label>
        </div>
        <div>
          <label>Number of Cards:</label>
          <select
            name="numberOfCards"
            value={formData.numberOfCards}
            onChange={handleInputChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default Mode;
