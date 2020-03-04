import { GridGenerator } from 'react-hexgrid';

export const hexagonMap = GridGenerator.hexagon(2).reduce(fillHexInfo, {})

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
export const startZones = Object.values(hexagonMap).reduce((prev, curr, i, arr) => {
  if (curr.r === -2) {
    prev['0'][curr.id] = true
  }
  if (curr.r === 2) {
    prev['1'][curr.id] = true
  }
  return prev
}, { 0: {}, 1: {} })