import React from "react";
import "./Summary.css";

const index = ({
  hasGameStarted,
  playerAvailableShips,
  handleGameStart,
  currentPlayer
}) => {
  return (
    <div className="summary">
      <div className="summary__info">
        <h3>Current Player: {currentPlayer}</h3>
      </div>
      {playerAvailableShips.length === 0 ? (
        <button className="summary__btn" onClick={handleGameStart}>
          Start Game
        </button>
      ) : null}
    </div>
  );
};

export default index;
