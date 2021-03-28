import React from "react";

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
} from "../old";
import styled from "styled-components";

export class PatternSwapBoard extends React.Component {
  constructor(props) {
    super(props);
    const hexagons = GridGenerator.hexagon(2);

    // Set additional data for hexagons
    hexagons.forEach((hex) => {
      hex.pattern = "pattern1";
    });

    this.state = {
      hexagons,
    };
  }

  onClick(event, source) {
    // Get our hexagon data
    const { hexagons } = this.state;

    // Go through all of our hexagons and update patterns
    const hexas = hexagons.map((hex) => {
      // Switch pattern only for the hexagon that was clicked
      if (HexUtils.equals(source.state.hex, hex)) {
        // Assign new pattern to _our_ data
        hex.pattern =
          source.props.fill === "pattern1" ? "pattern2" : "pattern1";
      }

      return hex;
    });

    // Save our new hexagon data to the state, which will cause a re-render
    this.setState({ hexagons: hexas });
  }

  render() {
    let { hexagons } = this.state;
    return (
      <StyledPatternSwapBoard>
        <h2>Hexagon Pattern Swap</h2>
        <p>Click a tile to swap it's pattern</p>
        <HexGrid width={1200} height={800}>
          <Layout
            size={{ x: 10, y: 10 }}
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
                /* Here we pass the pattern which we want to display */
                fill={hex.pattern}
                /* onClick event gets back 2 properties: event and source (hexagon) */
                onClick={(e, h) => this.onClick(e, h)}
              >
                <Text>{HexUtils.getID(hex)}</Text>
              </Hexagon>
            ))}
            <Pattern id="pattern1" link="https://picsum.photos/200?image=80" />
            <Pattern id="pattern2" link="https://picsum.photos/200?image=82" />
          </Layout>
        </HexGrid>
      </StyledPatternSwapBoard>
    );
  }
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
`;
