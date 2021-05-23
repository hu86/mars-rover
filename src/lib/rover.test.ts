import Rover from "./rover";
import { Command, Direction, Position, RoverInput } from "./typesAndConsts";

test("calculate rover's next direction", () => {
  let input: RoverInput;
  let rover: Rover;
  let newDirection: Direction;

  input = {
    x: 0,
    y: 0,
    direction: Direction.NORTH,
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection(Command.LEFT);
  expect(newDirection).toBe(Direction.WEST);

  input = {
    x: 0,
    y: 0,
    direction: Direction.WEST,
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection(Command.LEFT);
  expect(newDirection).toBe(Direction.SOUTH);

  input = {
    x: 0,
    y: 0,
    direction: Direction.SOUTH,
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection(Command.LEFT);
  expect(newDirection).toBe(Direction.EAST);

  input = {
    x: 0,
    y: 0,
    direction: Direction.EAST,
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection(Command.LEFT);
  expect(newDirection).toBe(Direction.NORTH);

  input = {
    x: 0,
    y: 0,
    direction: Direction.NORTH,
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection(Command.RIGHT);
  expect(newDirection).toBe(Direction.EAST);

  input = {
    x: 0,
    y: 0,
    direction: Direction.EAST,
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection(Command.RIGHT);
  expect(newDirection).toBe(Direction.SOUTH);

  input = {
    x: 0,
    y: 0,
    direction: Direction.SOUTH,
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection(Command.RIGHT);
  expect(newDirection).toBe(Direction.WEST);

  input = {
    x: 0,
    y: 0,
    direction: Direction.WEST,
    commands: [],
  };
  rover = new Rover(input);
  newDirection = rover.calculateNextDirection(Command.RIGHT);
  expect(newDirection).toBe(Direction.NORTH);
});

test("calculate rover's next position", () => {
  let input: RoverInput;
  let rover: Rover;
  let newPos: Position;

  // Facing north
  input = {
    x: 1,
    y: 1,
    direction: Direction.NORTH,
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
    direction: Direction.EAST,
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
    direction: Direction.SOUTH,
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
    direction: Direction.WEST,
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
    direction: Direction.EAST,
    commands: [Command.MOVE],
  };
  const rover = new Rover(input);
  expect(rover.status).toEqual({ x: 1, y: 1, direction: Direction.EAST });
  rover.executeCommands(() => true);
  expect(rover.status).toEqual({ x: 2, y: 1, direction: Direction.EAST });
});

test("rover is not moved to a new position", () => {
  const input: RoverInput = {
    x: 0,
    y: 0,
    direction: Direction.NORTH,
    commands: [Command.LEFT, Command.MOVE],
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
    direction: Direction.NORTH,
    commands: [
      Command.LEFT,
      Command.MOVE,
      Command.LEFT,
      Command.MOVE,
      Command.LEFT,
      Command.MOVE,
    ],
  };
  const rover = new Rover(input);
  expect(rover.commands.length).toBe(6);
  expect(rover.executedCommands.length).toBe(0);
  rover.executeCommands(() => true);
  expect(rover.commands.length).toBe(0);
  expect(rover.executedCommands.length).toBe(6);
});
