import PropTypes from "prop-types";
import React, { useState } from "react";

import Axis from "./Axis";
import Board from "./Board";
import Inventory from "./Inventory";
import TitleBar from "./TitleBar";
import "./Battleship.css";
import { SHIPS, AXIS } from "../utils/DB";

const Battleship = () => {
  const [availableShips, setAvailableShips] = useState(SHIPS);
  const [selectedShipToPlace, setSelectedShipToPlace] = useState(null);
  const [selectedAxis, setSelectedAxis] = useState(AXIS.horizontal);

  const [playerDeployedShips, setPlayerDeployedShips] = useState([]);

  const handleSelectShipToPlace = (ship) => {
    setSelectedShipToPlace(ship);
  };

  const onSelectAxis = (axis) => {
    setSelectedAxis(axis);
  };

  const onClickBoradSquare = (square) => {
    if (selectedShipToPlace) {
      const canDeployShip =
        selectedAxis === AXIS.horizontal
          ? selectedShipToPlace.shipLength + square.x > 10
            ? false
            : true
          : selectedShipToPlace.shipLength + square.y > 10
          ? false
          : true;

      if (canDeployShip) {
        const deployableShipObj = {
          shipName: selectedShipToPlace.name,
          length: selectedShipToPlace.shipLength,
          axis: {
            x: 0,
            y: 0
          }
        };
        setPlayerDeployedShips([...playerDeployedShips, deployableShipObj]);
      } else {
        alert("Can not place ship here!!");
      }
      console.log(square);
    } else {
      alert("Please select your ship first!!");
    }
  };

  console.log("selec", selectedShipToPlace);
  return (
    <div className="battleship__stage">
      <TitleBar />
      <div className="battleship__content">
        <Axis direction="row" />
        <Axis direction="column" />
        <Board
          selectedShipToPlace={selectedShipToPlace}
          onClickBoradSquare={onClickBoradSquare}
          playerDeployedShips={playerDeployedShips}
        />
        <Inventory
          title="Inventory"
          availableShips={availableShips}
          handleSelectShipToPlace={handleSelectShipToPlace}
          selectedShipToPlace={selectedShipToPlace}
          selectedAxis={selectedAxis}
          onSelectAxis={onSelectAxis}
        />
      </div>
    </div>
  );
};

Battleship.displayName = "Battleship";

export default Battleship;
