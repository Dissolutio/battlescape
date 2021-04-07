import React from "react";
import { useHexgridLayoutContext } from "./HexgridLayout";
import { Hex } from "./models";
import { HexUtils } from "./HexUtils";

export type HexagonProps = {
  children?: React.ReactNode;
  hex: Hex;
  fill?: string;
  cellStyle?: {};
  className?: string;
  data?: {};
  onMouseEnter?: (e: React.SyntheticEvent, hex: Hex) => void;
  onMouseOver?: (e: React.SyntheticEvent, hex: Hex) => void;
  onMouseLeave?: (e: React.SyntheticEvent, hex: Hex) => void;
  onClick?: (e: React.SyntheticEvent, hex: Hex) => void;
};

export const Hexagon = (props: HexagonProps) => {
  const {
    children,
    hex,
    fill,
    cellStyle,
    className = "",
    onMouseEnter,
    onMouseOver,
    onMouseLeave,
    onClick,
  } = props;
  const { layout, points } = useHexgridLayoutContext();
  const pixel = HexUtils.hexToPixel(hex, layout);
  const fillId = fill ? `url(#${fill})` : undefined;

  return (
    <g
      className={`hexagon-group draggable ${className}`}
      transform={`translate(${pixel.x}, ${pixel.y})`}
      onMouseEnter={onMouseEnter ? (e) => onMouseEnter(e, hex) : undefined}
      onMouseOver={onMouseOver ? (e) => onMouseOver(e, hex) : undefined}
      onMouseLeave={onMouseLeave ? (e) => onMouseLeave(e, hex) : undefined}
      onClick={onClick ? (e) => onClick(e, hex) : undefined}
    >
      <g className="hexagon">
        <polygon points={points} fill={fillId} style={cellStyle} />
        {children}
      </g>
    </g>
  );
};
