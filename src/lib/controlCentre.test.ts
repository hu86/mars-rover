import ControlCentre from "./controlCentre";
import { Input, Direction } from "./typesAndConsts";

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
        direction: Direction.NORTH,
        commands: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
      },
      {
        x: 3,
        y: 3,
        direction: Direction.EAST,
        commands: ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"],
      },
    ],
  };
  const controlCentre = new ControlCentre(input);
  controlCentre.moveRovers();
  expect(controlCentre.rovers[0].status.x).toBe(1);
  expect(controlCentre.rovers[0].status.y).toBe(3);
  expect(controlCentre.rovers[0].status.direction).toBe(Direction.NORTH);
  expect(controlCentre.rovers[1].status.x).toBe(5);
  expect(controlCentre.rovers[1].status.y).toBe(1);
  expect(controlCentre.rovers[1].status.direction).toBe(Direction.EAST);
  const output = controlCentre.getOutput();
  expect(output).toEqual({
    roverStatuses: [
      {
        x: 1,
        y: 3,
        direction: Direction.NORTH,
      },
      {
        x: 5,
        y: 1,
        direction: Direction.EAST,
      },
    ],
  });
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
        direction: Direction.NORTH,
        commands: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
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
        direction: Direction.NORTH,
        commands: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
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
        direction: Direction.NORTH,
        commands: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
      },
      {
        x: 1,
        y: 3,
        direction: Direction.NORTH,
        commands: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
      },
    ],
  };
  const controlCentre = new ControlCentre(input);
  const canMove = controlCentre.canMoveRoverTo({ x: 1, y: 3 });
  expect(canMove).toBe(false);
});
