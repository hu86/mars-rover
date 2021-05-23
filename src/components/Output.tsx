import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useSimulatorProvider } from "../contexts/SimulatorContext";

const useStyles = makeStyles(() => ({
  paper: {
    width: "100%",
  },
  textField: {
    width: "100%",
  },
}));

const Output = (): JSX.Element => {
  const classes = useStyles();
  const { state } = useSimulatorProvider();
  const { outputString, error } = state;
  return (
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
  );
};

export default Output;
