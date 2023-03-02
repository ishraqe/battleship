import { AXIS } from "../../utils/DB";

const Inventory = ({
  title,
  playerAvailableShips,
  handleSelectShipToPlace,
  selectedShipToPlace,
  playersSelectedAxis,
  onSelectAxis
}) => {
  return (
    <div className="battleship__inventory">
      <div className="inventory__title">{title}</div>
      <div className="inventory__content">
        <div className="intevtory__axis">
          <button
            className={
              playersSelectedAxis === AXIS.horizontal ? "selected" : ""
            }
            onClick={() => onSelectAxis(AXIS.horizontal)}
          >
            Horizontal
          </button>
          <button
            className={playersSelectedAxis === AXIS.vertical ? "selected" : ""}
            onClick={() => onSelectAxis(AXIS.vertical)}
          >
            Vertical
          </button>
        </div>

        {playerAvailableShips.map((ship) => {
          return (
            <div
              key={ship.name}
              id={ship.name}
              className={`inventory__item ${
                selectedShipToPlace && selectedShipToPlace.name === ship.name
                  ? "selected"
                  : ""
              }
               `}
              onClick={() => handleSelectShipToPlace(ship)}
            >
              <span className="inventory__item--name"> {ship.name} </span>
              <div className="inventory__item--container--smallbox">
                {Array(ship.shipLength)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="inventory__item--smallbox"></div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
