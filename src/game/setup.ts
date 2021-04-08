import { hexedMeadowCards } from "./cards"
import {
  ArmyCard,
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

//!! HEXAGON MAP SCENARIO
export const hexagonMapScenario = makeHexagonMapScenario()
function makeHexagonMapScenario(devOptions?: G_SetupOpts): GType {
  // Use initial cards / units
  const { gameUnits, armyCards } = initialArmies
  // MAKE MAP
  const hexagonMap = makeHexagonShapedMap({
    gameUnits,
    mapSize: 3,
    withPrePlacedUnits: true,
  })
  return {
    ...generateGType_Base(devOptions),
    gameUnits,
    armyCards,
    hexMap: hexagonMap.hexMap,
    boardHexes: hexagonMap.boardHexes,
    startZones: hexagonMap.startZones,
    // local match needs default passAndPlay to be true
    passAndPlay: true,
    numPlayers: MAX_PLAYERS,
  }
}

//!! TEST SCENARIO
export const testScenario = makeTestScenario({
  withPrePlacedUnits: false,
})
function makeTestScenario(devOptions?: G_SetupOpts): Partial<GType> {
  const { withPrePlacedUnits } = devOptions
  // GET CORE CARDS
  const hexedMeadowCardsArr: ArmyCard[] = Object.values(hexedMeadowCards)
  // MAKE CARDS TO GAMECARDS
  const armyCards: GameArmyCard[] = hexedMeadowCardsArr
    // filters for only hm101 and hm201 (3 figure common squads)
    .filter((c) => c.armyCardID.endsWith("01"))
    .map(fillGameCardInfo)

  // MAKE GAMECARDS TO GAMEUNITS
  const gameUnits = makeTestGameUnits()
  // MAKE MAP
  const hexagonMap = makeHexagonShapedMap({
    mapSize: 1,
    withPrePlacedUnits,
    gameUnits: makeTestGameUnits(),
  })
  return {
    ...generateGType_Base(devOptions),
    armyCards,
    gameUnits,
    hexMap: hexagonMap.hexMap,
    boardHexes: hexagonMap.boardHexes,
    startZones: hexagonMap.startZones,
    // local match needs default passAndPlay to be true
    passAndPlay: true,
    numPlayers: MAX_PLAYERS,
  }
}
//! TEST SCENARIO GAMEUNITS
function makeTestGameUnits() {
  const testGameUnitTemplate = {
    movePoints: 0,
    moveRange: {
      safe: [],
      engage: [],
      disengage: [],
      denied: [],
    },
  }
  return {
    p0u0: {
      ...testGameUnitTemplate,
      armyCardID: "hm101",
      gameCardID: "p0_hm101",
      playerID: "0",
      unitID: "p0u0",
    },
    p0u1: {
      ...testGameUnitTemplate,
      armyCardID: "hm101",
      gameCardID: "p0_hm101",
      playerID: "0",
      unitID: "p0u1",
    },
    p1u2: {
      ...testGameUnitTemplate,
      armyCardID: "hm201",
      gameCardID: "p1_hm201",
      playerID: "1",
      unitID: "p1u2",
    },
    p1u3: {
      ...testGameUnitTemplate,
      armyCardID: "hm201",
      gameCardID: "p1_hm201",
      playerID: "1",
      unitID: "p1u3",
    },
  }
}
//!! BOTH SCENARIOS: sorts cards bees'n'butterflies to players '0' and '1'
function fillGameCardInfo(card: GameArmyCard): GameArmyCard {
  const isCardABee = card.race === "bee"
  const isCardAButterfly = card.race === "butterfly"
  const playerID = isCardABee ? "0" : isCardAButterfly ? "1" : ""
  // id factory ...
  function makeGameCardID() {
    return `p${playerID}_${card.armyCardID}`
  }
  return {
    ...card,
    playerID,
    cardQuantity: 1,
    gameCardID: makeGameCardID(),
  }
}
