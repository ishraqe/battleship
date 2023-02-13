import React from "react";
import PropTypes, { object } from "prop-types";

import "./Board.css";
import BoardSquare from "./BoardSquare";
import { BOARD_ARR } from "../../utils/DB";

const Board = ({ onClickBoradSquare, playerDeployedShips }) => {
  return (
    <div className="battleship__board">
      {BOARD_ARR.map((row, rowIndex) => {
        return row.map((square, columnIndex) => {
          return (
            <BoardSquare
              onClick={() =>
                onClickBoradSquare({
                  x: columnIndex,
                  y: rowIndex
                })
              }
              isOcupied={(columnIndex === 0 && rowIndex == 8) || rowIndex === 9}
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
