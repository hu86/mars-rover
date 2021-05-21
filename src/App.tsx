import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Input } from "./lib/types-consts";
import ControlCentre from "./lib/control-centre";

function App() {
  const input: Input = {
    plateau: {
      x: 5,
      y: 5,
    },
    rovers: [
      {
        x: 1,
        y: 2,
        direction: "N",
        commands: "LMLMLMLMM",
      },
      {
        x: 3,
        y: 3,
        direction: "E",
        commands: "MMRMMRMRRM",
      },
    ],
  };

  const controlCentre = new ControlCentre(input);
  controlCentre.moveRovers();
  console.log(controlCentre.reportRovers());

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
