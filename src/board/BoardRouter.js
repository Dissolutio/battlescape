import React from 'react'
import PlacementBoard from './PlacementBoard'
import Board from './Board'

export default function BoardRouter({ G, ctx, moves, events }) {
  if (ctx.phase === 'placeArmies') {
    return <PlacementBoard G={G} ctx={ctx} moves={moves} />
  }
  else if (ctx.phase === 'showtime') {
    return <Board G={G} ctx={ctx} moves={moves} />
  }
  return (
    <div>

    </div>
  )
}
