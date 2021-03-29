import React from "react"
import styled from "styled-components"

import {
  GridGenerator,
  HexGrid,
  HexUtils,
  HexgridLayout,
  Path,
  Pattern,
  Hexagon,
  Text,
  Hex,
} from ".."

export const BasicBoard = () => {
  const hexagons = GridGenerator.parallelogram(-2, 3, -2, 1)
  return (
    <StyledBasicHexes>
      <HexGrid width={900} height={600}>
        <HexgridLayout size={{ x: 7, y: 7 }}>
          {hexagons.map((hex, i) => (
            <Hexagon key={i} hex={hex} />
          ))}
        </HexgridLayout>
      </HexGrid>
    </StyledBasicHexes>
  )
}

const StyledBasicHexes = styled.div`
  svg g {
    fill: #3f51b5;
    fill-opacity: 0.6;
  }
  svg g:hover {
    fill-opacity: 1;
  }
  svg g:hover text {
    fill-opacity: 1;
  }

  svg g polygon {
    stroke: #3f51b5;
    stroke-width: 0.2;
    transition: fill-opacity 0.2s;
  }
  svg g text {
    font-size: 0.3em;
    fill: #ffffff;
    fill-opacity: 0.4;
    transition: fill-opacity 0.2s;
  }
  svg path {
    fill: none;
    stroke: hsl(60, 20%, 70%);
    stroke-width: 0.4em;
    stroke-opacity: 0.3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`
