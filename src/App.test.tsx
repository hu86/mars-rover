import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import App from "./App";

expect.extend(toHaveNoViolations);

test("should have no axe violations", async () => {
  const { container } = render(<App />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("display of heading, input control and output control", async () => {
  act(() => {
    render(<App />);
  });
  expect(screen.getByRole("heading")).toHaveTextContent(
    "Mars Rover Squad Simulator"
  );
  const inputEl = screen.getByLabelText("Input");
  const outputEl = screen.getByLabelText("Output");
  expect(inputEl).toBeVisible();
  expect(inputEl).toHaveValue("");
  expect(outputEl).toBeVisible();
  expect(outputEl).toHaveValue("");
  expect(outputEl).toBeDisabled();
});

test("take input string and display the output string", async () => {
  act(() => {
    render(<App />);
  });
  const inputString = "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";
  const outputString = "1 3 N\n5 1 E";
  expect(screen.getByLabelText("Input")).toHaveValue("");
  expect(screen.getByLabelText("Output")).toHaveValue("");
  userEvent.type(screen.getByLabelText("Input"), inputString);
  expect(screen.getByLabelText("Input")).toHaveValue(inputString);
  expect(screen.getByLabelText("Output")).toHaveValue(outputString);
});

test("take invalid input string and display the parsing error", async () => {
  act(() => {
    render(<App />);
  });
  const inputString = "5 5\n1 2 N\nX\n3 3 E\nMMRMMRMRRM";
  expect(screen.getByLabelText("Input")).toHaveValue("");
  expect(screen.getByLabelText("Output")).toHaveValue("");
  userEvent.type(screen.getByLabelText("Input"), inputString);
  expect(screen.getByLabelText("Input")).toHaveValue(inputString);
  expect(screen.queryByLabelText("Output")).toBeNull();
  expect(screen.getByRole("alert")).toHaveTextContent(
    /^ErrorInvalid input string/g
  );
});

test("take invalid input string and display the simulation error", async () => {
  act(() => {
    render(<App />);
  });
  const inputString = "3 3\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";
  expect(screen.getByLabelText("Input")).toHaveValue("");
  expect(screen.getByLabelText("Output")).toHaveValue("");
  userEvent.type(screen.getByLabelText("Input"), inputString);
  expect(screen.getByLabelText("Input")).toHaveValue(inputString);
  expect(screen.queryByLabelText("Output")).toBeNull();
  expect(screen.getByRole("alert")).toHaveTextContent(
    /^ErrorSimulation terminated/g
  );
});
