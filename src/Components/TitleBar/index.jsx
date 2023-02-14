import React from "react";
import "./TitleBar.css";

const TitleBar = () => {
  return (
    <div className="battleship__titlebar">
      <img src="../assets/images/logo.svg" width="100px" />
    </div>
  );
};

TitleBar.displayName = "TitleBar";

export default TitleBar;
