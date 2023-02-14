export const hasEnoughBlocksToDeploy = ({
  isHorizontal,
  shipLength,
  rowIndex,
  columnIndex
}) => {
  return isHorizontal
    ? shipLength + rowIndex > 10
      ? false
      : true
    : shipLength + columnIndex > 10
    ? false
    : true;
};
