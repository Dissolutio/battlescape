import { GridGenerator } from 'react-hexgrid';

export const hexagonMap = GridGenerator.hexagon(1).reduce(fillHexInfo, {})

function fillHexInfo(prev, curr, i, arr) {
  const fullHex = {
    // unchanging as a reference
    q: curr.q,
    r: curr.r,
    s: curr.s,
    id: curr.toString(),
    // mab building
    // surfaceTerrain: 'grass',
    // altitude: 1,
  }
  return {
    ...prev,
    [fullHex.id]: fullHex
  }
}