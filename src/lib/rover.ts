import {
  Command,
  RoverInput,
  Position,
  isCommand,
  CanMoveTo,
  DIRECTION_VALUES_SEQUENCE,
  RoverStatus,
  Direction,
} from "./typesAndConsts";

class Rover {
  commands: Command[];
  excutedCommands: Command[] = [];

  status: RoverStatus;
  statuses: RoverStatus[] = [];

  constructor(
    input: RoverInput = {
      x: 0,
      y: 0,
      direction: "N",
      commands: "",
    }
  ) {
    this.status = {
      x: input.x,
      y: input.y,
      direction: input.direction,
    };
    // TODO - catch the invalid commands?
    this.commands = input.commands.split("").filter(isCommand);
    this.statuses.push(this.status);
  }

  excuteCommands(canMoveTo: CanMoveTo): void {
    while (this.commands.length > 0) {
      const nextCommand = this.commands[0];
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
            // TODO
          }
          break;
      }
      const command = this.commands.shift();
      if (command) {
        this.excutedCommands.push(command);
      }
      this.statuses.push(this.status);
    }
  }

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

  calculateNextPosition(): Position {
    let { x } = this.status;
    let { y } = this.status;
    switch (this.status.direction) {
      case "E":
        x++;
        break;
      case "W":
        x--;
        break;
      case "N":
        y++;
        break;
      case "S":
        y--;
        break;
    }
    return { x, y };
  }
}

export default Rover;
