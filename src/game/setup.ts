import { hexedMeadowCards } from "./cards"
import {
  GType_BaseOpts,
  G_SetupOpts,
  GameArmyCard,
  GType,
  PlayersState,
} from "./types"
import {
  generateBlankPlayersState,
  generateBlankOrderMarkers,
  MAX_PLAYERS,
} from "./constants"
import { makeHexagonShapedMap } from "./mapGen"
import { initialArmies } from "./armyGen"
import giantsTableMap from '../assets/giantsTable.json'

const prePlacedPlayersState: PlayersState = {
  "0": {
    orderMarkers: {
      "0": "p0_hm101",
      "1": "p0_hm101",
      "2": "p0_hm101",
      X: "p0_hm101",
    },
  },
  "1": {
    orderMarkers: {
      "0": "p1_hm201",
      "1": "p1_hm201",
      "2": "p1_hm201",
      X: "p1_hm201",
    },
  },
}

function generateGType_Base(devOptions?: GType_BaseOpts) {
  const defaultDevOptions = {
    playerInfos: {},
    withPrePlacedUnits: false,
    placementReady: { "0": false, "1": false },
    orderMarkersReady: { "0": false, "1": false },
    roundOfPlayStartReady: { "0": false, "1": false },
    currentRound: 0,
    currentOrderMarker: 0,
    orderMarkers: generateBlankOrderMarkers(),
    initiative: [],
    unitsMoved: [],
    unitsAttacked: [],
    players: generateBlankPlayersState(),
  }
  return {
    ...defaultDevOptions,
    ...devOptions,
  }
}

// !! GIANTS TABLE SCENARIO
export const giantsTableScenario = makeGiantsTableScenario()

function makeGiantsTableScenario(devOptions?: G_SetupOpts): GType {
  // Use initial cards / units
  const { gameUnits, armyCards } = initialArmies
  const boardHexes = giantsTableMap.boardHexes 
  // MAKE MAP
  return {
    ...generateGType_Base(devOptions),
    gameUnits,
    armyCards,
    hexMap: giantsTableMap.hexMap,
    boardHexes,
    // local match needs default passAndPlay to be true
    passAndPlay: true,
    numPlayers: MAX_PLAYERS,
  }
}



//!! HEXAGON MAP SCENARIO
export const hexagonMapScenario = makeHexagonMapScenario()

function makeHexagonMapScenario(devOptions?: G_SetupOpts): GType {
  // Use initial cards / units
  const { gameUnits, armyCards } = initialArmies
  // MAKE MAP
  const hexagonMap = makeHexagonShapedMap({
    mapSize: 3,
  })
  return {
    ...generateGType_Base(devOptions),
    gameUnits,
    armyCards,
    hexMap: hexagonMap.hexMap,
    boardHexes: hexagonMap.boardHexes,
    // local match needs default passAndPlay to be true
    passAndPlay: true,
    numPlayers: MAX_PLAYERS,
  }
}
