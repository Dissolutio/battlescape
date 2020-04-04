import { GridGenerator } from 'react-hexgrid';

export type BasicHex = {
  q: number
  r: number
  s: number
  toString?: () => string,
}
export interface IBoardHex extends BasicHex {
  id: string
  unitGameId: string
  altitude: number
}

export interface IBoardHexes {
  [fullHexId: string]: IBoardHex;
}
export interface IStartZones {
  [playerId: string]: string[];
}
// CONTROLS -- MAP
const mapDiameter = 3
const startZoneDistanceFromCenter = 2
// HEXES MADE BY REACT-HEXGRID => Battlescape Map Hexes :)
const basicHexes: BasicHex[] = GridGenerator.hexagon(mapDiameter)
export const boardHexes: IBoardHexes = basicHexes.reduce(fillHexInfo, {})

// MAKE SOME STARTZONES FOR 2 PLAYERS ON A SIMPLE MAP
const boardHexesArr = Object.values(boardHexes)
const P0StartZone: string[] = boardHexesArr.filter(hex => hex.r >= startZoneDistanceFromCenter).map(hex => hex.id)
const P1StartZone: string[] = boardHexesArr.filter(hex => hex.r <= -startZoneDistanceFromCenter).map(hex => hex.id)
export const startZones: IStartZones = {
  '0': P0StartZone,
  '1': P1StartZone
}

export const playerColors = {
  0: 'rgb(200, 200, 198)', // blue #C8C8C6
  1: 'rgb(219,45,32)', // red #db2d20
}
function fillHexInfo(prev: IBoardHexes, curr: BasicHex) {
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