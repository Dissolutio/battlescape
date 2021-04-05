import { PlayerID } from "boardgame.io"
import { INVALID_MOVE } from "boardgame.io/core"
import { SetupDataType, PlayerInfo } from "./constants"

export interface GameType {
  scores: { [key: number]: number }
  passAndPlay: boolean
  numPlayers: number
  playerInfos: { [key: string]: PlayerInfo }
}

const setup = (ctx, setupData: SetupDataType): GameType => {
  // we might want to default to true, leaving it for now
  const passAndPlay = setupData?.passAndPlay

  // Create G properties per player
  const playerInfos = {}
  // For pass-and-play games we set default player names.
  if (passAndPlay) {
    for (let i = 0; i < ctx.numPlayers; ++i) {
      playerInfos[i.toString()] = {
        name: `Player ${i + 1}`,
        color: i,
        ready: false,
      }
    }
  }
  let scores = {}
  for (let i = 0; i < ctx.numPlayers; ++i) {
    scores[i] = 0
  }

  return {
    scores,
    passAndPlay,
    numPlayers: ctx.numPlayers,
    playerInfos,
  }
}

const setName = (G: GameType, ctx, name: string, playerID: PlayerID = "0") => {
  // Nothing happens if the name is empty.
  // This way we make sure a player without a name is not ready.
  if (!name) {
    return
  }
  playerID = G.passAndPlay ? playerID : ctx.playerID
  // G.playerInfos[playerID].name = name.substring(0, PLAYER_NAME_MAX_LEN);
  G.playerInfos[playerID].name = name
}

const setColor = (
  G: GameType,
  ctx,
  color: number,
  playerID: PlayerID = "0"
) => {
  playerID = G.passAndPlay ? playerID : ctx.playerID

  // If we are not actually changing the color we can ignore this.
  // This happens when we click on the same color we already have.
  if (G.playerInfos[playerID].color === color) {
    return
  }

  // It's an invalid move if someone else already has that color.
  if (Object.values(G.playerInfos).some((info) => info.color === color)) {
    return INVALID_MOVE
  }
  G.playerInfos[playerID].color = color
}

export const theSetupGame = {
  name: "theSetupGame",
  setup,
  phases: {
    // Phase where we wait for everyone to join, choose a name, colors, etc.
    setup: {
      start: true,
      turn: {
        onBegin: (G: GameType, ctx) => {
          ctx.events.setActivePlayers({ all: "setup" })
        },
        // There is only one stage, but we need it for all the players to be able to
        // interact in any order.
        stages: {
          setup: {
            moves: {
              // Join a new game with potentially a prefered name and color.
              join: (
                G: GameType,
                ctx,
                playerName: string | undefined,
                playerColor: number | undefined
              ) => {
                if (G.passAndPlay) {
                  console.error(
                    "INVALID_MOVE: Nobody does this in pass and play, weirdo"
                  )
                  return INVALID_MOVE
                }
                // If we have already joined, we ignore this.
                if (G.playerInfos.hasOwnProperty(ctx.playerID)) {
                  return
                }
                // Find the next available color.
                const availableColors = Array(6).fill(true)

                Object.values(G.playerInfos).forEach(
                  (playerInfo) => (availableColors[playerInfo.color] = false)
                )

                // We shouldn't need this fallback because there as more colors than
                // players.
                let newColor = 0

                if (playerColor != null && availableColors[playerColor]) {
                  // If we supplied a prefered color and if it's available, we use that.
                  newColor = playerColor
                } else {
                  // Otherwise we take the next available color.
                  availableColors.some((available, color) => {
                    if (available) {
                      newColor = color
                      return true
                    }
                    return false
                  })
                }

                if (!playerName) {
                  playerName = `Player ${parseInt(ctx.playerID) + 1}`
                }

                G.playerInfos[ctx.playerID] = {
                  name: playerName,
                  color: newColor,
                  ready: false,
                }
              },
              setName,
              setColor,
              setReady: (
                G: GameType,
                ctx,
                playerID: PlayerID,
                ready: boolean
              ) => {
                if (G.passAndPlay) {
                  return INVALID_MOVE
                }
                G.playerInfos[playerID].ready = ready
              },
              startMatch: (G: GameType, ctx) => {
                if (ctx.playerID !== "0") {
                  return INVALID_MOVE
                }

                // If some players are not ready, we can't start the game. Not ready is
                // the same as writing down your name, at least for now.
                if (Object.values(G.playerInfos).some((info) => !info.name)) {
                  return INVALID_MOVE
                }

                // Set the number of players
                G.numPlayers = G.passAndPlay
                  ? ctx.numPlayers
                  : Object.keys(G.playerInfos).length

                ctx.events.endPhase()
              },
            },
          },
        },
      },
    },
  },
}

export const myOtherGame = {
  name: "myOtherGame",
  setup: (ctx, setupData) => {
    return { score: { "0": 0, "1": 0 } }
  },
  moves: {
    increaseScore,
  },
  minPlayers: 2,
  maxPlayers: 2,
}

function increaseScore(G, ctx) {
  G.score[`${ctx.currentPlayer}`]++
}
