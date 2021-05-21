export type Direction = "E" | "W" | "N" | "S";

export const DIRECTION_VALUES_SEQUENCE: Direction[] = ["E", "S", "W", "N"];

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

export interface RoverInput {
  x: number;
  y: number;
  direction: Direction;
  commands: string;
}

export interface PlateauInput {
  x: number;
  y: number;
}

export interface Input {
  plateau: PlateauInput;
  rovers: RoverInput[];
}

export interface CanMoveTo {
  (pos: Position): boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface SnapShot {
  x: number;
  y: number;
  direction: Direction;
}
