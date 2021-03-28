import React from "react";
import styled from "styled-components";
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

export const DragNDropBoard = () => {
  return (
    <StyledDragNDrop>
      <HexGrid width={1600} height={1000} viewBox="-50 -50 100 100">
        <GameLayout />
        <TilesLayout />
      </HexGrid>
    </StyledDragNDrop>
  );
};

class GameLayout extends React.Component {
  constructor(props) {
    super(props);
    const hexagons = GridGenerator.hexagon(2);
    // Add custom prop to couple of hexagons to indicate them being blocked
    hexagons[0].blocked = true;
    hexagons[1].blocked = true;
    this.state = { hexagons };
  }

  // onDrop you can read information of the hexagon that initiated the drag
  onDrop(event, source, targetProps) {
    const { hexagons } = this.state;
    const hexas = hexagons.map((hex) => {
      // When hexagon is dropped on this hexagon, copy it's image and text
      if (HexUtils.equals(source.state.hex, hex)) {
        hex.image = targetProps.data.image;
        hex.text = targetProps.data.text;
      }
      return hex;
    });
    this.setState({ hexagons: hexas });
  }

  onDragStart(event, source) {
    // If this tile is empty, let's disallow drag
    if (!source.props.data.text) {
      event.preventDefault();
    }
  }

  // Decide here if you want to allow drop to this node
  onDragOver(event, source) {
    // Find blocked hexagons by their 'blocked' attribute
    const blockedHexas = this.state.hexagons.filter((h) => h.blocked);
    // Find if this hexagon is listed in blocked ones
    const blocked = blockedHexas.find((blockedHex) => {
      return HexUtils.equals(source.state.hex, blockedHex);
    });

    const { text } = source.props.data;
    // Allow drop, if not blocked and there's no content already
    if (!blocked && !text) {
      // Call preventDefault if you want to allow drop
      event.preventDefault();
    }
  }

  // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
  onDragEnd(event, source, success) {
    if (!success) {
      return;
    }
    // TODO Drop the whole hex from array, currently somethings wrong with the patterns

    const { hexagons } = this.state;
    // When hexagon is successfully dropped, empty it's text and image
    const hexas = hexagons.map((hex) => {
      if (HexUtils.equals(source.state.hex, hex)) {
        hex.text = null;
        hex.image = null;
      }
      return hex;
    });
    this.setState({ hexagons: hexas });
  }

  render() {
    let { hexagons } = this.state;
    return (
      <Layout
        className="game"
        size={{ x: 10, y: 10 }}
        flat={true}
        spacing={1.08}
        origin={{ x: -30, y: 0 }}
      >
        {hexagons.map((hex, i) => (
          <Hexagon
            key={i}
            q={hex.q}
            r={hex.r}
            s={hex.s}
            className={hex.blocked ? "blocked" : null}
            fill={hex.image ? HexUtils.getID(hex) : null}
            data={hex}
            onDragStart={(e, h) => this.onDragStart(e, h)}
            onDragEnd={(e, h, s) => this.onDragEnd(e, h, s)}
            onDrop={(e, h, t) => this.onDrop(e, h, t)}
            onDragOver={(e, h) => this.onDragOver(e, h)}
          >
            <Text>{hex.text || HexUtils.getID(hex)}</Text>
            {hex.image && <Pattern id={HexUtils.getID(hex)} link={hex.image} />}
          </Hexagon>
        ))}
      </Layout>
    );
  }
}

const StyledDragNDrop = styled.div`
  svg .game {
    g.blocked {
      fill: #465880;
    }
    g.blocked:hover {
      fill: #53699a;
    }
  }
  svg .game,
  svg .tiles {
    g {
      fill: #4499a9;
      fill-opacity: 0.6;
    }
    g:hover {
      fill: #7be3f6;
      fill-opacity: 0.7;
    }
    g:hover text {
      fill-opacity: 1;
    }

    g polygon {
      stroke: #7be3f6;
      stroke-width: 0.2;
      transition: fill-opacity 0.5s;
    }
    g text {
      font-size: 0.22em;
      fill: white;
      fill-opacity: 0.7;
      transition: fill-opacity 0.5s;
    }
    path {
      fill: none;
      stroke: #7be3f6;
      stroke-width: 0.2em;
      stroke-opacity: 0.7;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }
`;

class TilesLayout extends React.Component {
  constructor(props) {
    super(props);
    // Initialize hexagons with some text and image
    const imageSrc = `http://placekitten.com/100/100`;
    const hexagons = GridGenerator.parallelogram(-1, 1, -1, 2).map(
      (hexagon, index) => {
        return Object.assign({}, hexagon, {
          text: `Cat #${index}`,
          image: imageSrc,
        });
      }
    );
    this.state = { hexagons };
  }

  onDragStart(event, source) {
    // Could do something on onDragStart as well, if you wish
  }

  // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
  onDragEnd(event, source, success) {
    if (!success) {
      return;
    }
    const { hexagons } = this.state;
    // TODO Drop the whole hex from array, currently somethings wrong with the patterns
    // const hexas = hexagons.filter(hex => !HexUtils.equals(targetHex, hex));
    const hexas = hexagons.map((hex) => {
      if (HexUtils.equals(source.state.hex, hex)) {
        hex.text = null;
        hex.image = null;
      }
      return hex;
    });
    this.setState({ hexagons: hexas });
  }

  render() {
    const { hexagons } = this.state;
    return (
      <Layout
        className="tiles"
        size={{ x: 8, y: 8 }}
        flat={false}
        spacing={1.01}
        origin={{ x: 40, y: -20 }}
      >
        {hexagons.map((hex, i) => (
          <Hexagon
            key={i}
            q={hex.q}
            r={hex.r}
            s={hex.s}
            fill={hex.image ? HexUtils.getID(hex) : null}
            data={hex}
            onDragStart={(e, h) => this.onDragStart(e, h)}
            onDragEnd={(e, h, s) => this.onDragEnd(e, h, s)}
          >
            <Text>{hex.text}</Text>
            {!!hex.image && (
              <Pattern id={HexUtils.getID(hex)} link={hex.image} />
            )}
          </Hexagon>
        ))}
      </Layout>
    );
  }
}
