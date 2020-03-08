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
  const startZone = startZones[myId]
  const startZoneIdsArr = Object.keys(startZone)

  const [activeHex, setActiveHex] = useState({})
  const [selectedUnitGameId, setSelectedUnitGameId] = useState('')
  const selectedUnit = startingUnits[selectedUnitGameId]
  const [availableUnits, setAvailableUnits] = useState(() => (initialAvailableUnits()))
  const [errorMsg, setErrorMsg] = useState('')


  function initialAvailableUnits() {
    return allUnits
      .filter(unit => unit.playerId === myId)
      .map(gameUnit => ({
        ...gameUnit,
        name: armyCardsInGame[gameUnit.hsCardId].name,
      }))
  }

  function onClickBoardHex(event, source) {
    const hexId = source.props.id
    const isInStartZone = startZoneIdsArr.includes(hexId)
    // Unit selected, clicked start zone, place them 
    // TODO if theres a unit there, switch them out
    if (selectedUnitGameId && isInStartZone) {
      placeUnit(source.props.id, selectedUnit)
      setAvailableUnits(availableUnits.filter(unit => unit.gameId !== selectedUnitGameId))
      setSelectedUnitGameId('')
      setErrorMsg('')
      return
    }
    // Unit selected, clicked outside start zone
    if (selectedUnitGameId && !isInStartZone) {
      setErrorMsg("You must place units inside your start zone. Invalid hex selected.")
      return
    }
    // 2. Otherwise, just view the hex info
    else {
      setActiveHex({ ...source.props })
      setErrorMsg('')
      return
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

  const dataReadoutProps = {
    activeHex,
  }
  const mapProps = {
    selectedUnitGameId,
    onClickBoardHex,
    boardHexes,
    activeHex,
    startZoneIdsArr,
    startingUnits,
    armyCardsInGame
  }

  return (
    <div>
      <p>Selected Unit: {selectedUnitGameId}</p>
      <AvailableUnitsToPlace
        availableUnits={availableUnits}
        selectedUnitGameId={selectedUnitGameId}
        toggleSelected={toggleSelected}
      />
      <p style={{ color: "red" }}>{errorMsg}</p>
      {selectedUnitGameId ? (<p>Place on a hex inside of your start zone:</p>) : null}
      <DataReadout dataReadoutProps={dataReadoutProps} />
      <MapDisplay mapProps={mapProps} />
    </div>
  )
}

const AvailableUnitsToPlace = ({ availableUnits, toggleSelected, selectedUnitGameId }) => {
  const buttonStyle = (gameId) => {
    if (selectedUnitGameId === gameId) {
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