import { TurnOrder, PlayerView } from 'boardgame.io/core';

import { hexagonMap, startZones } from './constants/mapGen'
import { startingUnits, armyCardsInGame } from './constants/startingUnits'
import { players } from './constants/playersState'
import { placeArmies } from './phases/placeArmies'

export const Battlescape = {
    name: 'Battlescape',
    setup: () => (
        {
            startZones,
            startingUnits,
            armyCardsInGame,
            boardHexes: hexagonMap,
            players,
            secret: {
                key: 'secretzzz'
            },
            // initiative: [1, 0],
        }
    ),
    moves: {
        sendChat: (G, ctx, msg) => {
            return G
        },
    },
    seed: 'random-string',
    phases: {
        placeArmies: {
            start: true,
            ...placeArmies,
        },
        showtime: {
            turn: {
                order: TurnOrder.DEFAULT,
                // order: TurnOrder.CUSTOM_FROM('initiative'),
            },
        },
    },
    endIf: (G, ctx) => (1 === -1),
    events: {
        // Don't let clients call this?
        endGame: false,
    },
    playerView: PlayerView.STRIP_SECRETS,
}