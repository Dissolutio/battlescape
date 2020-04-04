import React, { useState } from 'react'
import styled from 'styled-components';
import { MapDisplay } from './MapDisplay'
import { ArmyForPlacing } from './ArmyForPlacing'
import { DataReadout } from './DataReadout'
import { IStartZones, IBoardHex } from '../game/constants/mapGen'
import { IUnit } from '../game/constants/startingUnits'

import './layout.css'

export default function Board({ G }) {
    const {
        boardHexes,
        startZones,
        armyCardsInGame,
        startingUnits,
        coreHeroscapeCards,
        playerID
    } = G

    console.log("Board -> coreHeroscapeCards", coreHeroscapeCards)

    const { placeUnit } = G.moves
    const startZone: string[] = startZones[playerID]

    const [activeHexID, setActiveHexID] = useState({})
    const [activeUnitID, setActiveUnitID] = useState('')
    const [availableUnits, setAvailableUnits] = useState(() => (initialAvailableUnits()))

    const [errorMsg, setErrorMsg] = useState('')

    const allUnits = Object.values(startingUnits)
    const selectedUnit = startingUnits[activeUnitID]

    function initialAvailableUnits() {
        return allUnits
            .filter((unit: IUnit) => unit.playerID === playerID)
            .map((gameUnit: IUnit) => ({
                unitID: gameUnit.unitID,
                name: armyCardsInGame[gameUnit.hsCardID].name,
                image: armyCardsInGame[gameUnit.hsCardID].image,
            }))
    }

    function onClickBoardHex(event: Event, sourceHex: IBoardHex) {
        const hexID = sourceHex.id
        event.preventDefault()
        const isInStartZone = startZone.includes(hexID)
        // EITHER
        //  Select hex
        if (!activeUnitID) {
            setActiveHexID(hexID)
            setErrorMsg('')
            return
        }
        // or Place unit
        if (activeUnitID && isInStartZone) {
            placeUnit(hexID, selectedUnit)
            setAvailableUnits(availableUnits.filter((unit: IUnit) => unit.unitID !== activeUnitID))
            setActiveUnitID('')
            setErrorMsg('')
            return
        }
        // or Can't place unit, because not in start zone
        if (activeUnitID && !isInStartZone) {
            setErrorMsg("You must place units inside your start zone. Invalid hex selected.")
            return
        }
    }

    function onClickPlacementUnit(unitID) {
        // either deselect unit, or select unit and deselect active hex
        if (unitID === activeUnitID) {
            setActiveUnitID('')
        } else {
            setActiveUnitID(unitID)
            setActiveHexID('')
        }
    }

    const dataReadoutProps = {
        activeHexID
    }
    const mapProps = {
        boardHexes,
        startZones,
        armyCardsInGame,
        startingUnits,
        playerID,
        activeHexID,
        activeUnitID,
        onClickBoardHex,
    }

    return (
        <LayoutFlexColumn>
            <TopConsole>
                {/* <ArmyForPlacing
                    availableUnits={availableUnits}
                    activeUnitID={activeUnitID}
                    onClickUnit={onClickPlacementUnit}
                    errorMsg={errorMsg}
                /> */}
            </TopConsole>
            <MainDisplay>
                {/* <MapDisplay
                    mapProps={mapProps}
                /> */}
            </MainDisplay>
            <BottomConsole>
                {/* <DataReadout
                    dataReadoutProps={dataReadoutProps}
                /> */}
            </BottomConsole>
        </LayoutFlexColumn>
    )
}
const LayoutFlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
`;
const TopConsole = styled.div`
    background-color: blue;
    color: white;
    height: 10%;
    width: 100%;
`;
const MainDisplay = styled.div`
    background-color: yellow;
    color: black;
    flex-grow: 1;
    width: 100%;
  `;
const BottomConsole = styled.div`
    background-color: red;
    color: white;
    height: 20%;
    width: 100%;
  `
