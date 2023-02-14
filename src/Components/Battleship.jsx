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
  const [playersSelectedAxis, setPlayersSelectedAxis] = useState(
    AXIS.horizontal
  );

  const [currentPlayer, setCurrentPlayer] = useState(CURRENT_PLAYER.player);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const [playerDeployedShips, setPlayerDeployedShips] = useState([]);
  const [computerDeployedShips, setComputerDeployedShips] = useState([]);

  const handleSelectShipToPlace = (ship) => {
    setSelectedShipToPlace(ship);
  };

  const onSelectAxis = (axis) => {
    setPlayersSelectedAxis(axis);
    setSelectedShipToPlace(null);
  };

  const onClickBoradSquare = (square) => {
    if (selectedShipToPlace) {
      const canDeployShip =
        playersSelectedAxis === AXIS.horizontal
          ? selectedShipToPlace.shipLength + square.x > 10
            ? false
            : true
          : selectedShipToPlace.shipLength + square.y > 10
          ? false
          : true;

      if (canDeployShip) {
        const isHorizontal = playersSelectedAxis === AXIS.horizontal;
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

  // randomly deploy ships on the board
  const deployShipsForComputer = () => {
    // setComputerDeployedShips()
  };

  return (
    <div className="battleship__stage">
      <TitleBar />
      <Summary
        hasGameStarted={hasGameStarted}
        availableShips={availableShips}
        handleGameStart={handleGameStart}
        currentPlayer={currentPlayer}
      />

      <div className="battleship__content">
        <div className="battleship__content--board">
          <div className="battleship__content--board--wrapper">
            <h1>Player Board</h1>

            <div className="battleship__content--board--container">
              <Axis direction="row" />
              <Axis direction="column" />
              <Board
                selectedShipToPlace={selectedShipToPlace}
                onClickBoradSquare={onClickBoradSquare}
                playerDeployedShips={playerDeployedShips}
                boardOwner={CURRENT_PLAYER.player}
              />
            </div>
          </div>
        </div>

        <div className="battleship__content--board">
          {!hasGameStarted ? (
            <Inventory
              title="Inventory"
              availableShips={availableShips}
              handleSelectShipToPlace={handleSelectShipToPlace}
              selectedShipToPlace={selectedShipToPlace}
              playersSelectedAxis={playersSelectedAxis}
              onSelectAxis={onSelectAxis}
            />
          ) : (
            <div className="battleship__content--board--wrapper">
              <h1>Computer Board</h1>

              <div className="battleship__content--board--container">
                <Axis direction="row" />
                <Axis direction="column" />
                <Board
                  selectedShipToPlace={selectedShipToPlace}
                  onClickBoradSquare={onClickBoradSquare}
                  playerDeployedShips={playerDeployedShips}
                  boardOwner={CURRENT_PLAYER.computer}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Battleship.displayName = "Battleship";

export default Battleship;
