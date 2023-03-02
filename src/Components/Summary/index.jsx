import SummaryGameStats from "./SummaryStats";

const index = ({
  hasGameStarted,
  playerAvailableShips,
  handleGameStart,
  currentPlayer,
  playerDeployedShips,
  computerDeployedShips
}) => {
  return (
    <div className="summary">
      <div className="summary__info">
        <h3>Current Player: {currentPlayer}</h3>
      </div>
      <div className="summary__instruction">
        {!hasGameStarted ? (
          <p>
            <span>
              You need to deploy all your ships on your board and start the
              game. Then Computer will deploy his ship also.
              <br />
              Then You can attack computer block and once your attack is done
              computer will attack in any of your block.
            </span>
          </p>
        ) : (
          <SummaryGameStats
            playerDeployedShips={playerDeployedShips}
            computerDeployedShips={computerDeployedShips}
          />
        )}

        <ul className="game__stats">
          <li>
            <span className="miss"></span>{" "}
            <span className="ins">Attack missed the ship</span>
          </li>
          <li>
            <span className="hit"></span>
            <span className="ins">Attack was a hit</span>
          </li>
          <li>
            <span className="ship-sunk"></span>{" "}
            <span className="ins">Ship Sunk</span>
          </li>
        </ul>
      </div>
      {playerAvailableShips.length === 0 ? (
        <button className="summary__btn" onClick={handleGameStart}>
          {hasGameStarted ? "Restart Game" : "Start Game"}
        </button>
      ) : null}
    </div>
  );
};

export default index;
