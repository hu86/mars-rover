import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { SimulatorProvider } from "./contexts/SimulatorContext";
import Simulator from "./components/Simulator";

import theme from "./muiTheme";
import "./App.css";

function App(): JSX.Element {
  return (
    <div className="App" role="main">
      <ThemeProvider theme={theme}>
        <SimulatorProvider>
          <Simulator />
        </SimulatorProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
