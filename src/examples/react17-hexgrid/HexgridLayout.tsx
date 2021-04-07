import React from "react";
import {
  HexOrientation,
  Point,
  flatOrientation,
  pointyOrientation,
} from "./models";
// is parent of provider
export type HexgridLayoutProps = {
  children?: React.ReactNode;
  className?: string;
  flat?: boolean;
  origin?: Point;
  size?: Point;
  spacing?: number;
};
// the provider converts flat into orientation into points
export type HexgridLayoutProviderProps = {
  children?: React.ReactNode;
  flat: boolean;
  origin: Point;
  size: Point;
  spacing: number;
};
export type HexgridCtxLayout = {
  orientation: HexOrientation;
  origin: Point;
  size: Point;
  spacing: number;
};
export type HexgridLayoutCtxValue = {
  layout: HexgridCtxLayout;
  points: string;
};
export const HexgridLayout = (props: HexgridLayoutProps) => {
  const {
    children,
    className,
    flat = true,
    origin = { x: 0, y: 0 },
    size = { x: 10, y: 10 },
    spacing = 1.0,
  } = props;
  return (
    <HexgridLayoutProvider
      flat={flat}
      origin={origin}
      size={size}
      spacing={spacing}
    >
      <g className={className} data-testid="HexgridLayout">
        {children}
      </g>
    </HexgridLayoutProvider>
  );
};

export const HexgridLayoutContext = React.createContext<
  HexgridLayoutCtxValue | undefined
>(undefined);

export function HexgridLayoutProvider(props: HexgridLayoutProviderProps) {
  const { children, flat, origin, size, spacing } = props;
  const orientation = flat ? flatOrientation : pointyOrientation;
  function getPointOffset(
    cornerIndex: number,
    orientation: HexOrientation,
    size: Point
  ) {
    let angle = (2.0 * Math.PI * (cornerIndex + orientation.startAngle)) / 6;
    return { x: size.x * Math.cos(angle), y: size.y * Math.sin(angle) };
  }
  function calculateCoordinates(orientation: HexOrientation) {
    const center = { x: 0, y: 0 };
    const blankCorners = Array.from({ length: 6 }, () => ({ x: 0, y: 0 }));
    const corners = blankCorners.map((corner, cornerIndex) => {
      const offset = getPointOffset(cornerIndex, orientation, size);
      const nextCorner = { x: center.x + offset.x, y: center.y + offset.y };
      return nextCorner;
    });
    return corners;
  }
  const cornerCoords = calculateCoordinates(orientation);
  const points = cornerCoords.map((point) => `${point.x},${point.y}`).join(" ");
  return (
    <HexgridLayoutContext.Provider
      value={{
        layout: {
          orientation,
          origin,
          size,
          spacing,
        },
        points,
      }}
    >
      {children}
    </HexgridLayoutContext.Provider>
  );
}

export function useHexgridLayoutContext() {
  const context = React.useContext(HexgridLayoutContext);
  if (context === undefined) {
    throw new Error(
      "useHexgridLayoutContext must be used within a HexgridLayoutProvider"
    );
  }
  return context;
}
