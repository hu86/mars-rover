import {
  Input,
  isDirection,
  RoverInput,
  REG_EXP_FIRST_LINE,
  REG_EXP_ROVER_POS,
  REG_EXP_ROVER_COM,
  REG_EXP_EOL,
  isCommand,
} from "./typesAndConsts";

/**
 * Parse an input string to an input object
 * The input object then can be used to instantiate the ControlCentre class.
 *
 * Will throw an error string when the input string is deemed invalid
 *
 * @param inputString
 * @returns
 */
export function parseInput(inputString: string): Input {
  const lines = inputString.trim().split(REG_EXP_EOL);
  if (lines.length < 3 || lines.length % 2 === 0) {
    throw "Invalid input string. There should be at least 1 line to indicate the upper-right coordinates of the plateau, and two lines for each rover to indicate the rover's position and commands.";
  }

  const plateauLine = lines.shift() || "";
  if (!new RegExp(REG_EXP_FIRST_LINE).test(plateauLine)) {
    throw "Invalid input string. Invalid first line.";
  }
  const [plateauXStr, plateauYStr] = plateauLine.split(" ");
  const plateauX = parseInt(plateauXStr);
  const plateauY = parseInt(plateauYStr);

  const roverLines = lines.reduce<string[][]>((accumulator, line, i, arr) => {
    if (i % 2 === 0) {
      if (!new RegExp(REG_EXP_ROVER_POS).test(line)) {
        throw `Invalid input string. Invalid line for rover's position: '${line}'.`;
      }
      // Current element is for the rover's position
      // The next element is for the rover's commands
      accumulator.push([line, arr[i + 1]]);
    } else if (!new RegExp(REG_EXP_ROVER_COM).test(line)) {
      throw `Invalid input string. Invalid line for rover's commands: '${line}'.`;
    }
    return accumulator;
  }, []);

  const uniquePosStrings: string[] = [];
  const rovers: RoverInput[] = roverLines.map((lines) => {
    const [xStr, yStr, direction] = lines[0].split(" ");
    const posStr = xStr + "-" + yStr;
    if (uniquePosStrings.indexOf(posStr) === -1) {
      uniquePosStrings.push(posStr);
    } else {
      throw `Invalid input string. Another rover is already positioned at the same spot: '${posStr}'.`;
    }
    const x = parseInt(xStr);
    const y = parseInt(yStr);
    if (x > plateauX || y > plateauY) {
      throw `Invalid input string. Rover's position ${xStr}, ${yStr} is outside the plateau.`;
    }
    if (!isDirection(direction)) {
      throw `Invalid input string. Invalid rover direction: '${direction}'.`;
    }
    return {
      x,
      y,
      direction,
      commands: lines[1].split("").filter(isCommand),
    };
  });

  return {
    plateau: {
      x: plateauX,
      y: plateauY,
    },
    rovers,
  };
}
