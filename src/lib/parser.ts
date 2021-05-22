import { Input, isDirection, Output, RoverInput } from "./typesAndConsts";

export function parseInput(inputString: string): Input {
  const lines = inputString.trim().split(/\r?\n/g);
  if (lines.length < 3 || lines.length % 2 === 0) {
    throw "Invalid input string. There should be at least 1 line to indicate the upper-right coordinates of the plateau, and two lines for each rover to indicate the rover's position and commands.";
  }

  const plateauLine = lines.shift() || "";
  if (!new RegExp(/^\d+ \d+$/g).test(plateauLine)) {
    throw "Invalid input string. Invalid first line.";
  }
  const [plateauXStr, plateauYStr] = plateauLine.split(" ");
  const plateauX = parseInt(plateauXStr);
  const plateauY = parseInt(plateauYStr);

  const roverLines = lines.reduce<string[][]>((accumulator, line, i, arr) => {
    if (i % 2 === 0) {
      if (!new RegExp(/^\d+ \d+ [NSEW]$/g).test(line)) {
        throw `Invalid input string. Invalid line for rover's position: '${line}'.`;
      }
      accumulator.push([line, arr[i + 1]]);
    } else if (!new RegExp(/^[LRM]+$/g).test(line)) {
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
      throw `Invalid input string. Antoher rover is already positioned at the same spot: '${posStr}'.`;
    }
    const x = parseInt(xStr);
    const y = parseInt(yStr);
    if (x > plateauX || y > plateauY) {
      throw `Invalid input string. Rover's position is outside the plateau: '${lines[0]}'.`;
    }
    if (!isDirection(direction)) {
      throw `Invalid input string. Invalid rover direction: '${direction}'.`;
    }
    return {
      x,
      y,
      direction,
      commands: lines[1],
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

export function parseOutput(output: Output): string {
  return output.roverStatuses
    .map((status) => `${status.x} ${status.y} ${status.direction}`)
    .join("\r\n");
}
