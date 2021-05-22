export type Direction = "E" | "W" | "N" | "S";

export const DIRECTION_VALUES_SEQUENCE: Direction[] = ["E", "S", "W", "N"];

export function isDirection(
  direction: string | Direction
): direction is Direction {
  return DIRECTION_VALUES_SEQUENCE.indexOf(direction as Direction) !== -1;
}

export type Command = "L" | "R" | "M";

export function isCommand(command: string | Command): command is Command {
  switch (command) {
    case "L":
    case "R":
    case "M":
      return true;
    default:
      return false;
  }
}

export interface Position {
  x: number;
  y: number;
}

export interface RoverStatus extends Position {
  direction: Direction;
}

export interface RoverInput {
  x: number;
  y: number;
  direction: Direction;
  commands: Command[];
}

export interface PlateauInput {
  x: number;
  y: number;
}

export interface Input {
  plateau: PlateauInput;
  rovers: RoverInput[];
}

export interface Output {
  roverStatuses: RoverStatus[];
}

export interface CanMoveTo {
  (pos: Position): boolean;
}

export const REG_EXP_EOL = /\r?\n/g;
export const REG_EXP_FIRST_LINE = /^\d+ \d+$/g;
export const REG_EXP_ROVER_POS = /^\d+ \d+ [NSEW]$/g;
export const REG_EXP_ROVER_COM = /^[LRM]+$/g;
