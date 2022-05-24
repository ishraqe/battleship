import React from 'react';
import BoardSquare from './BoardSquare';
import './Board.css';

const Board = () => {
    const board = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ];
    return (
        <div className="battleship__board">
            {board.map(row => {
                return row.map(square => {
                    return <BoardSquare />
                })
            })}
        </div>
    )
};

Board.displayName = 'Board';

export default Board;
