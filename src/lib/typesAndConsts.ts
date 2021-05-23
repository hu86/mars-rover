/**
 * East, West, North and South
 */
export type Direction = "E" | "W" | "N" | "S";

/**
 * Representing the sequence of the change of rover's heading by turning left or right
 * Must include all possible Directions
 * The order in this array is the same as the rover turning clockwise:
 * East -> South -> West -> North
 */
export const DIRECTION_VALUES_SEQUENCE: Direction[] = ["E", "S", "W", "N"];

/**
 * Type predicate for Direction
 * @param direction
 * @returns
 */
export function isDirection(
  direction: string | Direction
): direction is Direction {
  return DIRECTION_VALUES_SEQUENCE.indexOf(direction as Direction) !== -1;
}

/**
 * Turn Left, Turn Right and Move Forward
 */
export type Command = "L" | "R" | "M";

/**
 * Type predicate for Command
 * @param command
 * @returns
 */
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

/**
 * Coordinate on the plateau
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Rover's coordinate plus its heading
 */
export interface RoverStatus extends Position {
  direction: Direction;
}

/**
 * Input for constructing a Rover object
 */
export interface RoverInput {
  x: number;
  y: number;
  direction: Direction;
  commands: Command[];
}

/**
 * Input object for a single simulation run
 */
export interface Input {
  /**
   * Plateau's top right position
   * This defines the size of the plateau grid
   */
  plateau: Position;
  rovers: RoverInput[];
}

/**
 * Output object containing all rover's current positions and headings
 */
export interface Output {
  roverStatuses: RoverStatus[];
}

/**
 * Function that determine if a rover can be moved to the supplied position
 */
export interface CanMoveTo {
  (pos: Position): boolean;
}

/* RegExps for validating input string  */
export const REG_EXP_EOL = /\r?\n/g;
export const REG_EXP_FIRST_LINE = /^\d+ \d+$/g;
export const REG_EXP_ROVER_POS = /^\d+ \d+ [NSEW]$/g;
export const REG_EXP_ROVER_COM = /^[LRM]+$/g;

/**
 * Line break for formatting output string
 */
export const EOL = "\r\n";
