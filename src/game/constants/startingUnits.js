import {
  marroWarriors,
  neGokSa,
  kravMagaAgents,
  agentCarr,
  mimring,
  syvarris,
  deathwalker9000,
} from './hsSelectors'

export const armyCardsInGame =
{
  [neGokSa.id]: {
    ...neGokSa,
    cardQuantity: 1,
    playerID: '0',
  },
  [syvarris.id]: {
    ...syvarris,
    cardQuantity: 1,
    playerID: '0',
  },
  [marroWarriors.id]: {
    ...marroWarriors,
    cardQuantity: 1,
    playerID: '0',
  },
  [agentCarr.id]: {
    ...agentCarr,
    cardQuantity: 1,
    playerID: '1',
  },
  [kravMagaAgents.id]: {
    ...kravMagaAgents,
    cardQuantity: 1,
    playerID: '1',
  },
  [deathwalker9000.id]: {
    ...deathwalker9000,
    cardQuantity: 1,
    playerID: '1',
  },
  [mimring.id]: {
    ...mimring,
    cardQuantity: 1,
    playerID: '1',
  },
}
export const startingUnits = convertCardsToStartingUnits(armyCardsInGame)

function convertCardsToStartingUnits(armyCardsInGame) {
  // ID FACTORY
  let unitUUID = 0
  function unitGameID(playerID) {
    return `player${playerID}-unit${unitUUID++}`
  }
  // CARDS
  const startingUnits = Object.values(armyCardsInGame)
    // CARDS TO FIGURES
    .reduce((result, currentCard) => {
      const figuresArr = Array.apply(null, Array(currentCard.figures * currentCard.cardQuantity))
      // FIGURES TO GAME UNITS
      const unitsFromCurrentCard = figuresArr.reduce((unitsResult, figure, i, arr) => {
        const gameID = unitGameID(currentCard.playerID)
        return {
          ...unitsResult,
          [`${gameID}`]: {
            gameID,
            hsCardID: currentCard.id,
            playerID: `${currentCard.playerID}`,
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
