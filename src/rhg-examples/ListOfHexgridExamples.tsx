import styled from "styled-components"
import { HexGrid, HexgridLayout, Hexagon, GridGenerator } from "../rhg"
import { CustomBoard } from "./CustomBoard"
// import { DragNDropBoard } from "./DragNDropBoard"
// import { PathfindingBoard } from "./PathfindingBoard"
// import { PatternSwapBoard } from "./PatternSwapBoard"
// import { TemplatesBoard } from "./TemplatesBoard"

export const ListOfHexgridExamples = () => {
  return (
    <div>
      <h1>BasicBoard</h1>
      <BasicBoard />

      <h1>CustomBoard</h1>
      <CustomBoard />

      {/* <h1>TemplatesBoard</h1>
      <TemplatesBoard /> */}

      {/* <h1>PatternSwapBoard</h1>
      <PatternSwapBoard /> */}

      {/* <h1>PathfindingBoard</h1>
      <PathfindingBoard /> */}

      {/* <h1>DragNDropBoard</h1>
      <p>This one needs a lotta love, does not work</p>
      <DragNDropBoard /> */}
    </div>
  )
}

const BasicBoard = () => {
  const hexagons = GridGenerator.parallelogram(-2, 3, -2, 1)
  return (
    <StyledBasicHexes>
      <HexGrid width={900} height={600}>
        <HexgridLayout size={{ x: 7, y: 7 }}>
          {hexagons.map((hex, i) => (
            <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} />
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
