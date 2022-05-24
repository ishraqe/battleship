import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import AxisItem from './AxisItem';
import './Axis.css';

const Axis = ({ direction = 'row' }) => {
    const [axisLabels, setAxisLabels] = useState([]);
    const axisRef = useRef(null);

    useEffect(() => {
        if (axisRef.current) {
            axisRef.current.style.setProperty('--axis-direction', direction);

            if (direction === 'row') {
                axisRef.current.style.setProperty('--axis-width', '500px');
                axisRef.current.style.setProperty('--axis-height', '20px');
                axisRef.current.style.setProperty('--axis-left', '30px');
                axisRef.current.style.setProperty('--axis-top', '0px');
                setAxisLabels(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
            } else {
                axisRef.current.style.setProperty('--axis-width', '20px');
                axisRef.current.style.setProperty('--axis-height', '500px');
                axisRef.current.style.setProperty('--axis-left', '0px');
                axisRef.current.style.setProperty('--axis-top', '30px');
                setAxisLabels(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']);
            }
        }
    });

    return (
        <div ref={axisRef} className="battleship__axis">
            {axisLabels.map(label => {
                return <AxisItem label={label} />
            })}
        </div>
    )
};

Axis.displayName = 'Axis';
Axis.propTypes = {
    direction: PropTypes.string.isRequired
};

export default Axis;
