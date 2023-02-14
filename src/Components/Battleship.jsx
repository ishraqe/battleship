import PropTypes from "prop-types";
import React, { useState } from "react";

import Axis from "./Axis";
import Board from "./Board";
import Inventory from "./Inventory";
import TitleBar from "./TitleBar";
import Summary from "./Summary";

import "./Battleship.css";
import { SHIPS, AXIS, CURRENT_PLAYER } from "../utils/DB";

const Battleship = () => {
  const [availableShips, setAvailableShips] = useState(SHIPS);
  const [selectedShipToPlace, setSelectedShipToPlace] = useState(null);
  const [selectedAxis, setSelectedAxis] = useState(AXIS.horizontal);
  const [playerDeployedShips, setPlayerDeployedShips] = useState([]);

  const [currentPlayer, setCurrentPlayer] = useState(CURRENT_PLAYER.player);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const handleSelectShipToPlace = (ship) => {
    setSelectedShipToPlace(ship);
  };

  const onSelectAxis = (axis) => {
    setSelectedAxis(axis);
    setSelectedShipToPlace(null);
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
        const isHorizontal = selectedAxis === AXIS.horizontal;
        let ocupiedBlocks = [];
        const shipLengthArr = Array(selectedShipToPlace.shipLength).fill(0);

        if (isHorizontal) {
          shipLengthArr.forEach((_, index) => {
            ocupiedBlocks.push(`${square.x + index}${square.y}`);
          });
        } else {
          shipLengthArr.forEach((_, index) => {
            ocupiedBlocks.push(`${square.x}${square.y + index}`);
          });
        }
        let isPlaceTaken = false;

        if (playerDeployedShips && playerDeployedShips.length > 0) {
          playerDeployedShips.forEach((ship) => {
            ship.ocupiedBlocks.forEach((block) => {
              if (ocupiedBlocks.includes(block)) {
                isPlaceTaken = true;
                return;
              }
            });
          });
        }

        if (isPlaceTaken) {
          alert("Block already taken!!");

          return;
        }
        const deployableShipObj = {
          shipName: selectedShipToPlace.name,
          shipLength: selectedShipToPlace.shipLength,
          ocupiedBlocks,
          isHorizontal
        };
        setPlayerDeployedShips([...playerDeployedShips, deployableShipObj]);

        const newAvailableShips = availableShips.filter(
          (ship) => ship.name !== selectedShipToPlace.name
        );

        setAvailableShips(newAvailableShips);
        setSelectedShipToPlace(null);
      } else {
        alert("Can not place ship here!!");
      }
    } else {
      alert("Please select your ship first!!");
    }
  };

  const handleGameStart = () => {
    setHasGameStarted(true);
  };

  return (
    <div className="battleship__stage">
      <TitleBar />
      <div className="battleship__summary--container">
        <Summary
          hasGameStarted={hasGameStarted}
          availableShips={availableShips}
          handleGameStart={handleGameStart}
        />
      </div>

      <div className="battleship__content">
        <div>
          <Axis direction="row" />
          <Axis direction="column" />
          <Board
            selectedShipToPlace={selectedShipToPlace}
            onClickBoradSquare={onClickBoradSquare}
            playerDeployedShips={playerDeployedShips}
          />

          {!hasGameStarted && (
            <Inventory
              title="Inventory"
              availableShips={availableShips}
              handleSelectShipToPlace={handleSelectShipToPlace}
              selectedShipToPlace={selectedShipToPlace}
              selectedAxis={selectedAxis}
              onSelectAxis={onSelectAxis}
            />
          )}
        </div>
        {hasGameStarted && <div>Computer</div>}
      </div>
    </div>
  );
};

Battleship.displayName = "Battleship";

export default Battleship;
