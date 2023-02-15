import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

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
  getRandomOcupiableBlock,
  generateRandomRowAndColumnIndex,
  getShipNameByCoordinates,
  isArraysEqual
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

  useEffect(() => {
    if (hasGameStarted && currentPlayer === CURRENT_PLAYER.computer) {
      attackOnPlayerBoardByComputer();
    }
  }, [hasGameStarted, currentPlayer]);

  useEffect(() => {
    const checkForWinner = (ships, player) => {
      const { isAllSunk, winner } = getWinner(ships, player);
      if (isAllSunk) {
        Swal.fire(`Winner is ${winner}`).then(() => resetGame());
      }
    };

    if (hasGameStarted) {
      checkForWinner(computerDeployedShips, CURRENT_PLAYER.computer);
      checkForWinner(playerDeployedShips, CURRENT_PLAYER.player);
    }
  }, [hasGameStarted, computerDeployedShips, playerDeployedShips]);

  const getWinner = (deployedShips, boardOwner) => {
    let winner = "";
    let isAllSunk = false;
    if (deployedShips && deployedShips.length > 0) {
      let winnerLength = 0;
      deployedShips.forEach((ship) => {
        if (ship.isShipSunk) {
          winnerLength++;
        }
      });

      if (winnerLength === 4) {
        isAllSunk = true;
        if (boardOwner === CURRENT_PLAYER.player) {
          winner = "Computer";
        } else {
          winner = "Player";
        }
      }
    }

    return { isAllSunk, winner };
  };
  const resetGame = () => {
    setSelectedShipToPlace(null);
    setCurrentPlayer(CURRENT_PLAYER.player);
    setHasGameStarted(false);
    setPlayerAvailableShips(SHIPS);
    setComputerAvailableShips(SHIPS);
    setPlayersSelectedAxis(AXIS.horizontal);
    setPlayerDeployedShips([]);
    setComputerDeployedShips([]);
  };

  const handleSelectShipToPlace = (ship) => {
    setSelectedShipToPlace(ship);
  };

  const onSelectAxis = (axis) => {
    setPlayersSelectedAxis(axis);
    setSelectedShipToPlace(null);
  };

  const attackOnPlayerBoardByComputer = () => {
    const { rowIndex, columnIndex } = generateRandomRowAndColumnIndex();
    const { shipName } = isPlaceTakenByOtherShip(
      playerAvailableShips,
      `${rowIndex}${columnIndex}`
    );
    handleMissileAttackOnBoard(rowIndex, columnIndex, shipName);
  };

  const onClickBoradSquare = ({ rowIndex, columnIndex, clickedShip }) => {
    if (hasGameStarted) {
      if (currentPlayer === CURRENT_PLAYER.player) {
        handleMissileAttackOnBoard(rowIndex, columnIndex, clickedShip);
      }

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
          Swal.fire("Block already taken!!");
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
        Swal.fire("Can not place ship here!!");
      }
    } else {
      Swal.fire("Please select your ship first!!");
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
    const targetBoardShips =
      currentPlayer === CURRENT_PLAYER.player
        ? computerDeployedShips
        : playerDeployedShips;
    let targetShipName = clickedShip;

    if (currentPlayer === CURRENT_PLAYER.computer) {
      // check if any ship available
      targetShipName = getShipNameByCoordinates(
        playerDeployedShips,
        cordinationXY
      );
    }
    if (targetShipName !== "") {
      newDeployedArr = targetBoardShips.map((ship) => {
        if (ship.shipName === targetShipName) {
          if (ship.attackedBlocks.length > 0) {
            if (ship.attackedBlocks.includes(cordinationXY)) {
              return;
            }
            const newAttackedBlocks = [...ship.attackedBlocks, cordinationXY];
            return {
              ...ship,
              attackedBlocks: newAttackedBlocks,
              isShipSunk: isArraysEqual(newAttackedBlocks, ship.occupiedBlocks)
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
        ...targetBoardShips,
        { shipName: "miss", attackedBlocks: [`${rowIndex}${columnIndex}`] }
      ];
    }

    if (currentPlayer === CURRENT_PLAYER.player) {
      setComputerDeployedShips(newDeployedArr);
    } else {
      setPlayerDeployedShips(newDeployedArr);
    }

    setTimeout(() => {
      setCurrentPlayer(
        currentPlayer === CURRENT_PLAYER.player
          ? CURRENT_PLAYER.computer
          : CURRENT_PLAYER.player
      );
    }, [200]);
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
