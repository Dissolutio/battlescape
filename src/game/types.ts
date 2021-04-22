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
  mapShape: string;
  mapSize: number;
  mapLength: number;
  mapWidth: number;
  flat: boolean;
  hexHeight: number;
  hexWidth: number;
  hexSize: number;
};
export type BoardHex = {
  id: string
  q: number
  r: number
  s: number
  occupyingUnitID: string
  altitude: number
  startzonePlayerIDs: string[]
  terrain: HexTerrain | string;
}
export enum HexTerrain {
  void = "void",
  water = "water",
  grass = "grass",
  sand = "sand",
  rock = "rock",
}
export type BoardHexes = {
  [hexID: string]: BoardHex
}
export interface ICoreHeroscapeCard {
  name: string
  cardID: string
  image: string
  portraitPattern: string
  general:
    | 'jandar'
    | 'utgar'
    | 'ullar'
    | 'vydar'
    | 'einar'
    | 'aquilla'
    | 'valkrill'
  race: string
  type:
    | 'unique squad'
    | 'unique hero'
    | 'common squad'
    | 'common hero'
    | 'uncommon hero'
  cardClass: string
  personality: string
  size: 'small' | 'medium' | 'large' | 'huge'
  height: number
  life: number
  move: number
  range: number
  attack: number
  defense: number
  points: number
  figures: number
  hexes: 1 | 2 | 6
  setWave:
    | `Master Set: Rise of the Valkyrie`
    | `Wave 1: Malliddon's Prophecy`
    | `Wave 2: Utgar's Rage`
    | `Wave 3: Jandar's Oath`
    | `Wave 4: Zanafor's Discovery`
    | `Giant Wave 1: Orm's Return`
    | `Giant Wave 2: Raknar's Vision`
    | `Giant Wave 3: Aquilla's Alliance`
    | `Master Set: Swarm of the Marro`
    | `Master Set: Battle for the Underdark`
    | `Wave 5: Thora's Vengeance`
    | `Wave 6: Dawn of Darkness`
    | `Wave 7: Fields of Valor`
    | `Wave 8: Defenders of Kinsland`
    | `Wave 9: Blackmoon Siege`
    | `Wave 10: Valkrill's Gambit`
    | `Wave 11: Champions of the Forgotten Realms`
    | `Wave 12: Warriors of Eberron`
    | `Wave 13: Moltenclaw's Invasion`
    | `Terrain Set 1: Road to the Forgotten Forest`
    | `Terrain Set 2: Volcarren Wasteland`
    | `Terrain Set 3: Thaelenk Tundra`
    | `Terrain Set 4: Ticalla Jungle`
    | `Special Release`
    | `Special Release: Crest of the Valkyrie`
  abilities?: CardAbility[]
}
export type CardAbility = {
  name: string
  desc: string
}

export type GameArmyCard = ICoreHeroscapeCard & {
  playerID: string
  gameCardID: string
  cardQuantity: number
}

export type GameUnit = {
  unitID: string
  playerID: string
  gameCardID: string
  cardID: string
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
  playerName: string
  readyToStart: boolean
}
