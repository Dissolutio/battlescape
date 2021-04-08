import React from "react"
import { SERVER } from "App"
import { useBgioClientInfo, useBgioG, useBgioMoves } from "bgio-contexts"

const GameSetup = () => {
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
    // If it's the first time we join that game, we tell the game. It's going to assign
    // us a default name and whatever else
    if (!playerInfos.hasOwnProperty(playerID)) {
      // Use the name/color from localStorage if there is one.
      const playerName = `Player${playerID}`
      // set the name somehow
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
    <div className="gameSetupWrap">
      {inviteHeader}
      <div className="container gameSetupContentWrapWrap">
        <div className="gameSetupContentWrap">
          <h1>Lobby</h1>
          <div className="sectionName">Players</div>
          {freeSpot}
          <div className="sectionName">Options</div>
          {startButton}
        </div>
      </div>
    </div>
  )
}

export default GameSetup
