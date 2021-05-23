import {
  Command,
  RoverInput,
  Position,
  CanMoveTo,
  DIRECTION_VALUES_SEQUENCE,
  RoverStatus,
  Direction,
} from "./typesAndConsts";

/**
 * For creating Rover object.
 * To simulate a rover's position and heading change as the rover execute the issued commands
 */
class Rover {
  commands: Command[];
  executedCommands: Command[] = [];

  status: RoverStatus;
  statuses: RoverStatus[] = [];

  constructor(
    input: RoverInput = {
      x: 0,
      y: 0,
      direction: Direction.NORTH,
      commands: [],
    }
  ) {
    this.status = {
      x: input.x,
      y: input.y,
      direction: input.direction,
    };
    this.commands = input.commands;
    this.statuses.push(this.status);
  }

  /**
   * Execute the issued commands in sequence
   * Can throw error string when a command is not able to be committed
   * @param canMoveTo external function that determines if the rover is safe to move to its next position
   */
  executeCommands(canMoveTo: CanMoveTo): void {
    while (this.commands.length > 0) {
      const nextCommand = this.commands[0];
      // console.log(`executing command ${nextCommand}`);
      let newPos: Position;
      let newDirection: Direction;
      switch (nextCommand) {
        case "L":
        case "R":
          newDirection = this.calculateNextDirection(nextCommand);
          this.status = {
            ...this.status,
            direction: newDirection,
          };
          break;
        case "M":
          newPos = this.calculateNextPosition();
          if (canMoveTo(newPos)) {
            this.status = {
              ...this.status,
              ...newPos,
            };
          } else {
            throw `Simulation terminated. Rover cannot be moved to position: ${newPos.x}-${newPos.y}`;
          }
          break;
      }
      const command = this.commands.shift();
      if (command) {
        this.executedCommands.push(command);
      }
      this.statuses.push(this.status);
    }
  }

  /**
   * Compute the new heading based on current heading and the command (turning left or right)
   * @param command
   * @returns
   */
  calculateNextDirection(command: "L" | "R"): Direction {
    let newDirectionIndex: number;
    newDirectionIndex =
      DIRECTION_VALUES_SEQUENCE.indexOf(this.status.direction) +
      (command === "L" ? -1 : 1);
    if (newDirectionIndex < 0) {
      newDirectionIndex = DIRECTION_VALUES_SEQUENCE.length - 1;
    } else if (newDirectionIndex > DIRECTION_VALUES_SEQUENCE.length - 1) {
      newDirectionIndex = 0;
    }
    return DIRECTION_VALUES_SEQUENCE[newDirectionIndex];
  }

  /**
   * Compute the new position based on current position
   * @returns
   */
  calculateNextPosition(): Position {
    let { x } = this.status;
    let { y } = this.status;
    switch (this.status.direction) {
      case Direction.EAST:
        x++;
        break;
      case Direction.WEST:
        x--;
        break;
      case Direction.NORTH:
        y++;
        break;
      case Direction.SOUTH:
        y--;
        break;
    }
    return { x, y };
  }
}

export default Rover;
