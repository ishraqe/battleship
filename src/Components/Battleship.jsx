import React, { useEffect, useState } from "react";

import Axis from "./Axis";
import Board from "./Board";
import Inventory from "./Inventory";
import TitleBar from "./TitleBar";
import Summary from "./Summary";

import "./Battleship.css";
import { SHIPS, AXIS, CURRENT_PLAYER } from "../utils/DB";
import {
  hasEnoughBlocksToDeploy,
  getOccupiableBlocks,
  isPlaceTakenByOtherShip,
  getRandomOcupiableBlock
} from "../helpers/helper";

const Battleship = () => {
  // comon states
  const [selectedShipToPlace, setSelectedShipToPlace] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(CURRENT_PLAYER.player);
  const [hasGameStarted, setHasGameStarted] = useState(false);

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
  // {
  //   "destroyer": {
  //     boardOwner: ;
  //     attckedIndexes : []
  //   },
  //   "carrier": {

  //   },
  //   "miss": {
  //     attackedBlocks: [72382734237428472834]
  //   }
  // }

  useEffect(() => {
    if (playerAvailableShips.length === 0) {
      setCurrentPlayer(CURRENT_PLAYER.computer);
    }
  }, [playerAvailableShips]);

  const handleSelectShipToPlace = (ship) => {
    setSelectedShipToPlace(ship);
  };

  const onSelectAxis = (axis) => {
    setPlayersSelectedAxis(axis);
    setSelectedShipToPlace(null);
  };

  const onClickBoradSquare = ({ rowIndex, columnIndex, clickedShip }) => {
    if (hasGameStarted) {
      handleMissileAttackOnBoard(rowIndex, columnIndex, clickedShip);
      return;
    }

    if (selectedShipToPlace) {
      const isHorizontal = playersSelectedAxis === AXIS.horizontal;

      if (
        hasEnoughBlocksToDeploy(
          isHorizontal,
          selectedShipToPlace.shipLength,
          rowIndex,
          columnIndex
        )
      ) {
        const occupiedBlocks = getOccupiableBlocks(
          isHorizontal,
          rowIndex,
          columnIndex,
          selectedShipToPlace.shipLength
        );

        if (
          isPlaceTakenByOtherShip(playerDeployedShips, occupiedBlocks)
            .isPlaceTaken
        ) {
          alert("Block already taken!!");
          return;
        }
        const deployableShipObj = {
          shipName: selectedShipToPlace.name,
          shipLength: selectedShipToPlace.shipLength,
          occupiedBlocks,
          isHorizontal,
          currentPlayer,
          attackedBlocks: [],
          isShipSunk: false
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
    deployShipsForComputer();
  };

  // randomly deploy ships on the board
  const deployShipsForComputer = () => {
    let tempAvShip = computerAvailableShips;
    let tempDeployedArr = [];
    while (tempAvShip?.length > 0) {
      const isHorizontal = Math.random() < 0.5 ? true : false; // ?

      let block = getRandomOcupiableBlock(tempAvShip[0], isHorizontal);
      if (isPlaceTakenByOtherShip(tempDeployedArr, block).isPlaceTaken) {
        block = getRandomOcupiableBlock(tempAvShip[0], isHorizontal);
      } else {
        const deployableShipObj = {
          shipName: tempAvShip[0].name,
          shipLength: tempAvShip[0].shipLength,
          occupiedBlocks: block,
          isHorizontal,
          currentPlayer,
          attackedBlocks: [],
          isShipSunk: false
        };
        tempDeployedArr = [...tempDeployedArr, deployableShipObj];
        tempAvShip.shift();
      }
    }

    if (tempDeployedArr.length === 4) {
      setComputerAvailableShips([]);
      setComputerDeployedShips(tempDeployedArr);
    }
  };

  const handleMissileAttackOnBoard = (rowIndex, columnIndex, clickedShip) => {
    const cordinationXY = `${rowIndex}${columnIndex}`;
    let newDeployedArr = [];
    if (clickedShip !== "") {
      newDeployedArr = computerDeployedShips.map((ship) => {
        if (ship.shipName === clickedShip) {
          if (ship.attackedBlocks.length > 0) {
            if (ship.attackedBlocks.includes(cordinationXY)) {
              return;
            }
            const attackedBlocks = [...ship.attackedBlocks, cordinationXY];
            return {
              ...ship,
              attackedBlocks,
              isShipSunk:
                attackedBlocks.sort((a, b) => a - b).join() ===
                ship.occupiedBlocks.sort((a, b) => a - b).join()
            };
          } else {
            return {
              ...ship,
              attackedBlocks: [`${rowIndex}${columnIndex}`],
              isShipSunk: false
            };
          }
        } else {
          return ship;
        }
      });
    } else {
      newDeployedArr = [
        ...computerDeployedShips,
        { shipName: "miss", attackedBlocks: [`${rowIndex}${columnIndex}`] }
      ];
    }

    setComputerDeployedShips(newDeployedArr);
  };

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
                hasGameStarted={hasGameStarted}
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
                  hasGameStarted={hasGameStarted}
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
