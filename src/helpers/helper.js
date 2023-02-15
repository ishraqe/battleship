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
  if (deployedShips && deployedShips.length > 0) {
    deployedShips.forEach((ship) => {
      ship.occupiedBlocks.forEach((block) => {
        if (occupiedBlocks.includes(block)) {
          isPlaceTaken = true;
          return;
        }
      });
    });
  }

  return isPlaceTaken;
};

export const getRandomOcupiableBlock = (computerShips, isHorizontal) => {
  const columnIndex = Math.floor(Math.random() * BOARD_ARR.length);
  const rowIndex = Math.floor(Math.random() * BOARD_ARR[columnIndex].length);

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
