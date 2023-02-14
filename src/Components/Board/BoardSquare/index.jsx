import React from "react";
import "./BoardSquare.css";

const BoardSquare = ({ onClick, isOcupied, divId }) => {
  return (
    <div
      id={divId}
      onClick={onClick}
      className={`board__square ${
        isOcupied.isOcupied ? isOcupied.shipName : ""
      }`}
    ></div>
  );
};

BoardSquare.displayName = "BoardSquare";

export default BoardSquare;
