import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import "./App.css";
import ControlCentre from "./lib/controlCentre";
import { parseInput } from "./lib/parser";
import { formatOutput } from "./lib/formatter";
import theme from "./muiTheme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  header: {
    textAlign: "center",
  },
  paper: {
    width: "100%",
  },
  textField: {
    width: "100%",
  },
}));

function App(): JSX.Element {
  const classes = useStyles();
  const [inputString, setInputString] = useState(
    // "5 5\r\n1 2 N\r\nLMLMLMLMM\r\n3 3 E\r\nMMRMMRMRRM"
    ""
  );
  const [outputString, setOutputString] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
    setOutputString("");
    if (inputString) {
      try {
        const input = parseInput(inputString);
        const controlCentre = new ControlCentre(input);
        controlCentre.moveRovers();
        const output = controlCentre.getOutput();
        setOutputString(formatOutput(output));
      } catch (error) {
        setError(error);
      }
    }
  }, [inputString]);
  return (
    <div className="App" role="main">
      <ThemeProvider theme={theme}>
        <Grid className={classes.root} container spacing={2}>
          <Grid className={classes.header} item xs={12}>
            <Typography variant="h1" gutterBottom>
              Mars Rover Squad Simulator
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={0}>
              <TextField
                className={classes.textField}
                id="input-text-field"
                label="Input"
                multiline
                rows={11}
                variant="outlined"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                placeholder="Add your input string here"
                spellCheck={false}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={0}>
              {error ? (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              ) : (
                <TextField
                  className={classes.textField}
                  id="output-text-field"
                  label="Output"
                  multiline
                  rows={11}
                  variant="outlined"
                  value={outputString}
                  disabled
                  spellCheck={false}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
