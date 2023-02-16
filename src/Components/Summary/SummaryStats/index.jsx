import React, { useEffect, useState } from "react";
import "./SummaryStats.css";
import { CURRENT_PLAYER } from "../../../utils/DB";

const index = ({ playerDeployedShips, computerDeployedShips }) => {
  const [playerStats, setPlayerStats] = useState(null);
  const [computerStats, setComputerStats] = useState(null);

  useEffect(() => {
    const tempPlayerStats = setShipStats(playerDeployedShips);
    setPlayerStats(tempPlayerStats);

    const tempComputerStats = setShipStats(computerDeployedShips);

    setComputerStats(tempComputerStats);
  }, [playerDeployedShips, computerDeployedShips]);

  const setShipStats = (PlayerShips) => {
    let totalDeployedShips = 0;
    let totalShipAttacked = 0;
    let totalShipSunked = 0;

    PlayerShips &&
      PlayerShips.forEach((ship) => {
        if (ship.shipName !== "miss") {
          totalDeployedShips++;
          totalShipAttacked = ship.attackedBlocks.length;
          if (ship.isShipSunk) {
            totalShipSunked++;
          }
        }
      });
    return {
      totalDeployedShips,
      totalShipAttacked,
      totalShipSunked
    };
  };
  console.log({ computerStats });
  const statsInfo = (stats) => {
    return (
      <ul className="game__stats">
        <li>
          <span>Ships Deployed : </span>{" "}
          <span>{stats ? stats.totalDeployedShips : 0} </span>
        </li>
        <li>
          <span>Ships Attacked : </span>{" "}
          <span>{stats ? stats.totalShipAttacked : 0} </span>
        </li>
        <li>
          <span>Ships Sunked: </span>{" "}
          <span>{stats ? stats.totalShipSunked : 0} </span>
        </li>
      </ul>
    );
  };

  return (
    <div className="summary__game--status">
      <div className="player__info">
        <span>Player </span>
        {statsInfo(playerStats)}
      </div>
      <div className="player__info">
        <span>Computer </span>
        {statsInfo(computerStats)}
      </div>
    </div>
  );
};

export default index;
