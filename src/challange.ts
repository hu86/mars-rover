export type Direction = "E" | "W" | "N" | "S";

const DIRECTION_VALUES_SEQUENCE: Direction[] = ["E", "S", "W", "N"];

export type Command = "L" | "R" | "M";

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

function isCommand(command: string | Command): command is Command {
  switch (command) {
    case "L":
    case "R":
    case "M":
      return true;
    default:
      return false;
  }
}

class Rover {
  x: number;
  y: number;
  direction: Direction;
  commands: Command[];
  history: Command[] = [];
  constructor(
    input: RoverInput = {
      x: 0,
      y: 0,
      direction: "W",
      commands: "",
    }
  ) {
    this.x = input.x;
    this.y = input.y;
    this.direction = input.direction;
    // TODO - catch the invalid commands?
    this.commands = input.commands.split("").filter(isCommand);
  }
  next(): void {
    const command = this.commands.shift();
    if (command) {
      this.history.push(command);
    }
  }
  performCommands(canMoveTo: CanMoveTo): void {
    while (this.commands.length > 0) {
      const nextCommand = this.commands[0];
      switch (nextCommand) {
        case "L":
        case "R":
          this.turn(nextCommand);
          break;
        case "M":
          let newPos = this.nextPosition();
          if (canMoveTo(newPos)) {
            this.moveTo(newPos);
          } else {
            // TODO
          }
      }
      this.next();
    }
  }
  turn(command: "L" | "R"): void {
    let newDirectionIndex: number;
    newDirectionIndex =
      DIRECTION_VALUES_SEQUENCE.indexOf(this.direction) +
      (command === "L" ? -1 : 1);
    if (newDirectionIndex < 0) {
      newDirectionIndex = DIRECTION_VALUES_SEQUENCE.length - 1;
    } else if (newDirectionIndex > DIRECTION_VALUES_SEQUENCE.length - 1) {
      newDirectionIndex = 0;
    }
    this.direction = DIRECTION_VALUES_SEQUENCE[newDirectionIndex];
  }
  nextPosition(): Position {
    let x = this.x;
    let y = this.y;
    switch (this.direction) {
      case "E":
        x++;
        break;
      case "W":
        x--;
        break;
      case "S":
        y++;
        break;
      case "N":
        y--;
        break;
    }
    return { x, y };
  }
  moveTo(pos: Position): void {
    this.x = pos.x;
    this.y = pos.y;
  }
}

class ControlCentre {
  maxX: number;
  maxY: number;
  rovers: Rover[];
  constructor(input: Input) {
    this.maxX = input.plateau.x;
    this.maxY = input.plateau.y;
    this.rovers = input.rovers.map((roverInput) => new Rover(roverInput));
  }
  moveRovers(): void {
    this.rovers.forEach((rover) => {
      rover.performCommands((pos): boolean => {
        return this.canMoveRoverTo(pos);
      });
    });
  }
  canMoveRoverTo(pos: Position): boolean {
    if (pos.x > this.maxX || pos.x < 0) {
      return false;
    }
    if (pos.y > this.maxY || pos.y < 0) {
      return false;
    }
    return !this.rovers.some((rover) => rover.x === pos.x && rover.y === pos.y);
  }
  reportRovers(): string {
    return this.rovers
      .map((rover) => `${rover.x} ${rover.y} ${rover.direction}`)
      .join("\r\n");
  }
}

export default ControlCentre;
