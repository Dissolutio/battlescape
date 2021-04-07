import React from "react";
import { useHexgridLayoutContext } from "./HexgridLayout";
import { HexUtils } from "./HexUtils";
import { Hex } from "./models";

export type PathProps = {
  start: Hex;
  end: Hex;
};

export const Path = (props: PathProps) => {
  const { start, end } = props;
  const { layout } = useHexgridLayoutContext();

  const getPoints = () => {
    if (!start || !end) {
      return "";
    }
    // Get all the intersecting hexes between start and end points
    let distance = HexUtils.distance(start, end);
    let intersects = [];
    let step = 1.0 / Math.max(distance, 1);
    for (let i = 0; i <= distance; i++) {
      intersects.push(HexUtils.round(HexUtils.hexLerp(start, end, step * i)));
    }
    // Construct Path points out of all the intersecting hexes (e.g. M 0,0 L 10,20, L 30,20)
    let points = "M";
    points += intersects
      .map((hex) => {
        let p = HexUtils.hexToPixel(hex, layout);
        return ` ${p.x},${p.y} `;
      })
      .join("L");
    return points;
  };
  return <path d={getPoints()}></path>;
};
