import { GridGenerator } from 'react-hexgrid';

export type BasicHex = {
  q: number
  r: number
  s: number
  toString?: () => string,
}
export interface FullHex extends BasicHex {
  id: string
  unitGameId: string
  altitude: number
}

export interface BoardHexes {
  [fullHexId: string]: FullHex;
}
export interface StartZones {
  [playerId: string]: FullHex[];
}

const basicHexes: BasicHex[] = GridGenerator.hexagon(3)
export const boardHexes: BoardHexes = basicHexes.reduce(fillHexInfo, {})

const hexArr = Object.values(boardHexes)
const P0StartZone = hexArr.filter(hex => hex.r >= 2)
const P1StartZone = hexArr.filter(hex => hex.r <= -2)

export const startZones = {
  '0': P0StartZone,
  '1': P1StartZone
}
export const playerColors = {
  0: 'rgb(1,162,82)',
  1: 'rgb(219,45,32)',
}
function fillHexInfo(prev: BoardHexes, curr: BasicHex) {
  const fullHex = {
    ...curr,
    id: curr.toString(),
    unitGameId: '',
    altitude: 1
  }
  return {
    ...prev,
    [fullHex.id]: fullHex
  }
}