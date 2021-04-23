import React, { SyntheticEvent } from 'react'
import { Hexagon, HexUtils, Text } from 'react17-hexgrid'

import {
  useUIContext,
  useMapContext,
  usePlacementContext,
  usePlayContext,
} from 'game-contexts'
import {
  useBgioClientInfo,
  useBgioG,
  useBgioCtx,
} from 'bgio-contexts'
import { UnitIcon } from 'ui/unit-icons/UnitIcon'
import { generateBlankMoveRange } from 'game/constants'
import { selectHexForUnit, selectGameCardByID } from 'game/g-selectors'
import { BoardHex } from 'game/types'

type MapHexesProps = {
  hexSize: number
}

export const MapHexes = ({ hexSize }: MapHexesProps) => {
  const { playerID } = useBgioClientInfo()
  const { G } = useBgioG()
  const { boardHexes, armyCards,  gameUnits } = G
  const { ctx } = useBgioCtx()
  const {
    isMyTurn,
    isPlacementPhase,
    isRoundOfPlayPhase,
    isAttackingStage,
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
  
  //🛠 computed
  const selectedUnitMoveRange =
    selectedUnit?.moveRange ?? generateBlankMoveRange()

  //🛠 handlers
  const onClickBoardHex = (event: SyntheticEvent, sourceHex: BoardHex) => {
    if (isPlacementPhase) {
      onClickBoardHex_placement(event, sourceHex)
    }
    if (isRoundOfPlayPhase) {
      onClickBoardHex__turn(event, sourceHex)
    }
  }

  //🛠 classnames
  function calcClassNames(hex: BoardHex) {
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
    // const isOpponentsActiveUnitHex = (hex: BoardHex) => {
    //   return activeEnemyUnitIDs.includes(hex.occupyingUnitID)
    // }
    // assign
    let classNames = ''
    //phase: Placement
    if (isPlacementPhase) {
      // Highlight Player Startzones -- if toggled on
      ["0", "1", "2", "3", "4", "5"].forEach((playerID) => {
        if (hex?.startzonePlayerIDs?.includes(playerID)) {
          classNames = classNames.concat(
            ` maphex__startzone--player${playerID} `
          );
        }
      });
      //🛠 highlight placeable hexes
      if (selectedUnitID && isMyStartZoneHex(hex) && !hex.occupyingUnitID) {
        classNames = classNames.concat(' maphex__start-zone--placement ')
      }
      //🛠 highlight active hex
      if (isSelectedHex(hex)) {
        classNames = classNames.concat(' maphex__selected--active ')
      }
    }
    //phase: ROP
    if (isRoundOfPlayPhase) {
      //🛠 Highlight selected card units
      // TODO Color selectable units based on if they have moved, have not moved, or have finished moving
      const isSelectableUnit = isSelectedCard(hex) && !isSelectedUnitHex(hex)
      if (isSelectableUnit) {
        classNames = classNames.concat(
          ' maphex__selected-card-unit--selectable '
        )
      }
      //🛠 Highlight selected unit
      if (selectedUnitID && isSelectedUnitHex(hex)) {
        classNames = classNames.concat(' maphex__selected-card-unit--active ')
      }
      // NOT MY TURN
      //🛠 Highlight opponents active units on their turn
      // if (!isMyTurn && isOpponentsActiveUnitHex(hex)) {
      //   classNames = classNames.concat(' maphex__opponents-active-unit ')
      // }
      //phase: ROP-attack
      if (isAttackingStage) {
        //🛠 Highlight targetable enemy units
        const endHexUnitID = hex.occupyingUnitID
        const isEndHexOccupied = Boolean(endHexUnitID)
        const endHexUnit = { ...gameUnits[endHexUnitID] }
        const endHexUnitPlayerID = endHexUnit.playerID
        const isEndHexEnemyOccupied =
          isEndHexOccupied && endHexUnitPlayerID !== playerID
        // If unit selected, hex is enemy occupied...
        if (selectedUnitID && isEndHexEnemyOccupied) {
          const startHex = selectHexForUnit(selectedUnitID, boardHexes)
          const isInRange =
            HexUtils.distance(startHex, hex) <= selectedGameCard.range
          // ... and is in range
          if (isInRange) {
            classNames = classNames.concat(' maphex__targetable-enemy ')
          }
        }
      }

      // phase: ROP-move
      // todo: make movement its own stage
      if (!isAttackingStage) {
        const { safe, engage, disengage } = selectedUnitMoveRange
        const isInSafeMoveRange = safe.includes(hex.id)
        const isInEngageMoveRange = engage.includes(hex.id)
        const isInDisengageMoveRange = disengage.includes(hex.id)
        //🛠 Paint safe moves
        if (isInSafeMoveRange) {
          classNames = classNames.concat(' maphex__move-safe ')
        }
        //🛠 Paint engage moves
        if (isInEngageMoveRange) {
          classNames = classNames.concat(' maphex__move-engage ')
        }
        //🛠 Paint disengage moves
        if (isInDisengageMoveRange) {
          classNames = classNames.concat(' maphex__move-disengage ')
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
      const unitName = gameUnitCard?.name ?? ''
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
