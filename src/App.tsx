import React, { useState, useEffect } from "react";
import { TextareaAutosize, Typography } from "@material-ui/core";
import "./App.css";
import ControlCentre from "./lib/controlCentre";
import { parseInput, parseOutput } from "./lib/parser";

function App(): JSX.Element {
  const [inputString, setInputString] = useState(
    "5 5\r\n1 2 N\r\nLMLMLMLMM\r\n3 3 E\r\nMMRMMRMRRM"
  );
  const [outputString, setOutputString] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
    try {
      const input = parseInput(inputString);
      const controlCentre = new ControlCentre(input);
      controlCentre.moveRovers();
      const output = controlCentre.getOutput();
      setOutputString(parseOutput(output));
    } catch (error) {
      setError(error);
    }
  }, [inputString]);
  return (
    <div className="App">
      <TextareaAutosize
        rowsMin={5}
        rowsMax={10}
        aria-label="input string"
        placeholder="Input string"
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
      />
      {error ? (
        <Typography variant="body1" gutterBottom>
          {error}
        </Typography>
      ) : (
        <TextareaAutosize value={outputString} readOnly />
      )}
    </div>
  );
}

export default App;
