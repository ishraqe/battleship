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

export const checkIfTargetedBlockIsAlreadyAttacked = (
  deployedShipBlocks,
  shipName,
  selectedIndex
) => {
  let result = false;

  if (
    deployedShipBlocks &&
    deployedShipBlocks?.length > 0 &&
    deployedShipBlocks?.attackedBlocks &&
    deployedShipBlocks?.attackedBlocks.legnth > 0
  ) {
    deployedShipBlocks.forEach((block) => {});
  }
  return result;
};
