import React, {
  createContext,
  SyntheticEvent,
  useContext,
  useState,
} from "react"
import { useBgioClientInfo, useBgioMoves, useBgioG } from "bgio-contexts"
import { useUIContext } from "./ui-context"
import { useMapContext } from "./map-context"

import {
  BoardHex,
  ICoreHeroscapeCard,
  GameUnit,
  PlayerOrderMarkers,
  GameArmyCard,
} from "game/types"

const PlacementContext = createContext<Partial<PlacementContextValue>>({})

const usePlacementContext = () => {
  return {
    ...useContext(PlacementContext),
  }
}

export type PlacementUnit = GameUnit & {
  name: string
}
type PlacementContextValue = {
  placementUnits: PlacementUnit[]
  myStartZone: string[]
  onClickPlacementUnit: (unitID: string) => void
  onClickBoardHex_placement: (
    event: React.SyntheticEvent,
    sourceHex: BoardHex
  ) => void
}
const PlacementContextProvider: React.FC = (props) => {
  const { playerID } = useBgioClientInfo()
  const { G } = useBgioG()
  const myCards: GameArmyCard[] = G.armyCards.filter(
    (c) => c.playerID === playerID
  )
  const myStartZone: string[] = Object.values(G.boardHexes)
    .filter((bh: BoardHex) => bh.startzonePlayerIDs.includes(playerID))
    .map((bh) => bh.id)
  const myUnits: GameUnit[] = Object.values(G.gameUnits).filter(
    (u) => u.playerID === playerID
  )
  const myOrderMarkers: PlayerOrderMarkers = G.players?.[playerID]?.orderMarkers

  const { moves } = useBgioMoves()
  const { setSelectedMapHex } = useMapContext()
  const { selectedUnitID, setSelectedUnitID } = useUIContext()

  const { boardHexes, gameUnits } = G
  const { placeUnitOnHex } = moves
  // STATE
  const [placementUnits, setPlacementUnits] = useState((): PlacementUnit[] => {
    const myUnitIdsAlreadyOnMap = Object.values(boardHexes)
      .map((bH: BoardHex) => bH.occupyingUnitID)
      .filter((id) => {
        return id && gameUnits[id].playerID === playerID
      })
    const units = myUnits
      .filter((unit: GameUnit) => !myUnitIdsAlreadyOnMap.includes(unit.unitID))
      .map((unit) => {
        const armyCard = myCards.find(
          (card: ICoreHeroscapeCard) => card.cardID === unit.cardID
        )
        return {
          ...unit,
          name: armyCard.name,
        }
      })
    return units
  })
  const activeUnit: GameUnit = G.gameUnits[selectedUnitID]
  const removeUnitFromAvailable = (unit: GameUnit) => {
    const newState = placementUnits.filter((u) => {
      return !(u.unitID === unit.unitID)
    })
    setPlacementUnits(newState)
  }
  // HANDLERS
  function onClickPlacementUnit(unitID: string) {
    // either deselect unit, or select unit and deselect active hex
    if (unitID === selectedUnitID) {
      setSelectedUnitID("")
    } else {
      setSelectedUnitID(unitID)
      setSelectedMapHex("")
    }
  }
  function onClickBoardHex_placement(
    event: SyntheticEvent,
    sourceHex: BoardHex
  ) {
    // Do not propagate to background onClick
    event.stopPropagation()
    const hexID = sourceHex.id
    const isInStartZone = myStartZone.includes(hexID)
    //  No unit, select hex
    if (!selectedUnitID) {
      setSelectedMapHex(hexID)
      return
    }
    // have unit, clicked in start zone, place unit
    if (selectedUnitID && isInStartZone) {
      placeUnitOnHex(hexID, activeUnit)
      removeUnitFromAvailable(activeUnit)
      setSelectedUnitID("")
      return
    }
    // have unit, clicked hex outside start zone, error
    if (selectedUnitID && !isInStartZone) {
      console.error(
        "Invalid hex selected. You must place units inside your start zone."
      )
      return
    }
  }

  return (
    <PlacementContext.Provider
      value={{
        placementUnits,
        onClickPlacementUnit,
        onClickBoardHex_placement,
        myStartZone,
      }}
    >
      {props.children}
    </PlacementContext.Provider>
  )
}

export { PlacementContextProvider, usePlacementContext }
