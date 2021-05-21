import ControlCentre from "./controlCentre";
import { Input } from "./typesAndConsts";

test("move rovers to positions with commands", () => {
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
  expect(controlCentre.rovers[0].x).toBe(1);
  expect(controlCentre.rovers[0].y).toBe(3);
  expect(controlCentre.rovers[0].direction).toBe("N");
  expect(controlCentre.rovers[1].x).toBe(5);
  expect(controlCentre.rovers[1].y).toBe(1);
  expect(controlCentre.rovers[1].direction).toBe("E");
  const reports = controlCentre.reportRovers();
  expect(reports).toBe(`1 3 N\r\n5 1 E`);
});

test("can move rover to a position", () => {
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
    ],
  };
  const controlCentre = new ControlCentre(input);
  const canMove = controlCentre.canMoveRoverTo({ x: 1, y: 3 });
  expect(canMove).toBe(true);
});

test("can not move rover to a position - edge of plateau", () => {
  const input: Input = {
    plateau: {
      x: 5,
      y: 5,
    },
    rovers: [
      {
        x: 1,
        y: 5,
        direction: "N",
        commands: "LMLMLMLMM",
      },
    ],
  };
  const controlCentre = new ControlCentre(input);
  const canMove = controlCentre.canMoveRoverTo({ x: 1, y: 6 });
  expect(canMove).toBe(false);
});

test("can not move rover to a position - occupied by another rover", () => {
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
        x: 1,
        y: 3,
        direction: "N",
        commands: "LMLMLMLMM",
      },
    ],
  };
  const controlCentre = new ControlCentre(input);
  const canMove = controlCentre.canMoveRoverTo({ x: 1, y: 3 });
  expect(canMove).toBe(false);
});