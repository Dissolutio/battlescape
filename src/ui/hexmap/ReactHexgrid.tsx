import React from "react"
import { Hexgrid, HexgridLayout, Point } from "react17-hexgrid"

type ReactHexgridProps = {
  children?: React.ReactNode
  mapSize: number
  width: string | number
  height: string | number
  className?: string
  flat?: boolean
  origin?: Point
  hexSize?: number
  spacing: number
}
export const ReactHexgrid = ({
  children,
  mapSize = 1,
  width,
  height,
  className,
  flat,
  origin,
  hexSize,
  spacing,
}: ReactHexgridProps) => {
  function calcViewBox(mapSize: number) {
    const xyMin = mapSize * -50
    const xyLength = mapSize * 100
    return `${xyMin} ${xyMin} ${xyLength} ${xyLength}`
  }
  return (
    <Hexgrid width={width} height={height} viewBox={calcViewBox(mapSize)}>
      <HexgridLayout
        className={className}
        size={{ x: hexSize, y: hexSize }}
        flat={flat}
        origin={origin}
        spacing={spacing}
      >
        {children}
      </HexgridLayout>
    </Hexgrid>
  )
}
