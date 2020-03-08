import { TurnOrder } from 'boardgame.io/core';
import { Stage } from 'boardgame.io/core';

export const placeArmies = {
  moves: { placeUnit },
  turn: {
    order: TurnOrder.DEFAULT,
    activePlayer: { all: Stage.NULL },
  },
  setActivePlayers: {
    all: 'armyPlacement'
  }
}
function placeUnit(G, ctx, hexId, unit) {
  G.boardHexes[hexId].unitGameId = unit.gameId
}

