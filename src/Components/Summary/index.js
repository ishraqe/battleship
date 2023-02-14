import React from "react";
import "./Summary.css";

const index = ({ hasGameStarted, availableShips, handleGameStart }) => {
  return (
    <div className="summary">
      <div className="summary__info">
        <h3>Player Turn: </h3>
      </div>
      {availableShips.length === 0 ? (
        <button className="summary__start" onClick={handleGameStart}>
          Start Game
        </button>
      ) : null}
    </div>
  );
};

export default index;
