import React from "react";
import { Point } from "./models";

export type PatternProps = {
  id: string;
  link: string;
  size?: Point;
};

export const Pattern = (props: PatternProps) => {
  const { id, size = { x: 10, y: 10 }, link } = props;
  return (
    <defs>
      <pattern
        id={id}
        patternUnits="objectBoundingBox"
        x={0}
        y={0}
        width={size.x}
        height={size.y}
      >
        <image
          xlinkHref={link}
          x={0}
          y={0}
          width={size.x * 2}
          height={size.y * 2}
        />
      </pattern>
    </defs>
  );
};
