import { parseInput } from "./parser";

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
        direction: "N",
        commands: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
      },
      {
        x: 3,
        y: 3,
        direction: "E",
        commands: ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"],
      },
    ],
  });
});
