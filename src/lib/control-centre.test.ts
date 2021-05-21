import ControlCentre from "./control-centre";
import { Input } from "./types-consts";

test("mars rovers challenge", () => {
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
  const reports = controlCentre.reportRovers();
  expect(reports).toBe(`1 3 N\r\n5 1 E`);
});
