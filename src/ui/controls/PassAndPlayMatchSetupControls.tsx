import React from "react"
import { SERVER } from "App"
import { useBgioClientInfo, useBgioG, useBgioMoves } from "bgio-contexts"

export const PassAndPlayMatchSetupControls = () => {
  const { G } = useBgioG()
  const { moves } = useBgioMoves()
  const clientInfo = useBgioClientInfo()
  const { matchID, matchData, playerID } = clientInfo
  const { playerInfos, numPlayers: maxNumPlayers, passAndPlay } = G

  // effect -- join game, set playerInfo
  React.useEffect(() => {
    if (!playerID) {
      return
    }
    // Default Player Info on first time joining game
    if (!playerInfos.hasOwnProperty(playerID)) {
      moves.updatePlayerInfo(playerID, `Local Player-${playerID}`, true)
    }
  }, [playerInfos, moves, playerID])

  const numPlayers = Object.values(playerInfos).length
  const numFreeSpots = maxNumPlayers - Object.keys(playerInfos).length
  const matchLink = `${SERVER}/match/${matchID}`
  const imTheOwner = playerID === "0"

  const inviteHeader = !passAndPlay ? (
    <div className="gameSetupInviteWrap alert alert-primary">
      <div>
        <div className="inviteContentWrap">
          <b>Share this link to invite players</b>
          <div className="inviteLinkWrap">
            <span className="inviteLink badge badge-primary user-select-all">
              {matchLink}
            </span>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm copyBtn"
              onClick={() => navigator.clipboard.writeText(matchLink)}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null

  const freeSpot = numFreeSpots > 0 && (
    <div className="gameSetupPlayer gameSetupPlayerFree">
      Waiting for players to join
    </div>
  )
  const allReady = numPlayers >= 2
  const canStart = passAndPlay || numPlayers >= 2

  const startButton = imTheOwner && (
    <button
      className="btn btn-primary startButton"
      onClick={() => moves.startMatch()}
      // Disabled if not everyone is ready
      disabled={!canStart}
      key="last"
      ref={(input) => input && allReady && input.focus()}
    >
      {passAndPlay
        ? "Start the match!"
        : numPlayers >= 2
        ? `Start with ${numPlayers} players!`
        : "You need at least 2 players"}
    </button>
  )

  return (
    <>
      {inviteHeader}
      <h1>Pass and Play Lobby</h1>
      <p>Players</p>
      <p>Options</p>
      {startButton}
    </>
  )
}
