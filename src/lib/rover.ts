import {
  Direction,
  Command,
  RoverInput,
  Position,
  isCommand,
  CanMoveTo,
  DIRECTION_VALUES_SEQUENCE,
  SnapShot,
} from "./typesAndConsts";

class Rover {
  x: number;
  y: number;
  direction: Direction;
  commands: Command[];
  excutedCommands: Command[] = [];
  snapShots: SnapShot[] = [];

  constructor(
    input: RoverInput = {
      x: 0,
      y: 0,
      direction: "N",
      commands: "",
    }
  ) {
    this.x = input.x;
    this.y = input.y;
    this.direction = input.direction;
    // TODO - catch the invalid commands?
    this.commands = input.commands.split("").filter(isCommand);
    this.snapShots.push({
      x: this.x,
      y: this.y,
      direction: this.direction,
    });
  }

  next(): void {
    const command = this.commands.shift();
    if (command) {
      this.excutedCommands.push(command);
    }
    this.snapShots.push({
      x: this.x,
      y: this.y,
      direction: this.direction,
    });
    // console.log(`${this.x} ${this.y} ${this.direction}`);
  }

  performCommands(canMoveTo: CanMoveTo): void {
    while (this.commands.length > 0) {
      const nextCommand = this.commands[0];
      let newPos: Position;
      switch (nextCommand) {
        case "L":
        case "R":
          this.turn(nextCommand);
          break;
        case "M":
          newPos = this.nextPosition();
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
    let { x } = this;
    let { y } = this;
    switch (this.direction) {
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

  moveTo(pos: Position): void {
    this.x = pos.x;
    this.y = pos.y;
  }
}

export default Rover;
