import { Output } from "./typesAndConsts";

export function formatOutput(output: Output): string {
  return output.roverStatuses
    .map((status) => `${status.x} ${status.y} ${status.direction}`)
    .join("\r\n");
}
