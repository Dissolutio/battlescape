import React from 'react'

export const DataReadout = ({ activeHex, dataReadoutProps }) => {
  const {
    currentPhase,
    currentPlayer,
    activePlayers,
    numPlayers,
    currentTurn,
    currentRound,
  } = dataReadoutProps

  console.log("DataReadout -> activeHex", activeHex)
  return (
    <div>
      <div>ActiveHex: {`${(activeHex && activeHex.id) || 'none'}`}</div>
      <div>Unit on Hex: {`${(activeHex && activeHex.occupyingUnitID) || 'none'}`}</div>
      <div>currentPhase: "{currentPhase}"</div>
      <div>currentPlayer: {currentPlayer}</div>
      <div>numPlayers: {numPlayers}</div>
      <div>currentTurn: {currentTurn}</div>
      <div>currentRound: {currentRound}</div>
    </div>
  )
}

