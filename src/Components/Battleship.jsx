import PropTypes from 'prop-types';
import React from 'react';

import Axis from './Axis';
import Board from './Board';
import Inventory from './Inventory';
import TitleBar from './TitleBar';
import './Battleship.css';

const Battleship = () => {
    return (
        <div className="battleship__stage">
            <TitleBar />
            <div className="battleship__content">
                <Axis direction="row" />
                <Axis direction="column" />
                <Board />
                <Inventory title="Inventory" />
            </div>
        </div>
    )
};

Battleship.displayName = 'Battleship';

export default Battleship;
