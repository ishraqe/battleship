import React from "react";
import "./BoardSquare.css";

const BoardSquare = ({ onClick, isOcupied }) => {
  return (
    <div
      onClick={onClick}
      className={`board__square ${isOcupied ? "destroyer" : ""}`}
    ></div>
  );
};

BoardSquare.displayName = "BoardSquare";

export default BoardSquare;
