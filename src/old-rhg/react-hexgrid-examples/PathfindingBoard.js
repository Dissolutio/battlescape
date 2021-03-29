import React from "react"
import styled from "styled-components"
import {
  GridGenerator,
  Hexgrid,
  HexUtils,
  Layout,
  Path,
  Pattern,
  Hexagon,
  Text,
  Hex,
} from "../old"

export class PathfindingBoard extends React.Component {
  constructor(props) {
    super(props)
    const hexagons = GridGenerator.hexagon(4)
    this.state = {
      hexagons,
      path: { start: null, end: null },
    }
  }
  onClick(event, source) {
    const { path } = this.state
    if (path.start == null) {
      path.start = source.state.hex
    } else {
      path.start = null
      path.end = null
    }
    this.setState({ path })
  }

  onMouseEnter(event, source) {
    // Set the path's end on hover
    const { path, hexagons } = this.state
    const targetHex = source.state.hex
    path.end = targetHex

    // Color some hexagons
    const coloredHexas = hexagons.map((hex) => {
      hex.props = hex.props || {}
      // Highlight tiles that are next to the target (1 distance away)
      hex.props.className =
        HexUtils.distance(targetHex, hex) < 2 ? "active" : ""

      // If the tile is on same coordinate, add class specific to the coordinate name
      hex.props.className += targetHex.q === hex.q ? " q " : ""
      hex.props.className += targetHex.r === hex.r ? " r " : ""
      hex.props.className += targetHex.s === hex.s ? " s " : ""

      return hex
    })

    this.setState({ path, hexagons: coloredHexas })
  }

  render() {
    let { hexagons, path } = this.state
    return (
      <StyledHexesPathfinding>
        <h2>Pathfinding & active highlight</h2>
        <p>
          Click a tile to start drawing a path to your cursor. Click again to
          cancel.
        </p>
        <p>Hover around the board to see helper lines drawn.</p>
        <Hexgrid width={1200} height={800}>
          <Layout
            size={{ x: 6, y: 6 }}
            flat={false}
            spacing={1.1}
            origin={{ x: 0, y: 0 }}
          >
            {hexagons.map((hex, i) => (
              <Hexagon
                key={i}
                q={hex.q}
                r={hex.r}
                s={hex.s}
                className={hex.props ? hex.props.className : null}
                onMouseEnter={(e, h) => this.onMouseEnter(e, h)}
                onClick={(e, h) => this.onClick(e, h)}
              >
                <Text>{HexUtils.getID(hex)}</Text>
              </Hexagon>
            ))}
            <Path start={path.start} end={path.end} />
          </Layout>
        </Hexgrid>
      </StyledHexesPathfinding>
    )
  }
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
