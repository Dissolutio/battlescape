import { GridGenerator } from 'react-hexgrid';
import { startingUnits, armyCardsInGame, IUnit } from './startingUnits'

export type BasicHex = {
  q: number
  r: number
  s: number
}
export interface IBoardHex extends BasicHex {
  id: string
  occupyingUnitID: string
  altitude: number
}

export interface IBoardHexes {
  [fullHexId: string]: IBoardHex;
}
export interface IStartZones {
  [playerId: string]: string[];
}

// HEXES MADE BY REACT-HEXGRID => Battlescape Map Hexes :)
export const mapSize: number = 5
const basicHexes: BasicHex[] = GridGenerator.hexagon(mapSize)
export const boardHexes: IBoardHexes = basicHexes.reduce(fillHexInfo, {})

// MAKE SOME STARTZONES FOR 2 PLAYERS ON A SIMPLE MAP
const boardHexesArr = Object.values(boardHexes)
const P0StartHexesArr = boardHexesArr.filter(hex => hex.r >= 3)
const P1StartHexesArr = boardHexesArr.filter(hex => hex.r <= -3)
const P0StartZone: string[] = P0StartHexesArr.map(hex => hex.id)
const P1StartZone: string[] = P1StartHexesArr.map(hex => hex.id)
export const startZones: IStartZones = {
  '0': P0StartZone,
  '1': P1StartZone
}

export const boardHexesWithPrePlacedUnits = () => {
  const allUnits = Object.values(startingUnits)
  let boardHexesCopy = { ...boardHexes }
  let startZonesCopy = {
    '0': [...startZones['0']],
    '1': [...startZones['1']]
  }

  allUnits.forEach((unit: IUnit) => {
    // Pick random-ish hex from valid start zone for unit
    const { playerID } = unit
    let randomHex

    // But splitting 2 players with pop & shift looks nice and symmetrical on this map :)
    if (playerID === '0') {
      randomHex = startZonesCopy[unit.playerID].pop()
    }
    if (playerID === '1') {
      randomHex = startZonesCopy[unit.playerID].shift()
    }

    // Assign the occupying unit's ID on the boardHex
    boardHexesCopy[randomHex].occupyingUnitID = unit.unitID
  })
  return boardHexesCopy
}


export const playerColors = {
  0: 'rgb(3, 64, 120)', // blue #034078
  1: 'rgb(219,45,32)', // red #db2d20
}

function fillHexInfo(prev: IBoardHexes, curr: BasicHex) {
  const fullHex = {
    ...curr,
    id: `q${curr.q}r${curr.r}s${curr.s}`,
    occupyingUnitID: '',
    altitude: 1,
  }
  return {
    ...prev,
    [fullHex.id]: fullHex
  }
}