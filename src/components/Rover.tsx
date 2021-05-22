import React from "react";

interface RoverProps {
  cx: number;
  cy: number;
}

export default function Rover(prop: RoverProps): JSX.Element {
  const { cx, cy } = prop;
  return <circle cx={cx} cy={cy} r="40" />;
}
