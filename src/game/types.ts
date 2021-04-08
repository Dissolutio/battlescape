export type SetupDataType = {
  passAndPlay: boolean
}
export type GType_Base = {
  playerInfos: { [playerID: string]: PlayerInfo }
  placementReady: PlayerStateToggle
  orderMarkersReady: PlayerStateToggle
  roundOfPlayStartReady: PlayerStateToggle
  currentRound: number
  currentOrderMarker: number
  orderMarkers: OrderMarkers
  initiative: string[]
  unitsMoved: string[]
  unitsAttacked: string[]
  players: PlayersState
}
export type GType_Map = {
  boardHexes: BoardHexes
  startZones: StartZones
  withPrePlacedUnits: boolean
  hexMap: HexMap
}
export type GType_Armies = {
  armyCards: GameArmyCard[]
  gameUnits: GameUnits
}
export type GType = SetupDataType &
  GType_Base &
  GType_Map &
  GType_Armies & {
    numPlayers: number
  }
// for secret state
// PlayersState keys are playerIDS, players only see their slice of it at G.players
export type PlayersState = {
  [playerID: string]: {
    orderMarkers: PlayerOrderMarkers
  }
}
export type HexMap = {
  mapShape: string
  mapSize: number
  hexGridLayout: string
  hexHeight: number
  hexWidth: number
}
export type BoardHex = {
  id: string
  q: number
  r: number
  s: number
  occupyingUnitID: string
  altitude: number
}
export type BoardHexes = {
  [key: string]: BoardHex
}
export type StartZones = {
  [key: string]: string[]
}
export type ArmyCard = {
  name: string
  armyCardID: string
  race: string
  life: number
  move: number
  range: number
  attack: number
  defense: number
  points: number
  figures: number
  hexes: number
}

export type GameArmyCard = ArmyCard & {
  playerID: string
  gameCardID: string
  cardQuantity: number
}

export type GameUnit = {
  unitID: string
  playerID: string
  gameCardID: string
  armyCardID: string
  movePoints: number
  moveRange: MoveRange
}

export type GameUnits = {
  [unitID: string]: GameUnit
}

export type PlayerStateToggle = {
  [playerID: string]: boolean
}

export type MoveRange = {
  safe: string[]
  engage: string[]
  disengage: string[]
  denied: string[]
}
export type PlayerOrderMarkers = { [order: string]: string }

export type OrderMarker = {
  gameCardID: string
  order: string
}

export type OrderMarkers = {
  [playerID: string]: OrderMarker[]
}

export type GType_BaseOpts = Partial<GType_Base> | undefined

export type G_SetupOpts = GType_BaseOpts &
  Partial<GType_Map> & {
    withPrePlacedUnits?: boolean
  }

export type PlayerInfo = {
  chosenName: string
  readyToStart: boolean
}
