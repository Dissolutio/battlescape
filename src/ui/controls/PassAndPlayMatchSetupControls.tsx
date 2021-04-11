import React from "react"
import {
  useBgioClientInfo,
  useBgioEvents,
  useBgioG,
  useBgioMoves,
} from "bgio-contexts"

export const PassAndPlayMatchSetupControls = () => {
  const { G } = useBgioG()
  const { moves } = useBgioMoves()
  const { events } = useBgioEvents()
  const clientInfo = useBgioClientInfo()
  const { playerID } = clientInfo
  const { playerInfos } = G

  // effect -- join game, set playerInfo
  React.useEffect(() => {
    if (!playerID) {
      return
    }
    if (!playerInfos.hasOwnProperty(playerID)) {
      moves.updatePlayerInfo(playerID, `Local Player-${playerID}`, true)
    }
  }, [playerInfos, moves, playerID])

  const imTheOwner = playerID === "0"
  const startButton = imTheOwner && (
    <button onClick={() => events.endPhase()}>Start the match!</button>
  )

  return (
    <>
      <h1>Pass and Play Lobby</h1>
      <p>Players</p>
      <p>Options</p>
      {startButton}
    </>
  )
}
