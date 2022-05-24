import React from 'react';
import ReactDOM from 'react-dom';
import Battleship from "./Components/Battleship";

const startApp = () => {
    let appElement = document.createElement('div');
    appElement.setAttribute('id', 'battleship');
    document.body.appendChild(appElement);

    ReactDOM.render(<Battleship />, appElement);
};

startApp();
