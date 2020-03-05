import React, { useState } from 'react'
import { MapDisplay } from './MapDisplay'
import './Board.css'

export default function PlacementBoard(props) {
  const { boardHexes, startingUnits, armyCardsInGame, startZones } = props.G
  const hexagons = Object.values(boardHexes)
  const units = Object.values(startingUnits)
  const [activeHex, setActiveHex] = useState({})
  const [selectedUnit, setSelectedUnit] = useState('')

  const currentPlayer = props.ctx.currentPlayer;
  function onClickBoardHex(event, source) {
    const { q, r, s, id } = source.props
    setActiveHex({ q, r, s, id })
  }
  const myId = Object.keys(props.G.players)
  console.log("PlacementBoard -> myId", myId)

  const toggleSelected = (gameId) => {
    if (gameId === selectedUnit) {
      setSelectedUnit('')
    } else {
      setSelectedUnit(gameId)
    }
  }
  const startZone = startZones[currentPlayer]
  console.log("PlacementBoard -> startZone", startZone)
  const availableUnits = units
    .filter(unit => unit.playerId === currentPlayer)
    .map(gameUnit => ({
      ...gameUnit,
      name: armyCardsInGame[gameUnit.hsCardId].name,
    })
    )

  const dataReadoutProps = {
    activeHex,
  }
  const mapProps = {
    onClickBoardHex,
    hexagons,
    units,
    activeHex,
  }

  return (
    <div>
      <h1>Current player: {currentPlayer}</h1>
      <AvailableUnitsToPlace
        availableUnits={availableUnits}
        selectedUnit={selectedUnit}
        toggleSelected={toggleSelected}
      />
      {selectedUnit ? (<p>Place on a hex inside of your start zone:</p>) : null}
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