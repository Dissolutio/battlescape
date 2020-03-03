import { TurnOrder } from 'boardgame.io/core';
// import { hexagonMap } from './constants/mapGen'
// import { armyCardsInGame, startingUnits } from './constants/startingUnits'
// FOR DEV PURPOSES
import simpleState from './constants/simpleState'

export const Battlescape = {
    name: 'Battlescape',
    setup: () => (
        {
            ...simpleState
        }
    ),
    moves: {
        selectUnit: (G, ctx, ...args) => {
            console.log("TCL: args", args)
            return G
        },
        moveUnit: (G, ctx, ...args) => {
            console.log("TCL: args", args)
            return G
        },
    },
    seed: 'random-string',
    phases: {
        startGame: {
            start: true,
            turn: {
                order: TurnOrder.DEFAULT,
                // order: TurnOrder.CUSTOM_FROM('initiative'),
                // initiative: [1, 0],
            },
        }
    },
    endIf: (G, ctx) => (1 === -1)
}