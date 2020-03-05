import React from 'react'
import Board from './Board'

export default function BoardRouter({ G, ctx }) {
  if (ctx.phase === 'placeArmies') {
    return <Board G={G} ctx={ctx} />
  }
  else if (ctx.phase === 'showtime') {
    return <Board G={G} ctx={ctx} />
  }
  return (
    <div>

    </div>
  )
}
