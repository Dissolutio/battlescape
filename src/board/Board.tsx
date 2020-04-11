import React, { useState } from 'react'
import styled from 'styled-components';
import { MapDisplay } from './MapDisplay'
import { ArmyForPlacing } from './ArmyForPlacing'
import { DataReadout } from './DataReadout'
import { IStartZones, IBoardHex, IBoardHexes } from '../game/constants/mapGen'
import { IUnit, IStartingArmyCards, IStartingUnits } from '../game/constants/startingUnits'
import { BoardContextProvider, useBoardContext } from './useBoardContext'
import { ICoreHeroscapeCard } from '../game/constants/coreHeroscapeCards'

export default function Board(props) {
    // BGio props
    const { G, ctx, moves, events, reset, redo, undo, step, log, gameID, playerID, gameMetadata } = props
    console.log('%c', 'color: #00a3cc', moves);
    console.log('%c', 'color: #00e600', ctx);
    const boardHexes: IBoardHexes = G.boardHexes
    const startZones: IStartZones = G.startZones
    const armyCardsInGame: IStartingArmyCards = G.armyCardsInGame
    const startingUnits: IStartingUnits = G.startingUnits
    const coreHeroscapeCards: ICoreHeroscapeCard[] = G.coreHeroscapeCards

    const currentPhase: string = ctx.phase
    const currentPlayer: string = ctx.currentPlayer = ctx.phase
    const activePlayers = ctx.activePlayers
    const numPlayers: number = ctx.numPlayers
    const currentTurn: number = ctx.turn
    const currentRound = Math.floor((currentTurn - 1) / numPlayers)

    const { placeUnit } = moves
    const startZone: string[] = startZones[playerID]
    const allUnits = Object.values(startingUnits)

    const [activeHexID, setActiveHexID] = useState('')
    const [activeUnitID, setActiveUnitID] = useState('')
    const [availableUnits, setAvailableUnits] = useState(() => (initialAvailableUnits(allUnits)))

    const [errorMsg, setErrorMsg] = useState('')

    const selectedUnit = startingUnits[activeUnitID]

    function initialAvailableUnits(allUnits) {
        return allUnits
            .filter((unit: IUnit) => unit.playerID === playerID)
            .filter((unit: IUnit) => (!Object.keys(startingUnits).includes(unit.unitID)))
            .map((gameUnit: IUnit) => {
                return {
                    unitID: gameUnit.unitID,
                    name: armyCardsInGame[gameUnit.hsCardID].name,
                    image: armyCardsInGame[gameUnit.hsCardID].image,
                }
            })
    }

    function onClickBoardHex(event: Event, sourceHex: IBoardHex) {
        const hexID = sourceHex.id
        const isInStartZone = startZone.includes(hexID)
        // EITHER
        //  Select hex
        if (!activeUnitID) {
            console.log("SELECT HEX", activeUnitID)
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
            console.log("CANNOT PLACE UNIT -- choose hex inside start zone", activeUnitID)
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
    const dataReadoutProps = {
        currentPhase,
        currentPlayer,
        activePlayers,
        numPlayers,
        currentTurn,
        currentRound,
    }

    return (
        <BoardContextProvider>
            <LayoutFlexColumn>
                <TopConsole>
                    <ArmyForPlacing
                        availableUnits={availableUnits}
                        activeUnitID={activeUnitID}
                        onClickUnit={onClickPlacementUnit}
                        errorMsg={errorMsg}
                    />
                </TopConsole>
                <MainDisplay className={`board-${playerID}`}>
                    <MapDisplay
                        mapProps={mapProps}
                    />
                </MainDisplay>
                <BottomConsole>
                    <DataReadout
                        activeHex={boardHexes[activeHexID]}
                        dataReadoutProps={dataReadoutProps}
                    />
                </BottomConsole>
            </LayoutFlexColumn >
        </BoardContextProvider>
    )
}
const LayoutFlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    background-color: black;
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    `;
const TopConsole = styled.div`
    color: white;
    height: 10%;
    width: 100%;
    `;
const MainDisplay = styled.div`
    height: 75%;
    overflow: scroll;
    ::-webkit-scrollbar {
        width: 1em;
    }
    /* Track */
    ::-webkit-scrollbar-track-piece {
        box-shadow: inset 0 0 5px red;
        border-radius: 10px;
    }
/* Handle */
::-webkit-scrollbar-thumb {
  background: blue;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: orange;
}
  `;
const BottomConsole = styled.div`
    color: white;
    height: 15%;
    width: 100%;
  `
