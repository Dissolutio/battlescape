import { TurnOrder, PlayerView, Stage } from 'boardgame.io/core';

import {
    boardHexesWithPrePlacedUnits,
    boardHexes,
    startZones,
    mapSize,
    IBoardHexes,
    IStartZones,
} from './constants/mapGen'
import { startingUnits, armyCardsInGame, IStartingArmyCards, IStartingUnits } from './constants/startingUnits'
import { coreHeroscapeCards, ICoreHeroscapeCard } from './constants/coreHeroscapeCards'

export interface GameState {
    boardHexes: IBoardHexes
    startZones: IStartZones
    armyCardsInGame: IStartingArmyCards
    startingUnits: IStartingUnits
    coreHeroscapeCards: ICoreHeroscapeCard[]
    mapSize: number
    initiative: string[]
}

const initialGameState: GameState = {
    boardHexes: boardHexesWithPrePlacedUnits(),
    // boardHexes,
    startZones,
    armyCardsInGame,
    startingUnits,
    mapSize,
    coreHeroscapeCards,
    initiative: ['0', '1'],
}

export const Battlescape = {
    name: 'Battlescape',
    setup: () => initialGameState,
    moves: {
        placeUnit,
    },
    seed: 'random_string',
    phases: {
        mainGame: {
            start: true,
            turn: {
                order: TurnOrder.CUSTOM_FROM('initiative'),
            },
            onBegin: (G, ctx) => {
                // ctx.events.setActivePlayers({ all: 'placingArmies' })
                console.log("GAME BEGINS")
            },
        },
    },
    endIf: (G, ctx) => { },
    events: {
        endGame: false,
    },
    playerView: PlayerView.STRIP_SECRETS,
}

function placeUnit(G, ctx, hexId, unit) {
    G.boardHexes[hexId].occupyingUnitID = unit.unitID
}

// function rollInitiative() {
//     const players = [...Array(4).keys()]
//     const exampleRollResult = [
//         { roll: 20, playerID: '0' },
//         { roll: 19, playerID: '1' },
//         { roll: 19, playerID: '2' },
//         { roll: 19, playerID: '3' },
//     ]
// }