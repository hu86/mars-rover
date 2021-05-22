import Rover from "./rover";
import { Direction, Position, RoverInput } from "./typesAndConsts";

test("calculate rover's next direction", () => {
  let input: RoverInput;
  let rover: Rover;
  let newDirection: Direction;

  input = {
    x: 0,
    y: 0,
    direction: "N",
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection("L");
  expect(newDirection).toBe("W");

  input = {
    x: 0,
    y: 0,
    direction: "W",
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection("L");
  expect(newDirection).toBe("S");

  input = {
    x: 0,
    y: 0,
    direction: "S",
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection("L");
  expect(newDirection).toBe("E");

  input = {
    x: 0,
    y: 0,
    direction: "E",
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection("L");
  expect(newDirection).toBe("N");

  input = {
    x: 0,
    y: 0,
    direction: "N",
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection("R");
  expect(newDirection).toBe("E");

  input = {
    x: 0,
    y: 0,
    direction: "E",
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection("R");
  expect(newDirection).toBe("S");

  input = {
    x: 0,
    y: 0,
    direction: "S",
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection("R");
  expect(newDirection).toBe("W");

  input = {
    x: 0,
    y: 0,
    direction: "W",
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection("R");
  expect(newDirection).toBe("N");
});

test("calculate rover's next position", () => {
  let input: RoverInput;
  let rover: Rover;
  let newPos: Position;

  // Facing north
  input = {
    x: 1,
    y: 1,
    direction: "N",
    commands: [],
  };
  rover = new Rover(input);
  newPos = rover.calculateNextPosition();
  expect(newPos.x).toBe(1);
  expect(newPos.y).toBe(2);

  // Facing east
  input = {
    x: 1,
    y: 1,
    direction: "E",
    commands: [],
  };
  rover = new Rover(input);
  newPos = rover.calculateNextPosition();
  expect(newPos.x).toBe(2);
  expect(newPos.y).toBe(1);

  // Facing south
  input = {
    x: 1,
    y: 1,
    direction: "S",
    commands: [],
  };
  rover = new Rover(input);
  newPos = rover.calculateNextPosition();
  expect(newPos.x).toBe(1);
  expect(newPos.y).toBe(0);

  // Facing west
  input = {
    x: 1,
    y: 1,
    direction: "W",
    commands: [],
  };
  rover = new Rover(input);
  newPos = rover.calculateNextPosition();
  expect(newPos.x).toBe(0);
  expect(newPos.y).toBe(1);
});

test("rover is moved to a new position", () => {
  const input: RoverInput = {
    x: 1,
    y: 1,
    direction: "E",
    commands: ["M"],
  };
  const rover = new Rover(input);
  expect(rover.status).toEqual({ x: 1, y: 1, direction: "E" });
  rover.executeCommands(() => true);
  expect(rover.status).toEqual({ x: 2, y: 1, direction: "E" });
});

test("rover is not moved to a new position", () => {
  const input: RoverInput = {
    x: 0,
    y: 0,
    direction: "N",
    commands: ["L", "M"],
  };
  const rover = new Rover(input);
  expect(rover.status.x).toBe(0);
  expect(rover.status.y).toBe(0);
  expect(() => rover.executeCommands(() => false)).toThrow(
    /Simulation terminated/g
  );
  expect(rover.status.x).toBe(0);
  expect(rover.status.y).toBe(0);
});

test("rover completes a series of commands", () => {
  const input: RoverInput = {
    x: 5,
    y: 5,
    direction: "N",
    commands: ["L", "M", "L", "M", "L", "M"],
  };
  const rover = new Rover(input);
  expect(rover.commands.length).toBe(6);
  expect(rover.executedCommands.length).toBe(0);
  rover.executeCommands(() => true);
  expect(rover.commands.length).toBe(0);
  expect(rover.executedCommands.length).toBe(6);
});
