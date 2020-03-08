import { TurnOrder } from 'boardgame.io/core';
import { Stage } from 'boardgame.io/core';

export const placeArmies = {
  moves: { placeUnit },
  turn: {
    order: TurnOrder.DEFAULT,
    activePlayer: { all: Stage.NULL },
    // stages: {
    //   placingArmy: {
    //     moves: { placeUnit },
    //   },
    // },
  },
  setActivePlayers: {
    all: 'armyPlacement'
  }
}
function placeUnit(G, ctx, hexId, unitGameId) {
  G.boardHexes[hexId].unitGameId = unitGameId
}

