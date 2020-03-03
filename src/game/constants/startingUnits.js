import {
  marroWarriors,
  neGokSa,
  kravMagaAgents,
  agentCarr
} from './hsSelectors'
import { hexagonMap } from './mapGen'

export const armyCardsInGame =
{
  'hs1000': {
    ...marroWarriors,
    cardQuantity: 1,
    playerId: '0',
  },
  'hs1014': {
    ...neGokSa,
    cardQuantity: 1,
    playerId: '0',
  },
  'hs1007': {
    ...agentCarr,
    cardQuantity: 1,
    playerId: '1',
  },
  'hs1005': {
    ...kravMagaAgents,
    cardQuantity: 1,
    playerId: '1',
  },
}
// ID FACTORY
let unitUUID = 0
const unitGameId = (playerId) => `player${playerId}-unit${unitUUID++}`

// export const startingUnits = convertCardsToStartingUnits(armyCardsInGame)


export function convertCardsToStartingUnits(armyCardsInGame, hexMap = hexagonMap) {
  const allCards = Object.values(armyCardsInGame)
  let possibleStartingPositions = Object.values(hexMap).map(fullHex => {
    const { q, r, s } = fullHex
    return {
      q, r, s
    }
  })
  const startingUnits = allCards

    // CARDS TO FIGURES
    .reduce((result, currentCard) => {
      const figuresArr = Array.apply(null, Array(currentCard.figures * currentCard.cardQuantity))
      const unitsFromCurrentCard = figuresArr

        // FIGURES TO GAME UNITS
        .reduce((unitsResult, figure, i, arr) => {
          const gameId = unitGameId(currentCard.playerId)
          const numberOfHexesArr = Array.apply(null, Array(currentCard.hexes))
          const coords = numberOfHexesArr.map(hex => possibleStartingPositions.pop())
          return {
            ...unitsResult,
            [`${gameId}`]: {
              gameId,
              hsCardId: currentCard.id,
              // unit COORDS should live on the map
              coords: coords,
              playerId: `${currentCard.playerId}`,
            }
          }
        }, {})
      return {
        ...result,
        ...unitsFromCurrentCard
      }
    }, {})
  return startingUnits
}


function cardsToFigs(prev, curr, i, arr) {
  // CARDS TO FIGURES
  const numFigures = curr.figures * curr.cardQuantity
  const figuresArr = Array.apply(null, Array(numFigures))
  // FIGURES TO GAME UNITS
  const newUnits = figuresArr.reduce(figsToUnits, {})
  return {
    ...prev,
    ...newUnits
  }
}
function figsToUnits(prev, curr, i, arr) {
  const gameId = unitGameId()
  return {
    ...prev,
    [unitGameId]: {
      gameId,
    }
  }
}