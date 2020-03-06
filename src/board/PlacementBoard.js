import React, { useState } from 'react'
import { MapDisplay } from './MapDisplay'
import './Board.css'

export default function PlacementBoard(props) {
  const { boardHexes, startingUnits, armyCardsInGame, startZones } = props.G
  const allUnits = Object.values(startingUnits)
  const myId = Object.keys(props.G.players)[0]

  const placeUnit = props.moves.placeUnit

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
  console.log("PlacementBoard -> availableUnits", availableUnits)

  function onClickBoardHex(event, source) {
    if (selectedUnitGameId) {
      placeUnit(source.props.id, selectedUnitGameId)
      setAvailableUnits(availableUnits.filter(unit => unit.gameId !== selectedUnitGameId))
      setSelectedUnitGameId('')
    } else {
      const { q, r, s, id } = source.props
      setActiveHex({ q, r, s, id })
    }

  }

  const toggleSelected = (gameId) => {
    if (gameId === selectedUnitGameId) {
      setSelectedUnitGameId('')
    } else {
      setSelectedUnitGameId(gameId)
    }
  }
  const startZone = startZones[myId]
  const dataReadoutProps = {
    activeHex,
  }
  const mapProps = {
    onClickBoardHex,
    boardHexes,
    activeHex,
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
      </div>
    )
  }
  return null
}