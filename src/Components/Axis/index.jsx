import AxisItem from "./AxisItem";

const Axis = ({ direction = "row" }) => {
  const getAxisLabels = (direction) => {
    switch (direction) {
      case "row":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      case "column":
        return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      default:
    }
  };

  return (
    <div className={`battleship__axis ${direction}`}>
      {getAxisLabels(direction).map((label, index) => {
        return <AxisItem key={`axis_label_${label}`} label={label} />;
      })}
    </div>
  );
};

export default Axis;
