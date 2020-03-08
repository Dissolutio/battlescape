export default {
  mapBuilding: {
    onBegin: (G, ctx) => G,
    onEnd: (G, ctx) => G,
    endIf: (G, ctx) => (1 === -1),
    moves: { addTile, removeTile },
    turn: {
      onBegin: (G, ctx) => G,
      onEnd: (G, ctx) => G,
      endIf: (G, ctx) => (1 === -1),
    }
  }
}

function addTile(G, ctx, hex) {
  G.boardHexes["q-1r0s1"].altitude++;
}
function removeTile(G, ctx, hex) {
  const oldAltitude = G.boardHexes["q-1r0s1"].altitude
  if (oldAltitude <= 0) {
    return
  }
  G.boardHexes["q-1r0s1"].altitude--
}