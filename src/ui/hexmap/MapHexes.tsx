import React, { SyntheticEvent } from "react"
import { Hexagon, HexUtils, Text } from "react17-hexgrid"

import {
  useUIContext,
  useMapContext,
  usePlacementContext,
  usePlayContext,
} from "game-contexts"
import { useBgioClientInfo, useBgioG, useBgioCtx } from "bgio-contexts"
import { UnitIcon } from "ui/unit-icons/UnitIcon"
import { generateBlankMoveRange } from "game/constants"
import { selectHexForUnit, selectGameCardByID } from "game/g-selectors"
import { BoardHex } from "game/types"

type MapHexesProps = {
  hexSize: number
}

export const MapHexes = ({ hexSize }: MapHexesProps) => {
  const { playerID } = useBgioClientInfo()
  const { G } = useBgioG()
  const { boardHexes, armyCards, gameUnits } = G
  const { ctx } = useBgioCtx()
  const {
    isMyTurn,
    isPlacementPhase,
    isRoundOfPlayPhase,
    isAttackingStage,
    isMovementStage,
  } = ctx
  const { myStartZone, onClickBoardHex_placement } = usePlacementContext()
  const {
    onClickBoardHex__turn,
    selectedGameCard,
    selectedGameCardUnits,
    selectedUnit,
    revealedGameCardUnits,
  } = usePlayContext()
  const { selectedUnitID } = useUIContext()
  const { selectedMapHex } = useMapContext()

  // computed
  const selectedUnitMoveRange =
    selectedUnit?.moveRange ?? generateBlankMoveRange()

  // handlers
  const onClickBoardHex = (event: SyntheticEvent, sourceHex: BoardHex) => {
    if (isPlacementPhase) {
      onClickBoardHex_placement(event, sourceHex)
    }
    if (isRoundOfPlayPhase) {
      onClickBoardHex__turn(event, sourceHex)
    }
  }
  const isMyStartZoneHex = (hex: BoardHex) => {
    return Boolean(myStartZone.includes(hex.id))
  }
  const isSelectedHex = (hex: BoardHex) => {
    return hex.id === selectedMapHex
  }
  const isSelectedCard = (hex: BoardHex) => {
    const unitIDs = selectedGameCardUnits.map((u) => u.unitID)
    return unitIDs.includes(hex.occupyingUnitID)
  }
  const isSelectedUnitHex = (hex: BoardHex) => {
    return hex.occupyingUnitID && hex.occupyingUnitID === selectedUnitID
  }
  // const activeEnemyUnitIDs = revealedGameCardUnits.map((u) => u.unitID)

  // classnames
  function calcClassNames(hex: BoardHex) {
    let classNames = ""
    // paint Terrain
    classNames = classNames.concat(` maphex__terrain--${hex.terrain} `)
    // phase: Placement
    if (isPlacementPhase) {
      // highlight player start zones
      ;["0", "1", "2", "3", "4", "5"].forEach((playerID) => {
        if (hex?.startzonePlayerIDs?.includes(playerID)) {
          classNames = classNames.concat(
            ` maphex__startzone--player${playerID} `
          )
        }
      })
      // highlight placeable hexes
      if (selectedUnitID && isMyStartZoneHex(hex) && !hex.occupyingUnitID) {
        classNames = classNames.concat(" maphex__start-zone--placement ")
      }
      // highlight active hex
      if (isSelectedHex(hex)) {
        classNames = classNames.concat(" maphex__selected--active ")
      }
    }

    // phase: Round of Play
    if (isRoundOfPlayPhase) {
      // highlight selected card units
      const isSelectableUnit = isSelectedCard(hex) && !isSelectedUnitHex(hex)
      if (isSelectableUnit) {
        classNames = classNames.concat(
          " maphex__selected-card-unit--selectable "
        )
      }
      // Highlight selected unit
      if (selectedUnitID && isSelectedUnitHex(hex)) {
        classNames = classNames.concat(" maphex__selected-card-unit--active ")
      }

      // const isOpponentsActiveUnitHex = (hex: BoardHex) => {
      //   return activeEnemyUnitIDs.includes(hex.occupyingUnitID)
      // }
      // Phase - Round of Play , not my turn
      // Highlight opponents active units on their turn
      // if (!isMyTurn && isOpponentsActiveUnitHex(hex)) {
      //   classNames = classNames.concat(' maphex__opponents-active-unit ')
      // }

      // Attack Stage
      if (isAttackingStage) {
        // highlight targetable enemy units -- selected unit + hex is enemy occupied and in range
        const endHexUnitID = hex.occupyingUnitID
        const isEndHexOccupied = Boolean(endHexUnitID)
        const endHexUnit = { ...gameUnits[endHexUnitID] }
        const endHexUnitPlayerID = endHexUnit.playerID
        const isEndHexEnemyOccupied =
          isEndHexOccupied && endHexUnitPlayerID !== playerID
        if (selectedUnitID && isEndHexEnemyOccupied) {
          const startHex = selectHexForUnit(selectedUnitID, boardHexes)
          const isInRange =
            HexUtils.distance(startHex, hex) <= selectedGameCard.range
          // ...
          if (isInRange) {
            classNames = classNames.concat(" maphex__targetable-enemy ")
          }
        }
      }

      // todo: make movement its own stage
      // TODO Color selectable units based on if they have moved, have not moved, or have finished moving
      // phase: ROP-move
      if (!isAttackingStage) {
        const { safe, engage, disengage } = selectedUnitMoveRange
        const isInSafeMoveRange = safe.includes(hex.id)
        const isInEngageMoveRange = engage.includes(hex.id)
        const isInDisengageMoveRange = disengage.includes(hex.id)
        // Paint safe moves
        if (isInSafeMoveRange) {
          classNames = classNames.concat(" maphex__move-safe ")
        }
        // Paint engage moves
        if (isInEngageMoveRange) {
          classNames = classNames.concat(" maphex__move-engage ")
        }
        // Paint disengage moves
        if (isInDisengageMoveRange) {
          classNames = classNames.concat(" maphex__move-disengage ")
        }
      }
    }
    return classNames
  }

  const hexJSX = () => {
    return Object.values(boardHexes).map((hex: BoardHex, i) => {
      const gameUnit = gameUnits?.[hex.occupyingUnitID]
      const isShowableUnit =
        !isPlacementPhase || gameUnit?.playerID === playerID
      const gameUnitCard = selectGameCardByID(armyCards, gameUnit?.gameCardID)
      const unitName = gameUnitCard?.name ?? ""
      return (
        <Hexagon
          key={i}
          hex={hex}
          onClick={(e) => onClickBoardHex(e, hex)}
          className={calcClassNames(hex)}
        >
          <g>
            {gameUnit && isShowableUnit && (
              <UnitIcon
                hexSize={hexSize}
                armyCardID={gameUnit.cardID}
                iconPlayerID={gameUnit.playerID}
              />
            )}
            {isPlacementPhase && <HexIDText hexSize={hexSize} text={hex.id} />}
            {!isPlacementPhase && unitName && (
              <HexIDText hexSize={hexSize} text={unitName} />
            )}
            <HexIDText hexSize={hexSize} text={hex.altitude} />
          </g>
        </Hexagon>
      )
    })
  }
  return <>{hexJSX()}</>
}
const HexIDText = ({ hexSize, text }) => {
  return (
    <Text className="maphex_altitude-text" y={hexSize * 0.6}>
      {text.toString()}
    </Text>
  )
}
