import {
  MoveRange,
  OrderMarkers,
  PlayerOrderMarkers,
  PlayersState,
  SetupDataType,
} from "./types"

export const passAndPlaySetupData: SetupDataType = { passAndPlay: true }
export const multiplayerSetupData: SetupDataType = { passAndPlay: false }

export const MAX_PLAYERS = 6
export const OM_COUNT = 3

export const phaseNames = {
  placement: "placement",
  placeOrderMarkers: "placeOrderMarkers",
  roundOfPlay: "roundOfPlay",
}

export const stageNames = {
  placeOrderMarkers: "placeOrderMarkers",
  placingUnits: "placingUnits",
  attacking: "attacking",
}

const orders = ["0", "1", "2", "X"]

export function generateBlankOrderMarkers(): OrderMarkers {
  const blankOrderMarkers = orders.reduce((prev, curr) => {
    return [...prev, { gameCardID: "", order: "" }]
  }, [])
  return {
    "0": blankOrderMarkers,
    "1": blankOrderMarkers,
  }
}
export function generateBlankPlayersState(): PlayersState {
  return {
    "0": {
      orderMarkers: generateBlankPlayersOrderMarkers(),
    },
    "1": {
      orderMarkers: generateBlankPlayersOrderMarkers(),
    },
  }
}
export function generateBlankPlayersOrderMarkers(): PlayerOrderMarkers {
  return {
    "0": "",
    "1": "",
    "2": "",
    X: "",
  }
}

export function generateHexID(hex: {
  q: number | string
  r: number | string
  s: number | string
}) {
  return `${hex.q},${hex.r},${hex.s}`
}
export function generateBlankMoveRange(): MoveRange {
  return { safe: [], engage: [], disengage: [], denied: [] }
}
