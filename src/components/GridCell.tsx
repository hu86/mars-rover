import React from "react";

interface GridCellProps {
  size: number;
  x: number;
  y: number;
}

export default (prop: GridCellProps) => {
  const { size, x, y } = prop;
  return (
    <rect
      width={size}
      height={size}
      x={x}
      y={y}
      rx={5}
      ry={5}
      style={{ strokeWidth: 1, stroke: "black", fill: "white" }}
    />
  );
};
