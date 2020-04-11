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
    const boardHexes: IBoardHexes = G.boardHexes
    const startZones: IStartZones = G.startZones
    const armyCardsInGame: IStartingArmyCards = G.armyCardsInGame
    const startingUnits: IStartingUnits = G.startingUnits
    const coreHeroscapeCards: ICoreHeroscapeCard[] = G.coreHeroscapeCards
    const mapSize = G.mapSize

    const currentPhase: string = ctx.phase
    const currentPlayer: string = ctx.currentPlayer
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
    const [zoomLevel, setZoomLevel] = useState(5)
    const [errorMsg, setErrorMsg] = useState('')

    const selectedUnit = startingUnits[activeUnitID]

    function initialAvailableUnits(allUnits) {
        const unitsOnBoard: string[] = Object.values(boardHexes).map(hex => hex.occupyingUnitID).filter(id => Boolean(id))
        console.log('%c⧭', 'color: #917399', unitsOnBoard);
        return allUnits
            .filter((unit: IUnit) => unit.playerID === playerID)
            // remove if unit is on board
            .filter((unit: IUnit) => {
                return (!Object.keys(startingUnits).includes(unit.unitID))
            })
            .map((gameUnit: IUnit) => {
                return {
                    unitID: gameUnit.unitID,
                    name: armyCardsInGame[gameUnit.hsCardID].name,
                    image: armyCardsInGame[gameUnit.hsCardID].image,
                }
            })
    }

    function onClickBoardHex(event: Event, sourceHex: IBoardHex) {
        // Keep from causing onMapClick
        event.stopPropagation()
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

    function onClickMapBackground() {
        console.log("MAP BG CLICKED")
        setActiveHexID('')
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
        mapSize,
        zoomLevel,
        armyCardsInGame,
        startingUnits,
        playerID,
        activeHexID,
        activeUnitID,
        onClickBoardHex,
        onClickMapBackground,
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
                <MainDisplay className={`board-${playerID}`} >
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
    /* position: fixed;
    top: 0; */
    color: white;
    height: 10%;
    width: 100%;
`;
const MainDisplay = styled.div`
    height: 75%;
    overflow: scroll;
    width: 100%;
    &.board-0 {
        background: var(--black);
        background: radial-gradient(ellipse at top, var(--blue), transparent), radial-gradient(ellipse at bottom, var(--black), transparent);
        /* background: linear-gradient(121deg, var(--blue) 0%, rgba(53,53,54,1) 50%, rgba(53,53,54,1) 100%); */
        ::-webkit-scrollbar-track-piece {
            box-shadow: inset 0 0 3px var(--blue);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--blue);
        }
    }
    &.board-1 {
        background: var(--black);
        background: radial-gradient(ellipse at top, var(--red), transparent), radial-gradient(ellipse at bottom, var(--black), transparent);
        /* background: linear-gradient(121deg, var(--red) 0%, rgba(53,53,54,1) 50%, rgba(53,53,54,1) 100%); */
        ::-webkit-scrollbar-track-piece {
            box-shadow: inset 0 0 5px var(--red);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--red);
        }
    }
    ::-webkit-scrollbar {
        width: 1rem;
    }
    ::-webkit-scrollbar-track-piece {
        border-radius: 10px;
    }
    ::-webkit-scrollbar-corner {
        background: black;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: var(--neon-orange);
    }
`;

const BottomConsole = styled.div`
    /* position: fixed;
    bottom: 0; */
    height: 15%;
    width: 100%;
    section.data-readout {
        display: flex;
        flex-flow: column wrap; 
        height: 100%;
        color: white;
        font-size: 0.8rem;
    }
`
