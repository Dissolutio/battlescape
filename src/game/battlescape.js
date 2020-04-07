import { TurnOrder, PlayerView, Stage } from 'boardgame.io/core';

import {
    boardHexesWithPrePlacedUnits,
    // boardHexes,
    startZones,
} from './constants/mapGen'
import { startingUnits, armyCardsInGame } from './constants/startingUnits'
import { coreHeroscapeCards } from './constants/coreHeroscapeCards'

export const Battlescape = {
    name: 'Battlescape',
    setup: () => {
        return {
            boardHexes: boardHexesWithPrePlacedUnits(),
            // boardHexes,
            startZones,
            armyCardsInGame,
            startingUnits,
            initiative: [],
            coreHeroscapeCards,
        }
    },
    moves: {
        placeUnit,
    },
    seed: 'random_string',
    // turn: {
    //     stages: {
    //         observing: {

    //         }
    //     }
    // },
    phases: {
        placeArmies: {
            start: true,
            turn: {
                order: TurnOrder.DEFAULT,
                // order: TurnOrder.CUSTOM_FROM('initiative'),
            },
            onBegin: (G, ctx) => { ctx.events.setActivePlayers({ all: Stage.NULL }) },
        },
        rollInitiative: {
            turn: {
                order: TurnOrder.CUSTOM_FROM('initiative'),
            },
            onBegin: (G, ctx) => {
                const dice = ctx.random.Die(20, 3);
            },
        }
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

function rollInitiative() {
    const players = [...Array(4).keys()]
    const exampleRollResult = [
        { roll: 20, playerID: '0' },
        { roll: 19, playerID: '1' },
        { roll: 19, playerID: '2' },
        { roll: 19, playerID: '3' },
    ]
}