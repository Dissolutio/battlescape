import React from "react"
import { fill } from "lodash"
import {
  HexOrientation,
  Point,
  flatOrientation,
  pointyOrientation,
  Hex,
} from "./models"
import { HexUtils } from "./HexUtils"

// This is the one wrapper version, instead of a hexgrid and a layout

export type RHGWrapperProps = {
  children?: React.ReactNode
  viewBox?: string
  width?: string | number
  height?: string | number
  className?: string
  flat?: boolean
  origin?: Point
  size?: Point
  spacing?: number
}

export const RHGWrapper = (props: RHGWrapperProps) => {
  const {
    children,
    viewBox = "-50 -50 100 100",
    width = 800,
    height = 600,
    className,
    flat = true,
    origin = { x: 0, y: 0 },
    size = { x: 10, y: 10 },
    spacing = 1.0,
  } = props
  return (
    <svg
      className="grid"
      width={width}
      height={height}
      viewBox={viewBox}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <HexgridCtxProvider
        flat={flat}
        origin={origin}
        size={size}
        spacing={spacing}
      >
        <g className={className}>{children}</g>
      </HexgridCtxProvider>
    </svg>
  )
}

// the provider converts flat into orientation into points
export type HexgridProviderProps = {
  children?: React.ReactNode
  flat: boolean
  origin: Point
  size: Point
  spacing: number
}
export type HexgridCtxValue = {
  layout: {
    orientation: HexOrientation
    origin: Point
    size: Point
    spacing: number
  }
  points: ""
}
const HexgridCtx = React.createContext<HexgridCtxValue | undefined>(undefined)

export function HexgridCtxProvider(props: HexgridProviderProps) {
  const { children, flat, origin, size, spacing } = props
  const orientation = flat ? flatOrientation : pointyOrientation
  function getPointOffset(
    cornerIndex: number,
    orientation: HexOrientation,
    size: Point
  ) {
    let angle = (2.0 * Math.PI * (cornerIndex + orientation.startAngle)) / 6
    return { x: size.x * Math.cos(angle), y: size.y * Math.sin(angle) }
  }
  function calculateCoordinates(orientation: HexOrientation) {
    const center = { x: 0, y: 0 }
    const blankCorners = fill(new Array(6), new Point())
    const corners = blankCorners.map((corner, cornerIndex) => {
      const offset = getPointOffset(cornerIndex, orientation, size)
      const nextCorner = { x: center.x + offset.x, y: center.y + offset.y }
      return nextCorner
    })
    return corners
  }
  const cornerCoords = calculateCoordinates(orientation)
  const points = cornerCoords.map((point) => `${point.x},${point.y}`).join(" ")
  return (
    <HexgridCtx.Provider
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
    </HexgridCtx.Provider>
  )
}

export function useHexgridCtx() {
  const context = React.useContext(HexgridCtx)
  if (context === undefined) {
    throw new Error(
      "useHexgridLayoutContext must be used within a HexgridLayoutProvider"
    )
  }
  return context
}

export type RHGHexagonProps = {
  children?: React.ReactNode
  hex: Hex
  fill?: string
  cellStyle?: {}
  className?: string
  data?: {}
  onMouseEnter?: (e: React.SyntheticEvent, hex: Hex) => void
  onMouseOver?: (e: React.SyntheticEvent, hex: Hex) => void
  onMouseLeave?: (e: React.SyntheticEvent, hex: Hex) => void
  onClick?: (e: React.SyntheticEvent, hex: Hex) => void
}

export const RHGHexagon = (props: RHGHexagonProps) => {
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
  } = props
  const { layout, points } = useHexgridCtx()
  const pixel = HexUtils.hexToPixel(hex, layout)
  const fillId = fill ? `url(#${fill})` : null

  return (
    <g
      className={`hexagon-group draggable ${className}`}
      transform={`translate(${pixel.x}, ${pixel.y})`}
      onMouseEnter={onMouseEnter ? (e) => onMouseEnter(e, hex) : null}
      onMouseOver={onMouseOver ? (e) => onMouseOver(e, hex) : null}
      onMouseLeave={onMouseLeave ? (e) => onMouseLeave(e, hex) : null}
      onClick={onClick ? (e) => onClick(e, hex) : null}
    >
      <g className="hexagon">
        <polygon points={points} fill={fillId} style={cellStyle} />
        {children}
      </g>
    </g>
  )
}

export type RHGPathProps = {
  start: Hex
  end: Hex
}

export const RHGPath = (props: RHGPathProps) => {
  const { start, end } = props
  const { layout } = useHexgridCtx()

  const getPoints = () => {
    if (!start || !end) {
      return ""
    }
    // Get all the intersecting hexes between start and end points
    let distance = HexUtils.distance(start, end)
    let intersects = []
    let step = 1.0 / Math.max(distance, 1)
    for (let i = 0; i <= distance; i++) {
      intersects.push(HexUtils.round(HexUtils.hexLerp(start, end, step * i)))
    }
    // Construct Path points out of all the intersecting hexes (e.g. M 0,0 L 10,20, L 30,20)
    let points = "M"
    points += intersects
      .map((hex) => {
        let p = HexUtils.hexToPixel(hex, layout)
        return ` ${p.x},${p.y} `
      })
      .join("L")
    return points
  }
  return <path d={getPoints()}></path>
}
