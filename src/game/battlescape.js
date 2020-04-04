import { TurnOrder, PlayerView, Stage } from 'boardgame.io/core';

import { boardHexes, startZones } from './constants/mapGen'
import { startingUnits, armyCardsInGame } from './constants/startingUnits'
import { coreHeroscapeCards } from './constants/coreHeroscapeCards'

console.log("coreHeroscapeCards", coreHeroscapeCards)
console.log("startingUnits, armyCardsInGame", startingUnits, armyCardsInGame)
console.log("boardHexes, startZones", boardHexes, startZones)


export const Battlescape = {
    name: 'Battlescape',
    setup: () => (
        {
            boardHexes,
            startZones,
            armyCardsInGame,
            startingUnits,
            initiative: {},
            coreHeroscapeCards,
        }
    ),
    seed: 'random_string',
    phases: {
        'placeArmies': {
            start: true,
            moves: {
                // placeUnit: (G, ctx, hexId, unit) => {
                //     G.boardHexes[hexId].unitGameId = unit.unitId
                // }
                placeUnit: () => { }
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
    },
    endIf: (G, ctx) => (() => false),
    events: {
        // Don't let clients call this?
        endGame: false,
    },
    playerView: PlayerView.STRIP_SECRETS,
}