import { parseInput } from "./parser";
import { Direction } from "./typesAndConsts";

test("parse an input string to input object", () => {
  const inputString = "5 5\r\n1 2 N\r\nLMLMLMLMM\r\n3 3 E\r\nMMRMMRMRRM";
  const input = parseInput(inputString);
  expect(input).toEqual({
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
  });
});

test("parse an input string to input object - not enough lines", () => {
  const inputString = "5 5\r\n1 2 N";
  expect(() => parseInput(inputString)).toThrow(
    /^Invalid input string. There should be at least 1 line/g
  );
});

test("parse an input string to input object - invalid plateau line", () => {
  const inputString = "55\r\n1 2 N\r\nLMLMLMLMM\r\n3 3 E\r\nMMRMMRMRRM";
  expect(() => parseInput(inputString)).toThrow(
    /^Invalid input string. Invalid first line/g
  );
});

test("parse an input string to input object - invalid rover position line", () => {
  const inputString = "5 5\r\n1 2 \r\nLMLMLMLMM\r\n3 3 E\r\nMMRMMRMRRM";
  expect(() => parseInput(inputString)).toThrow(
    /^Invalid input string\. Invalid line for rover's position/g
  );
});

test("parse an input string to input object - invalid rover commands line", () => {
  const inputString = "5 5\r\n1 2 N\r\nX\r\n3 3 E\r\nMMRMMRMRRM";
  expect(() => parseInput(inputString)).toThrow(
    /^Invalid input string\. Invalid line for rover's commands/g
  );
});

test("parse an input string to input object - more than one rovers at the same position", () => {
  const inputString = "5 5\r\n1 2 N\r\nLMLMLMLMM\r\n1 2 N\r\nMMRMMRMRRM";
  expect(() => parseInput(inputString)).toThrow(
    /^Invalid input string\. Another rover is already positioned at the same spot/g
  );
});

test("parse an input string to input object - invalid rover commands line", () => {
  const inputString = "5 5\r\n1 2 N\r\nLMLMLMLMM\r\n3 6 N\r\nMMRMMRMRRM";
  expect(() => parseInput(inputString)).toThrow(
    /^Invalid input string\. Rover's position is outside the plateau/g
  );
});
