import { MS1Cards } from "assets/heroscape/setWaves"
import { GameArmyCard, GameUnits, GType_Armies, ICoreHeroscapeCard } from "./types"

const heroscapeCardsArr = MS1Cards
const armyCards: GameArmyCard[] = heroscapeCardsArr.map(
  (card: ICoreHeroscapeCard, index: number) => {
    const playerID = Boolean(index % 2) ? "0" : "1"
    // id factory
    function makeGameCardID() {
      return `p${playerID}_${card.cardID}`
    }
    const gameCard: GameArmyCard = {
      ...card,
      playerID,
      cardQuantity: 1,
      gameCardID: makeGameCardID(),
    }
    return gameCard
  }
)
const gameUnits = armyCardsToGameUnits(armyCards)

export const initialArmies: GType_Armies = {
  armyCards,
  gameUnits,
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
        armyCardID: card.cardID,
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
