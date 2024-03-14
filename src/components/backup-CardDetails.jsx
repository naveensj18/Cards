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

  return (
    <section className="card-details">
      <img
        src={Image}
        alt={Name}
        className="card-image"
        onError={(e) => {
          console.log(Image, "is Invalid URL");
          e.target.src = defaultImage;
          e.onError = null;
        }}
      />
      <h3 className="card-name">{Name}</h3>
      <div className="attributes-container">
        {Object.entries(Attributes).map(([attribute, value]) => (
          <Attribute
            key={attribute}
            attribute={attribute}
            value={value}
            onClick={() => {
              user === "user" && handleUserClick(attribute);
            }}
            isDisabled={user === "user" && userClick}
          />
        ))}
      </div>
    </section>
  );
};
