import { Input, Output, Position } from "./typesAndConsts";
import Rover from "./rover";

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
      rover.excuteCommands((pos): boolean => this.canMoveRoverTo(pos));
    });
  }

  canMoveRoverTo(pos: Position): boolean {
    if (pos.x > this.maxX || pos.x < 0) {
      return false;
    }
    if (pos.y > this.maxY || pos.y < 0) {
      return false;
    }
    return !this.rovers.some(
      (rover) => rover.status.x === pos.x && rover.status.y === pos.y
    );
  }

  getOutput(): Output {
    return {
      roverStatuses: this.rovers.map((rover) => {
        return rover.status;
      }),
    };
  }
}

export default ControlCentre;
