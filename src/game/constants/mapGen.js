import { GridGenerator } from 'react-hexgrid';

export const hexagonMap = GridGenerator.hexagon(1).reduce(fillHexInfo, {})

function fillHexInfo(prev, curr, i, arr) {
  const fullHex = {
    ...curr,
    id: curr.toString(),
  }
  return {
    ...prev,
    [fullHex.id]: fullHex
  }
}