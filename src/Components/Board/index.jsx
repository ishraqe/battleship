import React from "react";
import PropTypes, { object } from "prop-types";

import "./Board.css";
import BoardSquare from "./BoardSquare";
import { BOARD_ARR } from "../../utils/DB";
//

const Board = ({ onClickBoradSquare, playerDeployedShips }) => {
  const isOcupied = (rowIndex, columnIndex) => {
    if (playerDeployedShips.isHorizontal) {
      return (
        rowIndex >= playerDeployedShips[0]?.axis.x &&
        rowIndex <
          playerDeployedShips[0]?.shipLength + playerDeployedShips[0]?.axis.x &&
        columnIndex === playerDeployedShips[0]?.axis.y
      );
    }
    return (
      columnIndex >= playerDeployedShips[0]?.axis.y &&
      columnIndex <
        playerDeployedShips[0]?.shipLength + playerDeployedShips[0]?.axis.y &&
      rowIndex === playerDeployedShips[0]?.axis.x
    );
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
