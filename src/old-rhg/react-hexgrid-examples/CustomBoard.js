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

export const CustomBoard = () => {
  const hexagonSize = { x: 10, y: 10 };
  const moreHexas = GridGenerator.parallelogram(-2, 2, -2, 2);
  return (
    <StyledHexesCustom>
      <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
        {/* Main grid with bit hexagons, all manual */}
        <Layout
          size={hexagonSize}
          flat={true}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          <Hexagon q={0} r={0} s={0} />
          {/* Using pattern (defined below) to fill the hexagon */}
          <Hexagon q={0} r={-1} s={1} fill="pat-1" />
          <Hexagon q={0} r={1} s={-1} />
          <Hexagon q={1} r={-1} s={0}>
            <Text>1, -1, 0</Text>
          </Hexagon>
          <Hexagon q={1} r={0} s={-1}>
            <Text>1, 0, -1</Text>
          </Hexagon>
          {/* Pattern and text */}
          <Hexagon q={-1} r={1} s={0} fill="pat-2">
            <Text>-1, 1, 0</Text>
          </Hexagon>
          <Hexagon q={-1} r={0} s={1} />
          <Hexagon q={-2} r={0} s={1} />
          <Path start={new Hex(0, 0, 0)} end={new Hex(-2, 0, 1)} />
        </Layout>
        {/* Additional small grid, hexagons generated with generator */}
        <Layout size={{ x: 2, y: 2 }} origin={{ x: 50, y: -30 }}>
          {moreHexas.map((hex, i) => (
            <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} />
          ))}
        </Layout>
        {/* You can define multiple patterns and switch between them with "fill" prop on Hexagon */}
        <Pattern
          id="pat-1"
          link="http://lorempixel.com/400/400/cats/1/"
          size={hexagonSize}
        />
        <Pattern
          id="pat-2"
          link="http://lorempixel.com/400/400/cats/2/"
          size={hexagonSize}
        />
        <g>
          <circle cx="50" cy="0" r="10" />
          <circle cx="50" cy="10" r="8" />
          <circle cx="45" cy="20" r="6" />
        </g>
      </HexGrid>
    </StyledHexesCustom>
  );
};

export const StyledHexesCustom = styled.div`
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

  svg g polygon {
    stroke: #7be3f6;
    stroke-width: 0.2;
    transition: fill-opacity 0.5s;
  }
  svg g text {
    font-size: 0.22em;
    fill: white;
    fill-opacity: 0.7;
    transition: fill-opacity 0.5s;
  }
  svg path {
    fill: none;
    stroke: #7be3f6;
    stroke-width: 0.2em;
    stroke-opacity: 0.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;
