import React from "react";
import "../App.css";

function Attribute({ attribute, value, onClick, isDisabled }) {
  return (
    <div className="attribute">
      <button
        onClick={onClick}
        disabled={isDisabled}
        className="attribute-button"
      >
        <span className="attribute-name">{attribute}:</span>{" "}
        <span className="attribute-value">{value}</span>
      </button>
    </div>
  );
}

export const CardDetails = ({ data, user, handleUserClick, userClick }) => {
  const { Image, Name, Attributes } = data;
  const defaultImage =
    "https://scores.iplt20.com/ipl/images/default-player-statsImage.png";

  const attributeKeys = Object.keys(Attributes);
  const halfLength = Math.ceil(attributeKeys.length / 2);
  const firstColumnAttributes = attributeKeys.slice(0, halfLength);
  const secondColumnAttributes = attributeKeys.slice(halfLength);

  return (
    <section className="card-details">
      <img
        src={Image}
        alt={Name}
        className="card-image"
        onError={(e) => {
          // console.log(Image, "is Invalid URL");
          e.target.src = defaultImage;
          e.onError = null;
        }}
      />
      <h3 className="card-name">{Name}</h3>
      <div className="attributes-container">
        <div className="column">
          {firstColumnAttributes.map((attribute) => (
            <Attribute
              key={attribute}
              attribute={attribute}
              value={Attributes[attribute]}
              onClick={() => {
                user === "user" && handleUserClick(attribute);
              }}
              isDisabled={user === "user" && userClick}
            />
          ))}
        </div>
        <div className="column">
          {secondColumnAttributes.map((attribute) => (
            <Attribute
              key={attribute}
              attribute={attribute}
              value={Attributes[attribute]}
              onClick={() => {
                user === "user" && handleUserClick(attribute);
              }}
              isDisabled={user === "user" && userClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
