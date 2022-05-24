import PropTypes from 'prop-types';
import React from 'react';

import Axis from './Axis';
import Board from './Board';
import './Battleship.css';

const Battleship = () => {
    return (
        <div className="battleship__stage">
            <Axis direction="row" />
            <Axis direction="column" />
            <Board />
        </div>
    )
};

Battleship.displayName = 'Battleship';

export default Battleship;
