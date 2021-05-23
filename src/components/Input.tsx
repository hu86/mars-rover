import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField } from "@material-ui/core";
import {
  useSimulatorProvider,
  runSimulation,
} from "../contexts/SimulatorContext";

const useStyles = makeStyles(() => ({
  paper: {
    width: "100%",
  },
  textField: {
    width: "100%",
  },
}));

const Input = (): JSX.Element => {
  const classes = useStyles();
  const { state, dispatch } = useSimulatorProvider();
  const { inputString } = state;
  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => runSimulation(dispatch, e.target.value);
  return (
    <Paper className={classes.paper} elevation={0}>
      <TextField
        className={classes.textField}
        id="input-text-field"
        label="Input"
        multiline
        rows={11}
        variant="outlined"
        value={inputString}
        onChange={handleInputChange}
        placeholder="Add your input string here"
        spellCheck={false}
      />
    </Paper>
  );
};

export default Input;
