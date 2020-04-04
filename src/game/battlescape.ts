import { TurnOrder, PlayerView, Stage } from 'boardgame.io/core';

import { boardHexes, startZones } from './constants/mapGen'
import { startingUnits, armyCardsInGame } from './constants/startingUnits'
import { coreHeroscapeCards } from './constants/coreHeroscapeCards'

const placeArmies = {
    start: true,
    moves: {
        placeUnit: (G, ctx, hexId, unit) => {
            G.boardHexes[hexId].unitGameId = unit.gameId
        }
    },
    turn: {
        order: TurnOrder.DEFAULT,
        // order: TurnOrder.CUSTOM_FROM('initiative'),
        activePlayer: { all: Stage.NULL },
    },
    setActivePlayers: {
        all: 'armyPlacement'
    }
}

export const Battlescape = {
    name: 'Battlescape',
    setup: () => (
        {
            boardHexes,
            startZones,
            armyCardsInGame,
            startingUnits,
            initiative: {},
            // FOR PLAYING WITH
            coreHeroscapeCards,
        }
    ),
    seed: 'random_string',
    phases: {
        placeArmies,
    },
    endIf: (G, ctx) => (() => false),
    events: {
        // Don't let clients call this?
        endGame: false,
    },
    playerView: PlayerView.STRIP_SECRETS,
}