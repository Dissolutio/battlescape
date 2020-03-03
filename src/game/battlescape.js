import { TurnOrder, PlayerView } from 'boardgame.io/core';

import { hexagonMap } from './constants/mapGen'
import { startingUnits, armyCardsInGame } from './constants/startingUnits'
import { players } from './constants/playersState'
import { placeArmies } from './phases/placeArmies'

export const Battlescape = {
    name: 'Battlescape',
    setup: () => (
        {
            startingUnits,
            armyCardsInGame,
            boardHexes: hexagonMap,
            players,
            secret: {
                key: 'secretzzz'
            }
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
            turn: {
                order: TurnOrder.DEFAULT,
                // order: TurnOrder.CUSTOM_FROM('initiative'),
                // initiative: [1, 0],
            },
        },
        placeArmies: {
            start: true,
            ...placeArmies
        }
    },
    endIf: (G, ctx) => (1 === -1),
    events: {
        // Don't let clients call this?
        endGame: false,
    },
    playerView: PlayerView.STRIP_SECRETS
}