import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Heading from "./Heading";
import Input from "./Input";
import Output from "./Output";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  header: {
    textAlign: "center",
  },
}));

const Simulator = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container spacing={2}>
      <Grid className={classes.header} item xs={12}>
        <Heading />
      </Grid>
      <Grid item xs={6}>
        <Input />
      </Grid>
      <Grid item xs={6}>
        <Output />
      </Grid>
    </Grid>
  );
};

export default Simulator;
