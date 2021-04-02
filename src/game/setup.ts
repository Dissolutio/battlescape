import { hexedMeadowCards } from './cards'
import {
  ArmyCard,
  BaseGameOptions,
  DevGameOptions,
  GameArmyCard,
  GameState,
  GameUnits,
  PlayersState,
} from './types'
import {
  generateBlankPlayersState,
  generateBlankOrderMarkers,
} from './constants'
import { makeHexagonShapedMap } from './mapGen'

function playersStateWithPrePlacedOMs(): PlayersState {
  return {
    '0': {
      orderMarkers: {
        '0': 'p0_hm101',
        '1': 'p0_hm101',
        '2': 'p0_hm101',
        X: 'p0_hm101',
      },
    },
    '1': {
      orderMarkers: {
        '0': 'p1_hm201',
        '1': 'p1_hm201',
        '2': 'p1_hm201',
        X: 'p1_hm201',
      },
    },
  }
}

function generateBaseGameState(devOptions?: BaseGameOptions) {
  const defaultDevOptions = {
    withPrePlacedUnits: false,
    placementReady: { '0': false, '1': false },
    orderMarkersReady: { '0': false, '1': false },
    roundOfPlayStartReady: { '0': false, '1': false },
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
export const hexagonMapScenario = makeHexagonMapScenario({
  placementReady: { '0': true, '1': true },
  orderMarkersReady: { '0': true, '1': true },
  roundOfPlayStartReady: { '0': true, '1': true },
  withPrePlacedUnits: true,
  players: playersStateWithPrePlacedOMs(),
})
function makeHexagonMapScenario(devOptions?: DevGameOptions): GameState {
  // GET CORE CARDS
  const hexedMeadowCardsArr: ArmyCard[] = Object.values(hexedMeadowCards)
  // MAKE CARDS TO GAMECARDS
  const armyCards: GameArmyCard[] = hexedMeadowCardsArr.map(fillGameCardInfo)
  // MAKE GAMECARDS TO GAMEUNITS
  // todo this could use some params, so some units can be pre-dead
  const gameUnits = armyCardsToGameUnits(armyCards)
  // MAKE MAP
  const hexagonMap = makeHexagonShapedMap({
    mapSize: 3,
    withPrePlacedUnits: true,
    gameUnits,
  })
  return {
    ...generateBaseGameState(devOptions),
    armyCards,
    gameUnits,
    hexMap: hexagonMap.hexMap,
    boardHexes: hexagonMap.boardHexes,
    startZones: hexagonMap.startZones,
  }
}

//!! TEST SCENARIO
export const testScenario = makeTestScenario({
  mapSize: 1,
  withPrePlacedUnits: false,
})
function makeTestScenario(devOptions?: DevGameOptions): GameState {
  const { withPrePlacedUnits, mapSize } = devOptions
  // GET CORE CARDS
  const hexedMeadowCardsArr: ArmyCard[] = Object.values(hexedMeadowCards)
  // MAKE CARDS TO GAMECARDS
  const armyCards: GameArmyCard[] = hexedMeadowCardsArr
    // filters for only hm101 and hm201 (3 figure common squads)
    .filter((c) => c.armyCardID.endsWith('01'))
    .map(fillGameCardInfo)

  // MAKE GAMECARDS TO GAMEUNITS
  const gameUnits = makeTestGameUnits()
  // MAKE MAP
  const hexagonMap = makeHexagonShapedMap({
    mapSize,
    withPrePlacedUnits,
    gameUnits: makeTestGameUnits(),
  })
  return {
    ...generateBaseGameState(),
    armyCards,
    gameUnits,
    hexMap: hexagonMap.hexMap,
    boardHexes: hexagonMap.boardHexes,
    startZones: hexagonMap.startZones,
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
      armyCardID: 'hm101',
      gameCardID: 'p0_hm101',
      playerID: '0',
      unitID: 'p0u0',
    },
    p0u1: {
      ...testGameUnitTemplate,
      armyCardID: 'hm101',
      gameCardID: 'p0_hm101',
      playerID: '0',
      unitID: 'p0u1',
    },
    p1u2: {
      ...testGameUnitTemplate,
      armyCardID: 'hm201',
      gameCardID: 'p1_hm201',
      playerID: '1',
      unitID: 'p1u2',
    },
    p1u3: {
      ...testGameUnitTemplate,
      armyCardID: 'hm201',
      gameCardID: 'p1_hm201',
      playerID: '1',
      unitID: 'p1u3',
    },
  }
}
//!! BOTH SCENARIOS: sorts cards bees'n'butterflies to players '0' and '1'
function fillGameCardInfo(card: GameArmyCard): GameArmyCard {
  const isCardABee = card.race === 'bee'
  const isCardAButterfly = card.race === 'butterfly'
  const playerID = isCardABee ? '0' : isCardAButterfly ? '1' : ''
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

//!! cards to units, but needs flexibility
export function armyCardsToGameUnits(cards: GameArmyCard[]): GameUnits {
  // id factory
  let unitID = 0
  function makeUnitID(playerID: string) {
    return `p${playerID}u${unitID++}`
  }
  return cards.reduce((result, card) => {
    // CARD => FIGURES
    const numFigures = card.figures * card.cardQuantity
    const figuresArr = Array.apply({}, Array(numFigures))
    // FIGURES => UNITS
    const unitsFromCard = figuresArr.reduce((unitsResult) => {
      const unitID = makeUnitID(card.playerID)
      const newGameUnit = {
        unitID,
        armyCardID: card.armyCardID,
        playerID: card.playerID,
        gameCardID: card.gameCardID,
        movePoints: 0,
        moveRange: { safe: [], engage: [], disengage: [], denied: [] },
      }
      return {
        ...unitsResult,
        [unitID]: newGameUnit,
      }
    }, {})
    return {
      ...result,
      ...unitsFromCard,
    }
  }, {})
}
