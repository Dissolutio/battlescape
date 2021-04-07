import React from "react"
import styled from "styled-components"

import {
  GridGenerator,
  Hexgrid,
  HexUtils,
  HexgridLayout,
  Path,
  Pattern,
  Hexagon,
  Text,
  Hex,
} from "./react17-hexgrid"

const initialHexes = GridGenerator.hexagon(2).map((hex) => {
  // Set additional data for hexagons
  return {
    ...hex,
    pattern: "pattern1",
  }
})

export const PatternSwapBoard = () => {
  const [hexes, setHexes] = React.useState(initialHexes)

  const handleHexClick = (e, clickedHex) => {
    const newHexes = hexes.map((hex) => {
      if (HexUtils.equals(clickedHex, hex)) {
        hex.pattern =
          clickedHex.pattern === "pattern1" ? "pattern2" : "pattern1"
      }
      return hex
    })
    setHexes(newHexes)
  }

  return (
    <StyledPatternSwapBoard>
      <h2>Hexagon Pattern Swap</h2>
      <p>Click a tile to swap it's pattern</p>
      <Hexgrid width={1200} height={800}>
        <HexgridLayout
          size={{ x: 10, y: 10 }}
          flat={false}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          {hexes.map((hex, i) => (
            <Hexagon
              hex={hex}
              key={i}
              // q={hex.q}
              // r={hex.r}
              // s={hex.s}
              /* Here we pass the pattern which we want to display */
              fill={hex.pattern}
              /* onClick event gets back 2 properties: event and source (hexagon) */
              onClick={(e) => handleHexClick(e, hex)}
            >
              <Text>{HexUtils.getID(hex)}</Text>
            </Hexagon>
          ))}
          <Pattern id="pattern1" link="https://picsum.photos/200?image=80" />
          <Pattern id="pattern2" link="https://picsum.photos/200?image=82" />
        </HexgridLayout>
      </Hexgrid>
    </StyledPatternSwapBoard>
  )
}

const StyledPatternSwapBoard = styled.div`
  svg g {
    fill: #4499a9;
    fill-opacity: 0.6;
  }
  svg g:hover {
    fill: #7be3f6;
    fill-opacity: 0.7;
  }
  svg g:hover text {
    fill-opacity: 1;
  }
  svg g.q .hexagon {
    fill: Red;
    fill-opacity: 0.4;
  }
  svg g.r .hexagon {
    fill: Green;
    fill-opacity: 0.4;
  }
  svg g.s .hexagon {
    fill: Blue;
    fill-opacity: 0.4;
  }
  svg g.active .hexagon {
    fill: Coral;
    fill-opacity: 0.9;
  }
  svg g polygon {
    stroke: #7be3f6;
    stroke-width: 0.2;
    transition: fill-opacity 0.5s;
  }
  svg g text {
    font-size: 0.17em;
    fill: white;
    fill-opacity: 0.7;
    transition: fill-opacity 0.5s;
  }
  svg path {
    fill: none;
    stroke: #03090a;
    stroke-width: 0.2em;
    stroke-opacity: 0.9;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`
