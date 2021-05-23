import React, { createContext, useReducer } from "react";
import ControlCentre from "../lib/controlCentre";
import { parseInput } from "../lib/parser";
import { formatOutput } from "../lib/formatter";

export interface SimulatorState {
  inputString: string;
  outputString: string;
  error: string;
}

export enum SimulatorContextActionType {
  SET_INPUT_STRING = "SET_INPUT_STRING",
  SET_OUTPUT_STRING = "SET_OUTPUT_STRING",
  SET_ERROR = "SET_ERROR",
}

export interface SetInputString {
  type: SimulatorContextActionType.SET_INPUT_STRING;
  string: string;
}

export interface SetOutputString {
  type: SimulatorContextActionType.SET_OUTPUT_STRING;
  string: string;
}

export interface SetError {
  type: SimulatorContextActionType.SET_ERROR;
  string: string;
}

export type SimulatorAction = SetInputString | SetOutputString | SetError;

export type SimulatorDispatch = (action: SimulatorAction) => void;

export interface SimulatorContext {
  state: SimulatorState;
  dispatch: SimulatorDispatch;
}

const SimulatorContext = createContext<SimulatorContext | undefined>(undefined);

const initialState: SimulatorState = {
  inputString: "",
  outputString: "",
  error: "",
};

const simulatorReducer: React.Reducer<SimulatorState, SimulatorAction> = (
  state,
  action
): SimulatorState => {
  switch (action.type) {
    case SimulatorContextActionType.SET_INPUT_STRING:
      return { ...state, inputString: action.string };
    case SimulatorContextActionType.SET_OUTPUT_STRING:
      return { ...state, outputString: action.string };
    case SimulatorContextActionType.SET_ERROR:
      return { ...state, error: action.string };
    default:
      return state;
  }
};

export const SimulatorProvider = (prop: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}): JSX.Element => {
  const [state, dispatch] = useReducer(simulatorReducer, initialState);
  const value = { state, dispatch };
  return (
    <SimulatorContext.Provider value={value}>
      {prop.children}
    </SimulatorContext.Provider>
  );
};

export const useSimulatorProvider = (): SimulatorContext => {
  const context = React.useContext(SimulatorContext);
  if (context === undefined) {
    throw new Error(
      "useSimulatorProvider must be used within a SimulatorProvider"
    );
  }
  return context;
};

export const runSimulation = (
  dispatch: SimulatorDispatch,
  inputString: string
): void => {
  dispatch({
    type: SimulatorContextActionType.SET_INPUT_STRING,
    string: inputString,
  });
  dispatch({ type: SimulatorContextActionType.SET_OUTPUT_STRING, string: "" });
  dispatch({ type: SimulatorContextActionType.SET_ERROR, string: "" });
  if (inputString) {
    try {
      const input = parseInput(inputString);
      const controlCentre = new ControlCentre(input);
      controlCentre.moveRovers();
      const output = controlCentre.getOutput();
      dispatch({
        type: SimulatorContextActionType.SET_OUTPUT_STRING,
        string: formatOutput(output),
      });
    } catch (error) {
      dispatch({ type: SimulatorContextActionType.SET_ERROR, string: error });
    }
  }
};
