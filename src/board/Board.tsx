import React, { useState } from 'react'

import { MapDisplay } from './MapDisplay'
import { ArmyForPlacing } from './ArmyForPlacing'
import { IStartZones, FullHex, IUnit } from '../game/constants/mapGen'
import './layout.css'

export default function Board({ G }) {
    const {
        boardHexes,
        armyCardsInGame,
        startingUnits,
        coreHeroscapeCards,
    } = G
    const playerID = G.playerID
    const placeUnit = G.moves.placeUnit
    const startZone: FullHex[] = G.startZones[playerID]

    const [activeHexID, setActiveHexID] = useState({})
    const [selectedUnitGameID, setSelectedUnitGameID] = useState('')

    const [availableUnits, setAvailableUnits] = useState(() => (initialAvailableUnits()))

    const [errorMsg, setErrorMsg] = useState('')

    const allUnits = Object.values(startingUnits)
    const selectedUnit = startingUnits[selectedUnitGameID]

    function initialAvailableUnits() {
        return allUnits
            .filter((unit: IUnit) => unit.playerID === playerID)
            .map((gameUnit: IUnit) => ({
                unitID: gameUnit.unitID,
                name: armyCardsInGame[gameUnit.hsCardID].name,
                image: armyCardsInGame[gameUnit.hsCardID].image,
            }))
    }

    function onClickBoardHex(event, source) {
        event.preventDefault()
        const hexID = source.props.id
        const isInStartZone = startZone.includes(hexID)
        //  Select hex
        if (!selectedUnitGameID) {
            setActiveHexID({ ...source.props })
            setErrorMsg('')
            return
        }
        // Place unit
        if (selectedUnitGameID && isInStartZone) {
            placeUnit(source.props.id, selectedUnit)
            setAvailableUnits(availableUnits.filter(unit => unit.gameID !== selectedUnitGameID))
            setSelectedUnitGameID('')
            setErrorMsg('')
            return
        }
        // Error, start zone
        if (selectedUnitGameID && !isInStartZone) {
            setErrorMsg("You must place units inside your start zone. Invalid hex selected.")
            return
        }
    }

    function onClickPlacementUnit(gameID) {
        // either deselect unit, or select unit and deselect active hex
        if (gameID === selectedUnitGameID) {
            setSelectedUnitGameID('')
        } else {
            setSelectedUnitGameID(gameID)
            setActiveHexID({})
        }
    }

    const dataReadoutProps = {
        activeHexID
    }
    const mapProps = {
        selectedUnitGameID,
        onClickBoardHex,
        boardHexes,
        activeHexID,
        startingUnits,
        armyCardsInGame
    }

    return (
        <div id='wrapper'>
            <div id="top-bar">
                <ArmyForPlacing
                    availableUnits={availableUnits}
                    selectedUnitGameID={selectedUnitGameID}
                    onClickUnit={onClickPlacementUnit}
                />
                <p style={{ color: "red" }}>{errorMsg}</p>
            </div>
            <div id="main">
                <MapDisplay mapProps={mapProps} />
            </div>
            <div id="bottom-bar">
                <DataReadout dataReadoutProps={dataReadoutProps} />
            </div>
        </div>
    )
}

const DataReadout = ({ dataReadoutProps }) => {
    const { activeHexID } = dataReadoutProps
    if (activeHexID.hasOwnProperty('id')) {
        return (
            <div>
                <div>ActiveHex: {`${activeHexID.id}`}</div>
                <div>Unit on Hex: {`${activeHexID.unitGameID || 'none'}`}</div>
            </div>
        )
    }
    return null
}