import { HexUtils } from "react17-hexgrid"

import {
  BoardHexes,
  BoardHex,
  GameArmyCard,
  GameUnits,
  GameUnit,
  MoveRange,
  OrderMarkers,
  OrderMarker,
  PlayerOrderMarkers,
} from "./types"
import { generateHexID, generateBlankMoveRange } from "./constants"

export function selectHexForUnit(unitID: string, boardHexes: BoardHexes) {
  return {
    ...Object.values(boardHexes).find((hex) => hex.occupyingUnitID === unitID),
  }
}
export function selectUnitForHex(
  hexID: string,
  gameUnits: GameUnits,
  boardHexes: BoardHexes
) {
  const hex = boardHexes?.[hexID]
  const unitID = hex?.occupyingUnitID
  const unit = gameUnits?.[unitID]
  return unit
}
export function selectGameCardByID(
  armyCards: GameArmyCard[],
  gameCardID: string
) {
  return armyCards.find((card: GameArmyCard) => card.gameCardID === gameCardID)
}
export function selectUnitsForCard(
  gameCardID: string,
  gameUnits: GameUnits
): GameUnit[] {
  return (
    Object.values(gameUnits)
      .filter((u) => u.gameCardID === gameCardID)
      // deproxy array
      .map((u) => ({ ...u }))
  )
}
export function selectRevealedGameCard(
  orderMarkers: OrderMarkers,
  armyCards: GameArmyCard[],
  currentOrderMarker: number,
  currentPlayer: string
) {
  const orderMarker = orderMarkers[currentPlayer].find(
    (om: OrderMarker) => om.order === currentOrderMarker.toString()
  )
  const gameCardID = orderMarker?.gameCardID ?? ""
  return selectGameCardByID(armyCards, gameCardID)
}
export function selectUnrevealedGameCard(
  playerOrderMarkers: PlayerOrderMarkers,
  armyCards: GameArmyCard[],
  currentOrderMarker: number
) {
  const id = playerOrderMarkers[currentOrderMarker.toString()]
  return selectGameCardByID(armyCards, id)
}
// Related ⤵
export function calcUnitMoveRange(
  unit: GameUnit,
  boardHexes: BoardHexes,
  gameUnits: GameUnits
): MoveRange {
  const initialMoveRange = generateBlankMoveRange()
  //*early out
  if (!unit) {
    return initialMoveRange
  }
  const playerID = unit?.playerID
  const initialMovePoints = unit?.movePoints ?? 0
  const startHex = selectHexForUnit(unit?.unitID ?? "", boardHexes)
  initialMoveRange.denied.push(`${startHex.id}`)
  //*early out again?
  if (!startHex || !initialMovePoints) {
    return initialMoveRange
  }
  const moveRange = {
    ...moveRangeReduce(
      startHex,
      initialMovePoints,
      boardHexes,
      initialMoveRange,
      gameUnits
    ),
  }
  return moveRange

  //* recursive reduce
  function moveRangeReduce(
    startHex: BoardHex,
    movePoints: number,
    boardHexes: BoardHexes,
    initialMoveRange: MoveRange,
    gameUnits: GameUnits
  ): MoveRange {
    const neighbors = selectHexNeighbors(startHex.id, boardHexes)
    //*early out
    if (movePoints <= 0) {
      return initialMoveRange
    }
    let nextResults = neighbors.reduce(
      (result: MoveRange, end: BoardHex): MoveRange => {
        const endHexID = end.id
        const endHexUnitID = end.occupyingUnitID
        const endHexUnit = { ...gameUnits[endHexUnitID] }
        const endHexUnitPlayerID = endHexUnit.playerID
        const moveCost = calcMoveCostBetweenNeighbors(startHex, end)
        const movePointsLeftAfterMove = movePoints - moveCost
        const isEndHexOccupied = Boolean(endHexUnitID)
        const isTooCostly = movePointsLeftAfterMove < 0
        const isEndHexEnemyOccupied =
          isEndHexOccupied && endHexUnitPlayerID !== playerID
        const isEndHexFriendlyOccupied = Boolean(
          endHexUnitID && endHexUnitPlayerID === playerID
        )
        const isUnpassable = isTooCostly || isEndHexEnemyOccupied
        const deduplicateMoveRange = (result: MoveRange): MoveRange => {
          return {
            safe: [...new Set(result.safe)],
            engage: [...new Set(result.engage)],
            disengage: [...new Set(result.disengage)],
            denied: [...new Set(result.denied)],
          }
        }
        if (isUnpassable || isEndHexFriendlyOccupied) {
          result.denied.push(endHexID)
        } else {
          // Not unpassable or occupied, then can be moved to
          result.safe.push(endHexID)
        }

        if (!isUnpassable) {
          const recursiveMoveRange = moveRangeReduce(
            end,
            movePointsLeftAfterMove,
            boardHexes,
            deduplicateMoveRange(result),
            gameUnits
          )
          return {
            ...deduplicateMoveRange(result),
            ...recursiveMoveRange,
          }
        }
        return result
      },
      // accumulator for reduce fn
      initialMoveRange
    )
    return nextResults
  }
}
export function selectHexNeighbors(
  startHexID: string,
  boardHexes: BoardHexes
): BoardHex[] {
  const startHex = boardHexes[startHexID]
  return HexUtils.neighbors(startHex)
    .map((hex) => {
      const id = generateHexID(hex)
      const exists = Object.keys(boardHexes).includes(id)
      return exists ? { ...boardHexes[generateHexID(hex)] } : null
    })
    .filter((item) => Boolean(item))
}
export function calcMoveCostBetweenNeighbors(
  startHex: BoardHex,
  end: BoardHex
): number {
  const altitudeDelta = end.altitude - startHex.altitude
  const heightCost = Math.max(altitudeDelta, 0)
  const distanceCost = 1
  const totalCost = heightCost + distanceCost
  return totalCost
}
export function selectEngagementsForHex(
  hexID: string,
  playerID: string,
  boardHexes: BoardHexes,
  gameUnits: GameUnits
) {
  const adjacentUnitIDs = selectHexNeighbors(hexID, boardHexes)
    .filter((h) => h.occupyingUnitID)
    .map((h) => h.occupyingUnitID)
  const engagedUnitIDs = adjacentUnitIDs.filter(
    (id) => gameUnits[id].playerID !== playerID
  )
  return engagedUnitIDs
}
