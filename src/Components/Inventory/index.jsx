import PropTypes from "prop-types";
import React from "react";
import "./Inventory.css";
import { AXIS } from "../../utils/DB";

const Inventory = ({
  title,
  availableShips,
  handleSelectShipToPlace,
  selectedShipToPlace,
  selectedAxis,
  onSelectAxis
}) => {
  return (
    <div className="battleship__inventory">
      <div className="inventory__title">{title}</div>
      <div className="inventory__content">
        <div className="intevtory__axis">
          <button
            className={selectedAxis === AXIS.horizontal ? "selected" : ""}
            onClick={() => onSelectAxis(AXIS.horizontal)}
          >
            Horizontal
          </button>
          <button
            className={selectedAxis === AXIS.vertical ? "selected" : ""}
            onClick={() => onSelectAxis(AXIS.vertical)}
          >
            Vertical
          </button>
        </div>

        {availableShips.map((ship) => {
          return (
            <div
              key={ship.name}
              id={ship.name}
              className={`inventory__item ${
                selectedShipToPlace && selectedShipToPlace.name === ship.name
                  ? "selected"
                  : ""
              }
               `}
              onClick={() => handleSelectShipToPlace(ship)}
            >
              <span className="inventory__item--name"> {ship.name} </span>
              <div className="inventory__item--container--smallbox">
                {Array(ship.shipLength)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="inventory__item--smallbox"></div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Inventory.displayName = "Inventory";
Inventory.propTypes = {
  title: PropTypes.string.isRequired,
  availableShips: PropTypes.arrayOf(Object),
  handleSelectShipToPlace: PropTypes.func,
  selectedShipToPlace: PropTypes.object,
  selectedAxis: PropTypes.string,
  onSelectAxis: PropTypes.func
};

export default Inventory;
