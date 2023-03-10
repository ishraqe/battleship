import React from "react";
import { CURRENT_PLAYER, MISS_HIT } from "../../../utils/DB";

const BoardSquare = ({ onClick, isOcupiedCheck, boardOwner, divId }) => {
  const { isOcupied, shipName, isShipSunk, isAttacked } = isOcupiedCheck;
  let missBlock = false;
  let boardAttackDeployClass = "";

  if (shipName === MISS_HIT) {
    missBlock = true;
    boardAttackDeployClass = "miss";
  } else if (isShipSunk) {
    boardAttackDeployClass = "ship-sunk";
  } else if (!isShipSunk && isAttacked) {
    boardAttackDeployClass = "hit";
  } else if (shipName !== MISS_HIT && isOcupied) {
    boardAttackDeployClass =
      boardOwner === CURRENT_PLAYER.computer ? "" : shipName;
  }

  return (
    <div
      id={divId}
      onClick={() => {
        if (isShipSunk || isAttacked || missBlock) {
          return;
        }

        onClick();
      }}
      disabled={isShipSunk || isAttacked || missBlock}
      className={`board__square ${boardAttackDeployClass}`}
    ></div>
  );
};

BoardSquare.displayName = "BoardSquare";

export default BoardSquare;
