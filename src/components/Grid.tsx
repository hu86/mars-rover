import React, { useState, useMemo, useEffect } from "react";
import GridCell from "./GridCell";
import Rover from "./Rover";

import { Input } from "../lib/typesAndConsts";
import ControlCentre from "../lib/controlCentre";

export default () => {
  const controlCentre = useMemo(() => {
    const input: Input = {
      plateau: {
        x: 5,
        y: 5,
      },
      rovers: [
        {
          x: 1,
          y: 2,
          direction: "N",
          commands: "LMLMLMLMM",
        },
        {
          x: 3,
          y: 3,
          direction: "E",
          commands: "MMRMMRMRRM",
        },
      ],
    };

    const controlCentre = new ControlCentre(input);
    controlCentre.moveRovers();
    return controlCentre;
  }, []);
  const [currentSnapShot, setCurrentSnapShot] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (currentSnapShot === controlCentre.rovers[0].snapShots.length - 1) {
        setCurrentSnapShot(0);
      } else {
        setCurrentSnapShot(currentSnapShot + 1);
      }
    }, 2000);
  }, [currentSnapShot]);

  // console.log(controlCentre.reportRovers());

  const cellSize = 100;
  const width = cellSize * (controlCentre.maxX + 1);
  const height = cellSize * (controlCentre.maxY + 1);
  const getCells = () => {
    let cells: JSX.Element[] = [];
    for (let i = 0; i < controlCentre.maxY + 1; i++) {
      for (let j = 0; j < controlCentre.maxX + 1; j++) {
        cells.push(
          <GridCell size={cellSize * 0.9} x={j * cellSize} y={i * cellSize} />
        );
      }
    }
    return cells;
  };
  return (
    <svg width={width} height={height}>
      {getCells()}
      <Rover
        cx={
          controlCentre.rovers[0].snapShots[currentSnapShot].x * cellSize +
          (cellSize * 0.9) / 2
        }
        cy={
          (controlCentre.maxX -
            controlCentre.rovers[0].snapShots[currentSnapShot].y) *
            cellSize +
          (cellSize * 0.9) / 2
        }
      />
    </svg>
  );
};
