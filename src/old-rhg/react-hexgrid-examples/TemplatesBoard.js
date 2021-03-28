import React from "react"
import styled from "styled-components"

import {
  GridGenerator,
  HexGrid,
  HexUtils,
  Layout,
  Path,
  Pattern,
  Hexagon,
  Text,
  Hex,
} from "../old"
import { templatesConfigurations } from "./templatesConfigurations"

export class TemplatesBoard extends React.Component {
  constructor(props) {
    super(props)
    const config = templatesConfigurations["hexagon"]
    const generator = GridGenerator.getGenerator(config.map)
    // const generator = GridGenerator[config.map]
    const hexagons = generator.apply(this, config.mapProps)
    this.state = { hexagons, config }
  }

  changeType(event) {
    const name = event.currentTarget.value
    const config = templatesConfigurations[name]
    const generator = GridGenerator.getGenerator(config.map)
    // const generator = GridGenerator[config.map]
    const hexagons = generator.apply(this, config.mapProps)
    this.setState({ hexagons, config })
  }

  render() {
    const { hexagons, config } = this.state
    const layout = config.layout
    const size = { x: layout.width, y: layout.height }
    return (
      <StyledTemplatesHexes>
        <h2>Select grid type and configuration from dropdown.</h2>
        <div>
          <strong>Template: </strong>
          <select onChange={(ev) => this.changeType(ev)}>
            {Object.keys(templatesConfigurations).map((type) => (
              <option name={type}>{type}</option>
            ))}
          </select>
        </div>
        <hr />
        <HexGrid width={config.width} height={config.height}>
          <Layout
            size={size}
            flat={layout.flat}
            spacing={layout.spacing}
            origin={config.origin}
          >
            {
              // note: key must be unique between re-renders.
              // using config.mapProps+i makes a new key when the goal template chnages.
              hexagons.map((hex, i) => (
                <Hexagon
                  key={config.mapProps + i}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                >
                  <Text>{HexUtils.getID(hex)}</Text>
                </Hexagon>
              ))
            }
          </Layout>
        </HexGrid>
      </StyledTemplatesHexes>
    )
  }
}

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
