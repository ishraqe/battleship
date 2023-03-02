/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { MISS_HIT } from "../../../utils/DB";

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

    if (PlayerShips && PlayerShips.length > 0) {
      PlayerShips.forEach((ship) => {
        if (ship?.shipName !== MISS_HIT) {
          totalDeployedShips++;
          totalShipAttacked =
            ship.attackedBlocks.length > 0
              ? totalShipAttacked + 1
              : totalShipAttacked;
          if (ship.isShipSunk) {
            totalShipSunked++;
          }
        }
      });
    }

    return {
      totalDeployedShips,
      totalShipAttacked,
      totalShipSunked
    };
  };

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
