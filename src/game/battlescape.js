import { TurnOrder, PlayerView, Stage } from 'boardgame.io/core';

import { boardHexes, startZones, boardHexesWithPrePlacedUnits } from './constants/mapGen'
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
            initiative: {},
            coreHeroscapeCards,
        }
    },
    moves: {
        placeUnit,
    },
    seed: 'random_string',
    phases: {
        'placeArmies': {
            start: true,
            turn: {
                order: TurnOrder.DEFAULT,
                // order: TurnOrder.CUSTOM_FROM('initiative'),
            },
            onBegin: (G, ctx) => { ctx.events.setActivePlayers({ all: Stage.NULL }) },
        },
    },
    endIf: (G, ctx) => { },
    events: {
        // Don't let clients call this?
        endGame: false,
    },
    playerView: PlayerView.STRIP_SECRETS,
}

function placeUnit(G, ctx, hexId, unit) {
    G.boardHexes[hexId].occupyingUnitID = unit.unitID
}