import { TurnOrder } from 'boardgame.io/core';

export const placeArmies = {
  moves: { finalize },
  turn: { order: TurnOrder.DEFAULT },
  setActivePlayers: {
    all: 'armyPlacement'
  }
}

function finalize(G, ctx) {
  ctx.events.endTurn()
}

