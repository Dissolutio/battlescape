import React, { useState } from 'react'
import { MapDisplay } from './MapDisplay'
import './Board.css'
import { playerColors } from '../game/constants/playerColors'

export default function PlacementBoard(props) {
  const { boardHexes, startingUnits, armyCardsInGame, startZones } = props.G
  const allUnits = Object.values(startingUnits)
  const myId = Object.keys(props.G.players)[0]
  const placeUnit = props.moves.placeUnit
  const playerColor = playerColors[myId]

  const [activeHex, setActiveHex] = useState({})
  const [selectedUnitGameId, setSelectedUnitGameId] = useState('')
  const [availableUnits, setAvailableUnits] = useState(() => (initialAvailableUnits()))

  function initialAvailableUnits() {
    return allUnits
      .filter(unit => unit.playerId === myId)
      .map(gameUnit => ({
        ...gameUnit,
        name: armyCardsInGame[gameUnit.hsCardId].name,
      }))
  }

  function onClickBoardHex(event, source) {
    console.log("onClickBoardHex -> source", source)
    // 1. if we have a unit selected, place them, if theres a unit there, switch them out
    // 2. Otherwise, just view the hex info
    if (selectedUnitGameId) {
      placeUnit(source.props.id, selectedUnitGameId)
      setAvailableUnits(availableUnits.filter(unit => unit.gameId !== selectedUnitGameId))
      setSelectedUnitGameId('')
    } else {
      setActiveHex({ ...source.props })
    }

  }

  const toggleSelected = (gameId) => {
    // either deselect unit, or select unit and deselect active hex
    if (gameId === selectedUnitGameId) {
      setSelectedUnitGameId('')
    } else {
      setSelectedUnitGameId(gameId)
      setActiveHex({})
    }
  }
  const startZone = startZones[myId]

  const dataReadoutProps = {
    activeHex,
  }
  const mapProps = {
    selectedUnitGameId,
    onClickBoardHex,
    boardHexes,
    activeHex,
    startZone,
    startingUnits,
    armyCardsInGame
  }

  return (
    <div>
      <p>Selected Unit: {selectedUnitGameId}</p>
      <AvailableUnitsToPlace
        availableUnits={availableUnits}
        selectedUnit={selectedUnitGameId}
        toggleSelected={toggleSelected}
      />
      {selectedUnitGameId ? (<p>Place on a hex inside of your start zone:</p>) : null}
      <DataReadout dataReadoutProps={dataReadoutProps} />
      <MapDisplay mapProps={mapProps} />
    </div>
  )
}

const AvailableUnitsToPlace = ({ availableUnits, toggleSelected, selectedUnit }) => {
  const buttonStyle = (gameId) => {
    if (selectedUnit === gameId) {
      return {
        boxShadow: `0 0 5px rgba(81, 203, 238, 1)`,
        padding: `3px 0px 3px 3px`,
        margin: `5px 1px 3px 0px`,
        border: `1px solid rgba(81, 203, 238, 1)`,
      }
    } else {
      return {}
    }
  }
  return (
    <>
      <h2>Units available to place on map:</h2>
      <ul>
        {availableUnits && availableUnits.map(unit => (
          <li
            style={{
              listStyleType: `none`,
              display: 'inline-block'
            }}
            key={unit.gameId}
          >
            <button
              style={buttonStyle(unit.gameId)}
              onClick={() => toggleSelected(unit.gameId)}
            >
              {unit.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
const DataReadout = ({ dataReadoutProps }) => {
  const { activeHex } = dataReadoutProps
  if (activeHex.hasOwnProperty('id')) {
    return (
      <div>
        <div>ActiveHex: {`${activeHex.id}`}</div>
        <div>Unit on Hex: {`${activeHex.unitGameId || 'none'}`}</div>
      </div>
    )
  }
  return null
}