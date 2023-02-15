import React from "react";
import PropTypes, { object } from "prop-types";

import "./Board.css";
import BoardSquare from "./BoardSquare";
import { BOARD_ARR, CURRENT_PLAYER } from "../../utils/DB";
//

// attackedBlocks: ['03', '04', '05']
// currentPlayer: "Computer"
// isHorizontal: false
// isShipSunk: true
// occupiedBlocks: ['03', '04', '05']
// shipLength: 3
// shipName: "cruiser"

const Board = ({
  onClickBoradSquare,
  deployedShips,
  boardOwner,
  hasGameStarted
}) => {
  const isOcupiedCheck = (rowIndex, columnIndex) => {
    let flag = false;
    let shipName = "";
    let isAttacked = false;
    let isShipSunk = false;
    const currentRowColumnIndex = `${rowIndex}${columnIndex}`;

    deployedShips.forEach((ship) => {
      if (
        ship.shipName === "miss" &&
        currentRowColumnIndex === ship.attackedBlocks.join()
      ) {
        shipName = "miss";
      } else if (
        ship.shipName !== "miss" &&
        ship.occupiedBlocks.includes(currentRowColumnIndex)
      ) {
        flag = true;
        shipName = ship.shipName;
        isShipSunk = ship.isShipSunk ? true : false;
        isAttacked = ship.attackedBlocks.includes(currentRowColumnIndex)
          ? true
          : false;
      }
    });
    return {
      isOcupied: flag,
      shipName,
      isShipSunk,
      isAttacked
    };
  };

  return (
    <div
      className={`battleship__board ${
        hasGameStarted && boardOwner === CURRENT_PLAYER.player
          ? "disbale-block"
          : ""
      }`}
    >
      {BOARD_ARR.map((row, columnIndex) => {
        return row.map((_, rowIndex) => {
          return (
            <BoardSquare
              divId={`cell_${rowIndex}_${columnIndex}`}
              onClick={() => {
                onClickBoradSquare({
                  rowIndex,
                  columnIndex,
                  clickedShip:
                    isOcupiedCheck(rowIndex, columnIndex).shipName || ""
                });
              }}
              isOcupiedCheck={isOcupiedCheck(rowIndex, columnIndex)}
              key={`cell_${rowIndex}_${columnIndex}`}
            />
          );
        });
      })}
    </div>
  );
};

Board.displayName = "Board";

Board.propTypes = {
  onClickBoradSquare: PropTypes.func,
  playerDeployedShips: PropTypes.arrayOf(object)
};

export default Board;
