import PropTypes from 'prop-types';
import React from 'react';
import AxisItem from './AxisItem';
import './Axis.css';

const Axis = ({ direction = 'row' }) => {
    const getAxisLabels = direction => {
        switch (direction) {
            case 'row':
                return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
                break;
            case 'column':
                return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
                break;
            default:
        }
    }

    return (
        <div className={`battleship__axis ${direction}`}>
            {getAxisLabels(direction).map((label, index) => {
                return <AxisItem key={`axis_label_${label}`} label={label} />
            })}
        </div>
    )
};

Axis.displayName = 'Axis';
Axis.propTypes = {
    direction: PropTypes.string.isRequired
};

export default Axis;
