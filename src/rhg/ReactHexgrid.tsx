import React from "react"
import { HexGrid } from "./HexGrid"
import { HexgridLayout } from "./HexgridLayout"

type ReactHexgridProps = {
  mapSize: number
  width: string | number
  height: string | number
  hexSize: number
  spacing: number
  children: any
}

export const ReactHexgrid = ({
  mapSize,
  width,
  height,
  hexSize,
  spacing,
  children,
}: ReactHexgridProps) => {
  const halfViewBox = mapSize * -50
  const fullViewBox = mapSize * 100
  return (
    <HexGrid
      width={width}
      height={height}
      viewBox={`${halfViewBox} ${halfViewBox} ${fullViewBox} ${fullViewBox}`}
    >
      <HexgridLayout
        size={{
          x: hexSize,
          y: hexSize,
        }}
        flat={false}
        origin={{ x: 0, y: 0 }}
        spacing={spacing}
      >
        {children}
      </HexgridLayout>
    </HexGrid>
  )
}
