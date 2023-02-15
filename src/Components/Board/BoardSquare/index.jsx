import React from "react";
import "./BoardSquare.css";

const BoardSquare = ({ onClick, isOcupiedCheck, divId }) => {
  const { isOcupied, shipName, isShipSunk, isAttacked } = isOcupiedCheck;

  let boardAttackDeployClass = "";
  if (shipName === "miss") {
    boardAttackDeployClass = "miss";
  } else if (isShipSunk) {
    boardAttackDeployClass = "ship-sunk";
  } else if (!isShipSunk && isAttacked) {
    boardAttackDeployClass = "hit";
  } else if (shipName !== "miss" && isOcupied) {
    boardAttackDeployClass = shipName;
  }

  return (
    <div
      id={divId}
      onClick={() => (isShipSunk || isAttacked ? null : onClick())}
      className={`board__square ${boardAttackDeployClass}`}
    ></div>
  );
};

BoardSquare.displayName = "BoardSquare";

export default BoardSquare;
