import React from "react";
import PropTypes, { object } from "prop-types";

import "./Board.css";
import BoardSquare from "./BoardSquare";
import { BOARD_ARR, CURRENT_PLAYER } from "../../utils/DB";
//

const Board = ({ onClickBoradSquare, deployedShips, boardOwner }) => {
  const isOcupied = (rowIndex, columnIndex) => {
    let flag = false;
    let shipName = "";
    deployedShips.forEach((ship) => {
      if (ship.ocupiedBlocks.includes(`${rowIndex}${columnIndex}`)) {
        flag = true;
        shipName = ship.shipName;
      }
    });

    return {
      isOcupied: flag,
      shipName
    };
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
