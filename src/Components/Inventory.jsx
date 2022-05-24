import PropTypes from 'prop-types';
import React from 'react';
import './Inventory.css';

const Inventory = ({ title, items }) => {
    return (
        <div className="battleship__inventory">
            <div className="inventory__title">{title}</div>
            <div className="inventory__content">

            </div>
        </div>
    )
};

Inventory.displayName = 'Inventory';
Inventory.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array
}

export default Inventory;
