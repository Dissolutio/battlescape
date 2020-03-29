import { TurnOrder, PlayerView, Stage } from 'boardgame.io/core';

import { hexagonMap, startZones } from './constants/mapGen'
import { startingUnits, armyCardsInGame } from './constants/startingUnits'

const initialData = {
    name: 'state',
    startZones,
    startingUnits,
    armyCardsInGame,
    boardHexes: hexagonMap,
    players: initializePlayerState(),
    secret: {
        key: 'secretzzz'
    },
}

export const Battlescape = {
    name: 'Battlescape',
    setup: (ctx, setupData) => {
        // setupData can be sent from Lobby component on create Game
        const G = { ...initialData }
        return G
    },
    moves: { playerResign },
    seed: 'random-string',
    phases: {
        placeArmies: {
            moves: { placeUnit },
            start: true,
            turn: {
                order: TurnOrder.DEFAULT,
                activePlayers: { all: Stage.NULL },
            },
            setActivePlayers: {
                all: 'armyPlacement'
            }
        },
        mainGame: {
            moves: { playerResign },
            turn: {
                order: TurnOrder.DEFAULT,
                // order: TurnOrder.CUSTOM_FROM('initiative'),
            },
        },
    },
    endIf: (G, ctx) => (1 === -1),
    playerView: PlayerView.STRIP_SECRETS,
}

export const playerColors = {
    0: 'rgb(1,162,82)',
    1: 'rgb(219,45,32)',
}

function playerResign(G, ctx) {
    ctx.events.endGame({ finalState: 'wonderful' })
}
function placeUnit(G, ctx, hexID, unit) {
    G.boardHexes[hexID].unitGameID = unit.gameID
}
function initializePlayerState() {
    return {
        0: { name: 'OG Zero!!!' },
        1: { name: 'OG #1 !!!' },
    }
}