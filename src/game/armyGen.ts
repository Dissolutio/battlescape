import { hexedMeadowCards } from "./cards"
import { ArmyCard, GameArmyCard, GameUnits, GType_Armies } from "./types"

// Start with standard army cards
const hexedMeadowCardsArr: ArmyCard[] = Object.values(hexedMeadowCards)

// Transform standard cards into game-cards
const armyCards: GameArmyCard[] = hexedMeadowCardsArr.map(fillGameCardInfo)

// Transform game-cards into game-units
// todo this could use some params, so some units can be pre-dead
const gameUnits = armyCardsToGameUnits(armyCards)

export const initialArmies: GType_Armies = {
  armyCards,
  gameUnits,
}
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
