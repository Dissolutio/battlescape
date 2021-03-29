import React, { useState } from "react"
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

export const PathfindingBoard = () => {
  const initialPath = { start: null, end: null }
  const initialHexagons = GridGenerator.hexagon(4).map((h) => ({
    ...h,
    className: "",
  }))
  const [path, setPath] = useState(initialPath)
  const [hexagons, setHexagons] = useState(initialHexagons)

  const onClick = (event, sourceHex) => {
    let newPath = { ...path }
    if (path.start == null) {
      setPath((s) => ({ ...s, start: sourceHex }))
    } else {
      path.start = null
      path.end = null
      setPath(initialPath)
    }
  }

  const onMouseEnter = (event, sourceHex) => {
    setPath((s) => ({ ...s, end: sourceHex }))
    // Color some hexagons
    const coloredHexas = initialHexagons.map((hex) => {
      // Highlight tiles that are next to the target (1 distance away)
      hex.className = HexUtils.distance(sourceHex, hex) < 2 ? "active" : ""

      // If the tile is on same coordinate, add class specific to the coordinate name
      hex.className += sourceHex.q === hex.q ? " q " : ""
      hex.className += sourceHex.r === hex.r ? " r " : ""
      hex.className += sourceHex.s === hex.s ? " s " : ""
      return hex
    })
    setHexagons(coloredHexas)
  }

  return (
    <StyledHexesPathfinding>
      <h2>Pathfinding & active highlight</h2>
      <p>
        Click a tile to start drawing a path to your cursor. Click again to
        cancel.
      </p>
      <p>Hover around the board to see helper lines drawn.</p>
      <HexGrid width={1200} height={800}>
        <HexgridLayout
          size={{ x: 6, y: 6 }}
          flat={false}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          {hexagons.map((hex, i) => (
            <Hexagon
              key={i}
              hex={hex}
              className={hex.className}
              onMouseEnter={(e, h) => onMouseEnter(e, h)}
              onClick={(e, h) => onClick(e, h)}
            >
              <Text>{HexUtils.getID(hex)}</Text>
            </Hexagon>
          ))}
          <Path start={path.start} end={path.end} />
        </HexgridLayout>
      </HexGrid>
    </StyledHexesPathfinding>
  )
}
const StyledHexesPathfinding = styled.div`
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
