import React from "react";
import PropTypes, { object } from "prop-types";

import "./Board.css";
import BoardSquare from "./BoardSquare";
import { BOARD_ARR } from "../../utils/DB";
//

const Board = ({ onClickBoradSquare, playerDeployedShips }) => {
  const isOcupied = (rowIndex, columnIndex) => {
    let flag = false;
    let shipIndex = null;

    playerDeployedShips.forEach((ship, index) => {
      const displayingLogic = ship.isHorizontal
        ? ship.axis.x < ship?.shipLength + ship?.axis.x &&
          ship.axis.y === columnIndex
        : ship.axis.y < ship?.shipLength + ship?.axis.y &&
          ship.axis.x === rowIndex;

      if (displayingLogic) {
        flag = true;
        shipIndex = index;
        return;
      }
    });

    if (flag) {
      if (playerDeployedShips[shipIndex].isHorizontal) {
        return (
          rowIndex >= playerDeployedShips[shipIndex]?.axis.x &&
          rowIndex <
            playerDeployedShips[shipIndex]?.shipLength +
              playerDeployedShips[shipIndex]?.axis.x &&
          columnIndex === playerDeployedShips[shipIndex]?.axis.y
        );
      } else {
        return (
          columnIndex >= playerDeployedShips[shipIndex]?.axis.y &&
          columnIndex <
            playerDeployedShips[shipIndex]?.shipLength +
              playerDeployedShips[shipIndex]?.axis.y &&
          rowIndex === playerDeployedShips[shipIndex]?.axis.x
        );
      }
    }
  };

  return (
    <div className="battleship__board">
      {BOARD_ARR.map((row, columnIndex) => {
        return row.map((square, rowIndex) => {
          return (
            <BoardSquare
              divId={`cell_${rowIndex}_${columnIndex}`}
              onClick={() => {
                console.log({ rowIndex, columnIndex });
                onClickBoradSquare({
                  x: rowIndex,
                  y: columnIndex
                });
              }}
              isOcupied={isOcupied(rowIndex, columnIndex)}
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
