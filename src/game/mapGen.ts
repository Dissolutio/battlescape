import { BoardHexes, GameUnits, GType_Map, HexMap, StartZones } from "./types"
import { generateHexagon } from "./hexGen"

type MapOptions = {
  gameUnits?: GameUnits
  mapSize?: number
  withPrePlacedUnits?: boolean
  // flat-top or pointy-top hexes
  flat?: boolean
}
export type GameMap = {
  boardHexes: BoardHexes
  startZones: StartZones
  hexMap: HexMap
  withPrePlacedUnits: boolean
}
export function makeHexagonShapedMap(mapOptions?: MapOptions): GType_Map {
  const { mapSize = 3, gameUnits, flat = false } = mapOptions
  let withPrePlacedUnits = mapOptions?.withPrePlacedUnits ?? false
  const isGameUnits = gameUnits && Object.keys(gameUnits)?.length
  // If no units, then we cannot pre-place them!
  if (!isGameUnits) {
    withPrePlacedUnits = false
  }
  const flatDimensions = {
    hexGridLayout: "flat",
    hexHeight: Math.round(Math.sqrt(3) * 100) / 100,
    hexWidth: 2,
  }
  const pointyDimensions = {
    hexGridLayout: "pointy",
    hexHeight: 2,
    hexWidth: Math.sqrt(3),
  }
  const mapDimensions = flat ? flatDimensions : pointyDimensions
  const hexMap = {
    ...mapDimensions,
    mapShape: "hexagon",
    mapSize,
  }
  const startZones: StartZones = startZonesNoUnits(
    generateHexagon(mapSize),
    mapSize
  )
  const devStartZones: StartZones = startZonesNoUnits(
    generateHexagon(mapSize),
    mapSize
  )
  const boardHexes: BoardHexes = generateHexagon(mapSize)
  let devBoardHexes: BoardHexes = startZonesWithUnits(
    generateHexagon(mapSize),
    devStartZones,
    gameUnits
  )
  return {
    boardHexes: withPrePlacedUnits ? devBoardHexes : boardHexes,
    startZones: withPrePlacedUnits ? devStartZones : startZones,
    hexMap,
    withPrePlacedUnits,
  }
}
function startZonesNoUnits(
  boardHexes: BoardHexes,
  mapSize: number
): StartZones {
  const boardHexesArr = Object.values(boardHexes)
  const P0StartZone = boardHexesArr
    .filter((hex) => hex.s >= Math.max(mapSize - 1, 1))
    .map((hex) => hex.id)
  const P1StartZone = boardHexesArr
    .filter((hex) => hex.s <= -1 * Math.max(mapSize - 1, 1))
    .map((hex) => hex.id)
  return {
    "0": P0StartZone,
    "1": P1StartZone,
  }
}
// ! this function mutates input 'zones'
function startZonesWithUnits(
  hexes: BoardHexes,
  zones: StartZones,
  gameUnits: GameUnits
): BoardHexes {
  const gameUnitsArr = Object.values(gameUnits)
  gameUnitsArr.forEach((unit) => {
    const { playerID } = unit
    let randomHexID: string
    if (playerID === "0") {
      randomHexID = zones[unit.playerID].pop()
    }
    if (playerID === "1") {
      randomHexID = zones[unit.playerID].pop()
    }
    // update boardHex
    hexes[randomHexID].occupyingUnitID = unit.unitID
  })
  return hexes
}
