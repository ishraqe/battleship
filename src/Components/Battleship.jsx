import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import Axis from "./Axis";
import Board from "./Board";
import Inventory from "./Inventory";
import TitleBar from "./TitleBar";
import Summary from "./Summary";

import "./Battleship.css";
import { SHIPS, AXIS, CURRENT_PLAYER, BOARD_ARR } from "../utils/DB";
import { hasEnoughBlocksToDeploy } from "../helpers/helper";

const Battleship = () => {
  // comon states
  const [selectedShipToPlace, setSelectedShipToPlace] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(CURRENT_PLAYER.player);
  const [hasGameStarted, setHasGameStarted] = useState(true);

  // player states
  const [playerAvailableShips, setPlayerAvailableShips] = useState(SHIPS);
  const [playersSelectedAxis, setPlayersSelectedAxis] = useState(
    AXIS.horizontal
  );
  const [playerDeployedShips, setPlayerDeployedShips] = useState([]);

  // computer states
  const [computerAvailableShips, setComputerAvailableShips] = useState(SHIPS);
  const [computerDeployedShips, setComputerDeployedShips] = useState([]);

  // based on avalilable player ships  sets current player
  useEffect(() => {
    if (playerAvailableShips.length === 0) {
      setCurrentPlayer(CURRENT_PLAYER.computer);
    }
  }, [playerAvailableShips]);

  //
  useEffect(() => {
    deployShipsForComputer();
  }, []);

  const handleSelectShipToPlace = (ship) => {
    setSelectedShipToPlace(ship);
  };

  const onSelectAxis = (axis) => {
    setPlayersSelectedAxis(axis);
    setSelectedShipToPlace(null);
  };

  const onClickBoradSquare = ({ x: rowIndex, y: columnIndex }) => {
    if (selectedShipToPlace) {
      const isHorizontal = playersSelectedAxis === AXIS.horizontal;

      if (
        hasEnoughBlocksToDeploy({
          isHorizontal,
          shipLength: selectedShipToPlace.shipLength,
          rowIndex,
          columnIndex
        })
      ) {
        let ocupiedBlocks = [];
        const shipLengthArr = Array(selectedShipToPlace.shipLength).fill(0);

        if (isHorizontal) {
          shipLengthArr.forEach((_, index) => {
            ocupiedBlocks.push(`${rowIndex + index}${columnIndex}`);
          });
        } else {
          shipLengthArr.forEach((_, index) => {
            ocupiedBlocks.push(`${rowIndex}${columnIndex + index}`);
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

        const newPlayerAvailableShips = playerAvailableShips.filter(
          (ship) => ship.name !== selectedShipToPlace.name
        );

        setPlayerAvailableShips(newPlayerAvailableShips);
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

  const getOcuiableDataBasedOnAxis = (
    isHorizontal,
    rowIndex,
    columnIndex,
    arrIndex
  ) => {
    return isHorizontal
      ? `${rowIndex + arrIndex}${columnIndex}`
      : `${rowIndex}${columnIndex + arrIndex}`;
  };

  const getRandomOcupiableBlock = (computerShips, isHorizontal) => {
    const columnIndex = Math.floor(Math.random() * BOARD_ARR.length);
    const rowIndex = Math.floor(Math.random() * BOARD_ARR[columnIndex].length);
    const length = computerShips.shipLength;

    let ocupieableBlocks = [];

    if (
      hasEnoughBlocksToDeploy({
        isHorizontal,
        shipLength: computerShips.shipLength,
        rowIndex,
        columnIndex
      })
    ) {
      Array(length)
        .fill(0)
        .forEach((_, index) => {
          ocupieableBlocks.push(
            getOcuiableDataBasedOnAxis(
              isHorizontal,
              rowIndex,
              columnIndex,
              index
            )
          );
        });
    } else {
      return getRandomOcupiableBlock(computerShips, isHorizontal);
    }

    return ocupieableBlocks;
  };

  const getRandomBlock = () => {
    let tempAvShip = computerAvailableShips;
    let tempDeployedArr = [];
    while (tempAvShip?.length > 0) {
      const isHorizontal = Math.random() < 0.5 ? true : false; // ?

      const block =
        tempAvShip &&
        tempAvShip.length > 0 &&
        getRandomOcupiableBlock(tempAvShip[0], isHorizontal);

      const deployableShipObj = {
        shipName: tempAvShip[0].name,
        shipLength: tempAvShip[0].shipLength,
        ocupiedBlocks: block,
        isHorizontal
      };
      tempDeployedArr = [...tempDeployedArr, deployableShipObj];
      tempAvShip.shift();
    }

    if (tempDeployedArr.length === 4) {
      setComputerAvailableShips([]);
      setComputerDeployedShips(tempDeployedArr);
    }
  };

  // randomly deploy ships on the board
  const deployShipsForComputer = () => {
    // setComputerDeployedShips()
    getRandomBlock();
  };

  console.log({ computerAvailableShips, computerDeployedShips });

  return (
    <div className="battleship__stage">
      <TitleBar />
      <Summary
        hasGameStarted={hasGameStarted}
        playerAvailableShips={playerAvailableShips}
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
                deployedShips={playerDeployedShips}
                boardOwner={CURRENT_PLAYER.player}
              />
            </div>
          </div>
        </div>

        <div className="battleship__content--board">
          {!hasGameStarted ? (
            <Inventory
              title="Inventory"
              playerAvailableShips={playerAvailableShips}
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
                  deployedShips={computerDeployedShips}
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
