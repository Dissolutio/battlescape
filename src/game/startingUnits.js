import { MS1Cards } from './units'
import { hexagonMap } from './mapGen'

const marroWarriors = MS1Cards.find(unit => unit.name === "Marro Warriors")
const neGokSa = MS1Cards.find(unit => unit.name === "Ne-gok-sa")
const kravMagaAgents = MS1Cards.find(unit => unit.name === "Krav Maga Agents")
const agentCarr = MS1Cards.find(unit => unit.name === "Agent Carr")

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

export const startingUnits = convertCardsToStartingUnits(armyCardsInGame)

function convertCardsToStartingUnits(armyCardsInGame) {
  const allCards = Object.values(armyCardsInGame)
  let possibleStartingPositions = Object.values(hexagonMap).map(fullHex => fullHex.coords)
  let unitUUID = 0

  const startingUnits = allCards.reduce((result, currentCard) => {
    const figuresArr = Array.apply(null, Array(currentCard.figures * currentCard.cardQuantity))
    const unitsFromCurrentCard = figuresArr.reduce((unitsResult, figure, i, arr) => {
      const unitGameId = `player${currentCard.playerId}-unit${unitUUID++}`
      const numberOfHexesArr = Array.apply(null, Array(currentCard.hexes))
      const coords = numberOfHexesArr.map(hex => possibleStartingPositions.pop())
      return {
        ...unitsResult,
        [unitGameId]: {
          unitGameId: `${unitGameId}`,
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

