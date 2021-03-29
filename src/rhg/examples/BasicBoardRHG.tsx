import React from "react"
import { StyledBasicHexes } from "./BasicBoard"
import { GridGenerator, RHGWrapper, RHGHexagon } from ".."

export const BasicBoardRHG = () => {
  const hexagons = GridGenerator.parallelogram(-2, 3, -2, 1)
  return (
    <StyledBasicHexes>
      <RHGWrapper width={900} height={600} size={{ x: 7, y: 7 }}>
        {hexagons.map((hex, i) => (
          <RHGHexagon key={i} hex={hex} />
        ))}
      </RHGWrapper>
    </StyledBasicHexes>
  )
}
