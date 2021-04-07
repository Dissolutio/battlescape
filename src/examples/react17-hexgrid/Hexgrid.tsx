import React from "react";

type HexgridProps = {
  children?: React.ReactNode;
  className?: string;
  viewBox?: string;
  width?: string | number;
  height?: string | number;
};

export const Hexgrid = (props: HexgridProps) => {
  const {
    children,
    viewBox = "-50 -50 100 100",
    width = 800,
    height = 600,
  } = props;
  return (
    <svg
      className="grid"
      data-testid="Hexgrid"
      width={width}
      height={height}
      viewBox={viewBox}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};
