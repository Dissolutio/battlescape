import {
  marroWarriors,
  neGokSa,
  kravMagaAgents,
  agentCarr,
  mimring
} from './hsSelectors'
import { hexagonMap } from './mapGen'

export const armyCardsInGame =
{
  [neGokSa.id]: {
    ...neGokSa,
    cardQuantity: 1,
    playerId: '0',
  },
  [mimring.id]: {
    ...mimring,
    cardQuantity: 1,
    playerId: '0',
  },
  [marroWarriors.id]: {
    ...marroWarriors,
    cardQuantity: 1,
    playerId: '0',
  },
  [agentCarr.id]: {
    ...agentCarr,
    cardQuantity: 1,
    playerId: '1',
  },
  [kravMagaAgents.id]: {
    ...kravMagaAgents,
    cardQuantity: 1,
    playerId: '1',
  },
}
let unitUUID = 0
export const startingUnits = convertCardsToStartingUnits(armyCardsInGame)
// ID FACTORY
function unitGameId(playerId) {
  return `player${playerId}-unit${unitUUID++}`
}
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

      // FIGURES TO GAME UNITS
      const unitsFromCurrentCard = figuresArr.reduce((unitsResult, figure, i, arr) => {
        const gameId = unitGameId(currentCard.playerId)
        return {
          ...unitsResult,
          [`${gameId}`]: {
            gameId,
            hsCardId: currentCard.id,
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



// function cardsToFigs(prev, curr, i, arr) {
//   // CARDS TO FIGURES
//   const numFigures = curr.figures * curr.cardQuantity
//   const figuresArr = Array.apply(null, Array(numFigures))
//   // FIGURES TO GAME UNITS
//   const newUnits = figuresArr.reduce(figsToUnits, {})
//   return {
//     ...prev,
//     ...newUnits
//   }
// }
// function figsToUnits(prev, curr, i, arr) {
//   const gameId = unitGameId()
//   return {
//     ...prev,
//     [unitGameId]: {
//       gameId,
//     }
//   }
// }