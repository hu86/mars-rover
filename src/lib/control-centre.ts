import { Input, Position } from "./types-consts";
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
