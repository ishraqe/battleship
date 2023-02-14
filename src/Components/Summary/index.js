import React from "react";
import "./Summary.css";

const index = ({
  hasGameStarted,
  availableShips,
  handleGameStart,
  currentPlayer
}) => {
  return (
    <div className="summary">
      <div className="summary__info">
        <h3>Current Player: {currentPlayer}</h3>
      </div>
      {availableShips.length === 0 ? (
        <button className="summary__btn" onClick={handleGameStart}>
          Start Game
        </button>
      ) : null}
    </div>
  );
};

export default index;
