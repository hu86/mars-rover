import { Input, Output, Position } from "./typesAndConsts";
import Rover from "./rover";

/**
 * For creating objects that represent simulations
 * Each simulation is generated based on the input and will move the rovers in sequence
 * Can output the final positions and headings of all rovers
 */
class ControlCentre {
  maxX: number;
  maxY: number;
  rovers: Rover[];

  constructor(input: Input) {
    this.maxX = input.plateau.x;
    this.maxY = input.plateau.y;
    this.rovers = input.rovers.map((roverInput) => new Rover(roverInput));
  }

  /**
   * Move all rovers in sequence (by order in array)
   */
  moveRovers(): void {
    this.rovers.forEach((rover /*, i*/) => {
      // console.log(`rover ${i} started`);
      rover.executeCommands((pos): boolean => this.canMoveRoverTo(pos));
    });
  }

  /**
   * Compute if the supplied position is out of the plateau or causing collision
   * @param pos
   * @returns
   */
  canMoveRoverTo(pos: Position): boolean {
    if (pos.x > this.maxX || pos.x < 0) {
      return false;
    }
    if (pos.y > this.maxY || pos.y < 0) {
      return false;
    }
    // The new position cannot be the same as the current rover either
    // That is equivalent of not moving
    return !this.rovers.some(
      (rover) => rover.status.x === pos.x && rover.status.y === pos.y
    );
  }

  /**
   * Report all rover's current positions and headings
   * @returns
   */
  getOutput(): Output {
    return {
      roverStatuses: this.rovers.map((rover) => {
        return rover.status;
      }),
    };
  }
}

export default ControlCentre;
