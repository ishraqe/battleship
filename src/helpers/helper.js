import { BOARD_ARR } from "../utils/DB";

export const hasEnoughBlocksToDeploy = (
  isHorizontal,
  shipLength,
  rowIndex,
  columnIndex
) => {
  return isHorizontal
    ? shipLength + rowIndex > 10
      ? false
      : true
    : shipLength + columnIndex > 10
    ? false
    : true;
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

export const getOccupiableBlocks = (
  isHorizontal,
  rowIndex,
  columnIndex,
  shipLength
) => {
  let ocupieableBlocks = [];

  Array(shipLength)
    .fill(0)
    .forEach((_, arrIndex) => {
      ocupieableBlocks.push(
        getOcuiableDataBasedOnAxis(
          isHorizontal,
          rowIndex,
          columnIndex,
          arrIndex
        )
      );
    });

  return ocupieableBlocks;
};

export const isPlaceTakenByOtherShip = (deployedShips, occupiedBlocks) => {
  let isPlaceTaken = false;
  let shipName = "";

  if (deployedShips && deployedShips.length > 0) {
    deployedShips.forEach((ship) => {
      ship.occupiedBlocks.forEach((block) => {
        if (occupiedBlocks.includes(block)) {
          shipName = ship.shipName;
          isPlaceTaken = true;
          return;
        }
      });
    });
  }

  return { isPlaceTaken, shipName };
};

export const generateRandomRowAndColumnIndex = () => {
  const columnIndex = Math.floor(Math.random() * BOARD_ARR.length);
  const rowIndex = Math.floor(Math.random() * BOARD_ARR[columnIndex].length);

  return {
    rowIndex,
    columnIndex
  };
};

export const getRandomOcupiableBlock = (computerShips, isHorizontal) => {
  const { rowIndex, columnIndex } = generateRandomRowAndColumnIndex();

  if (
    hasEnoughBlocksToDeploy(
      isHorizontal,
      computerShips.shipLength,
      rowIndex,
      columnIndex
    )
  ) {
    return getOccupiableBlocks(
      isHorizontal,
      rowIndex,
      columnIndex,
      computerShips.shipLength
    );
  } else {
    return getRandomOcupiableBlock(computerShips, isHorizontal);
  }
};

export const checkIfAttackBlockHasTheSameShipAndIndex = (
  shipName,
  selectedIndex,
  deployedShipArr
) => {
  let result = false;

  if (
    deployedShipArr &&
    deployedShipArr.length > 0 &&
    deployedShipArr.occupiedBlocks &&
    deployedShipArr.occupiedBlocks.length > 0
  ) {
    deployedShipArr.occupiedBlocks.forEach((block) => {
      if (
        block.shipName === shipName &&
        block.attackedIndex === selectedIndex
      ) {
        result = true;
      }
    });
  }

  return result;
};

export const getShipNameByCoordinates = (deployedShips, coordinates) => {
  let shipName = "";
  deployedShips.forEach((ship) => {
    console.log({ ship });
    if (ship.shipName !== "miss") {
      ship.occupiedBlocks.forEach((block) => {
        if (block === coordinates) {
          shipName = ship.shipName;
        }
      });
    }
  });

  return shipName;
};

export const isArraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.sort().toString() === arr2.sort().toString();
};
