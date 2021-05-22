import { formatOutput } from "./formatter";
import { Output } from "./typesAndConsts";

test("format an output object as string", () => {
  const output: Output = {
    roverStatuses: [
      {
        x: 1,
        y: 3,
        direction: "N",
      },
      {
        x: 5,
        y: 1,
        direction: "E",
      },
    ],
  };
  const outputString = formatOutput(output);
  expect(outputString).toBe("1 3 N\r\n5 1 E");
});
