import { Output, EOL } from "./typesAndConsts";

/**
 * Format a string that represents the final positions and headings of the rovers
 * @param output
 * @returns
 */
export function formatOutput(output: Output): string {
  return output.roverStatuses
    .map((status) => `${status.x} ${status.y} ${status.direction}`)
    .join(EOL);
}
