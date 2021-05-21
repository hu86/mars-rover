import Rover from "./rover";
import { Position, RoverInput } from "./typesAndConsts";

test("rover can turn", () => {
  const input: RoverInput = {
    x: 0,
    y: 0,
    direction: "N",
    commands: "",
  };
  const rover = new Rover(input);
  rover.turn("L");
  expect(rover.direction).toBe("W");
  rover.turn("L");
  expect(rover.direction).toBe("S");
  rover.turn("L");
  expect(rover.direction).toBe("E");
  rover.turn("L");
  expect(rover.direction).toBe("N");
  rover.turn("R");
  expect(rover.direction).toBe("E");
  rover.turn("R");
  expect(rover.direction).toBe("S");
  rover.turn("R");
  expect(rover.direction).toBe("W");
  rover.turn("R");
  expect(rover.direction).toBe("N");
});

test("can predict rover's next position", () => {
  const input: RoverInput = {
    x: 1,
    y: 1,
    direction: "N",
    commands: "",
  };
  const rover = new Rover(input);
  let newPos: Position;

  // Facing north
  newPos = rover.nextPosition();
  expect(newPos.x).toBe(1);
  expect(newPos.y).toBe(2);

  rover.turn("R");

  // Facing east
  newPos = rover.nextPosition();
  expect(newPos.x).toBe(2);
  expect(newPos.y).toBe(1);

  rover.turn("R");

  // Facing south
  newPos = rover.nextPosition();
  expect(newPos.x).toBe(1);
  expect(newPos.y).toBe(0);

  rover.turn("R");

  // Facing west
  newPos = rover.nextPosition();
  expect(newPos.x).toBe(0);
  expect(newPos.y).toBe(1);
});

test("rover is moved to a new position", () => {
  const input: RoverInput = {
    x: 1,
    y: 1,
    direction: "N",
    commands: "",
  };
  const rover = new Rover(input);
  expect(rover.x).toBe(1);
  expect(rover.y).toBe(1);
  let newPos: Position = {
    x: 2,
    y: 1,
  };
  rover.moveTo(newPos);
  expect(rover.x).toBe(2);
  expect(rover.y).toBe(1);
});

test("rover is not moved to a new position", () => {
  const input: RoverInput = {
    x: 0,
    y: 0,
    direction: "N",
    commands: "LM",
  };
  const rover = new Rover(input);
  expect(rover.x).toBe(0);
  expect(rover.y).toBe(0);
  rover.performCommands(() => false);
  expect(rover.x).toBe(0);
  expect(rover.y).toBe(0);
});

test("rover completes one command and is ready for the next one", () => {
  const input: RoverInput = {
    x: 1,
    y: 1,
    direction: "N",
    commands: "LM",
  };
  const rover = new Rover(input);
  expect(rover.commands.length).toBe(2);
  expect(rover.excutedCommands.length).toBe(0);
  expect(rover.commands[0]).toBe("L");
  expect(rover.commands[1]).toBe("M");
  rover.next();
  expect(rover.commands.length).toBe(1);
  expect(rover.excutedCommands.length).toBe(1);
  expect(rover.commands[0]).toBe("M");
  expect(rover.excutedCommands[0]).toBe("L");
});

test("rover completes a series of commands", () => {
  const input: RoverInput = {
    x: 5,
    y: 5,
    direction: "N",
    commands: "LMLMLM",
  };
  const rover = new Rover(input);
  expect(rover.commands.length).toBe(6);
  expect(rover.excutedCommands.length).toBe(0);
  rover.performCommands(() => true);
  expect(rover.commands.length).toBe(0);
  expect(rover.excutedCommands.length).toBe(6);
});
