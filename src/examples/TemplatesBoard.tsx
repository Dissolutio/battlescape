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
} from "react17-hexgrid"
import { templatesConfigurations } from "./templatesConfigurations"

export const TemplatesBoard = () => {
  const [generatorShape, setGeneratorShape] = React.useState("hexagon")
  const generator = GridGenerator[generatorShape]
  const config = templatesConfigurations[generatorShape]
  const { width, height, layout, origin, map, mapProps } = config
  const size = { x: layout.width, y: layout.height }
  const hexagons = generator(...mapProps)
  const handleChange = (e) => {
    setGeneratorShape(e.target.value)
  }

  return (
    <StyledTemplatesHexes>
      <h2>Select grid type and configuration from dropdown.</h2>
      <div>
        <strong>Template: </strong>
        <select onChange={handleChange}>
          {Object.keys(templatesConfigurations).map((shapeName) => (
            <option key={shapeName} value={shapeName}>
              {shapeName}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <Hexgrid width={width} height={height}>
        <HexgridLayout
          size={size}
          flat={layout.flat}
          spacing={layout.spacing}
          origin={origin}
        >
          {hexagons.map((hex, i) => (
            <Hexagon key={hex.id} hex={hex}>
              <Text>{HexUtils.getID(hex)}</Text>
            </Hexagon>
          ))}
        </HexgridLayout>
      </Hexgrid>
    </StyledTemplatesHexes>
  )
}

//     const config = templatesConfigurations["hexagon"]
//     // const generator = GridGenerator.getGenerator(config.map)
//     const generator = GridGenerator[config.map]
//     const hexagons = generator(config.mapProps)
//     this.state = { hexagons, config }
//   }

//     const { hexagons, config } = this.state
//     const layout = config.layout
//     const size = { x: layout.width, y: layout.height }

const StyledTemplatesHexes = styled.div`
  text-align: center;
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
    font-size: 0.2em;
    fill: #000;
    fill-opacity: 0.9;
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
