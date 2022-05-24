import PropTypes from 'prop-types';
import React from 'react';

import './AxisItem.css';

const AxisItem = ({ label }) => {
    return (
        <div className="axis__label">{label}</div>
    )
}

AxisItem.displayName = 'AxisItem';
AxisItem.propTypes = {
    label: PropTypes.string
};

export default AxisItem;
