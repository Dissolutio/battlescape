import {
  ICoreHeroscapeCard,
  marroWarriors,
  neGokSa,
  kravMagaAgents,
  agentCarr,
  mimring,
  syvarris,
  deathwalker9000,
} from './coreHeroscapeCards'

export interface IArmyCard extends ICoreHeroscapeCard {
  hsCardID: string
}
export interface IArmyCards {
  [hsCardId: string]: IArmyCard;
}
export interface IGameUnit extends IArmyCard {

}
export const armyCardsInGame =
{
  [neGokSa.id]: {
    ...neGokSa,
    id: null,
    hsCardID: neGokSa.id,
    cardQuantity: 1,
    playerID: '0',
  },
  [syvarris.id]: {
    ...syvarris,
    id: null,
    hsCardID: syvarris.id,
    cardQuantity: 1,
    playerID: '0',
  },
  [marroWarriors.id]: {
    ...marroWarriors,
    id: null,
    hsCardID: marroWarriors.id,
    cardQuantity: 1,
    playerID: '0',
  },
  [agentCarr.id]: {
    ...agentCarr,
    id: null,
    hsCardID: agentCarr.id,
    cardQuantity: 1,
    playerID: '1',
  },
  [kravMagaAgents.id]: {
    ...kravMagaAgents,
    id: null,
    hsCardID: kravMagaAgents.id,
    cardQuantity: 1,
    playerID: '1',
  },
  [deathwalker9000.id]: {
    ...deathwalker9000,
    id: null,
    hsCardID: deathwalker9000.id,
    cardQuantity: 1,
    playerID: '1',
  },
  [mimring.id]: {
    ...mimring,
    id: null,
    hsCardID: mimring.id,
    cardQuantity: 1,
    playerID: '1',
  },
}
const player0Army = {

}
const player1Army = {

}
export const startingUnits = convertCardsToStartingUnits(armyCardsInGame)

function convertCardsToStartingUnits(armyCardsInGame: IArmyCards) {
  // ID FACTORY
  let unitUUID = 0
  function unitGameID(playerID) {
    return `player${playerID}-unit${unitUUID++}`
  }
  // CARDS
  const startingUnits = Object.values(armyCardsInGame)
    // CARDS TO FIGURES
    .reduce((result, currentCard) => {
      const figuresArr = Array.apply(null, Array(parseInt(currentCard.figures) * currentCard.cardQuantity))
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
