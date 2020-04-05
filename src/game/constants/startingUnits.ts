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
  cardQuantity: number
  playerID: string
}
export interface IUnit extends ICoreHeroscapeCard {
  unitID: string
  hsCardID: string
  playerID: string
}
export interface IStartingArmyCards {
  [hsCardId: string]: IArmyCard;
}
export interface IStartingUnits {
  [unitID: string]: IUnit;
}

// MAKE STARTING ARMY CARDS
export const armyCardsInGame: IStartingArmyCards =
{
  [neGokSa.hsCardID]: {
    ...neGokSa,
    cardQuantity: 1,
    playerID: '0',
  },
  [syvarris.hsCardID]: {
    ...syvarris,
    cardQuantity: 1,
    playerID: '0',
  },
  [marroWarriors.hsCardID]: {
    ...marroWarriors,
    cardQuantity: 1,
    playerID: '0',
  },
  [agentCarr.hsCardID]: {
    ...agentCarr,
    cardQuantity: 1,
    playerID: '1',
  },
  [kravMagaAgents.hsCardID]: {
    ...kravMagaAgents,
    cardQuantity: 1,
    playerID: '1',
  },
  [deathwalker9000.hsCardID]: {
    ...deathwalker9000,
    cardQuantity: 1,
    playerID: '1',
  },
  [mimring.hsCardID]: {
    ...mimring,
    cardQuantity: 1,
    playerID: '1',
  },
}

//  MAKE STARTING UNITS
export const startingUnits: IStartingUnits = convertCardsToStartingUnits(armyCardsInGame)
function convertCardsToStartingUnits(armyCardsInGame: IStartingArmyCards) {
  // id factory
  let unitID = 0
  function makeUnitID(playerID) {
    return `u${unitID++}-p${playerID}`
  }
  // cards...
  const startingUnits = Object.values(armyCardsInGame)
    // ...to figures
    .reduce((result, currentCard: IArmyCard) => {
      const figuresArr = Array.apply(null, Array(parseInt(currentCard.figures) * currentCard.cardQuantity))
      // ...to game units
      const unitsFromCurrentCard = figuresArr.reduce((unitsResult, figure, i, arr) => {
        const unitID = makeUnitID(currentCard.playerID)
        const newGameUnit = {
          unitID,
          hsCardID: currentCard.hsCardID,
          playerID: currentCard.playerID,

        }
        return {
          ...unitsResult,
          [unitID]: newGameUnit
        }
      }, {})
      return {
        ...result,
        ...unitsFromCurrentCard
      }
    }, {})
  return startingUnits
}
