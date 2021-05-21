import React from "react";

interface RoverProps {
  cx: number;
  cy: number;
}

export default (prop: RoverProps) => {
  const { cx, cy } = prop;
  return <circle cx={cx} cy={cy} r="40" />;
};