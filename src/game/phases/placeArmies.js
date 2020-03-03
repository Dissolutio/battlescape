import { TurnOrder } from 'boardgame.io/core';

export const placeArmies = {
  moves: { selectUnit, deselectUnit, placeUnit, finalize },
  turn: { order: TurnOrder.DEFAULT },
}

function selectUnit(G, ctx, gameUnitID) {
  return { ...G }
}
function deselectUnit(G, ctx, hex) {
  return { ...G }
}
function placeUnit(G, ctx, hex) {
  return { ...G }
}
function finalize(G, ctx, hex) {
  ctx.events.endTurn()
  return { ...G }
}

