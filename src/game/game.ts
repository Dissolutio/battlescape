import { TurnOrder, PlayerView } from "boardgame.io/core"
import { BoardProps } from "boardgame.io/react"

import {
  calcUnitMoveRange,
  selectUnitsForCard,
  selectUnrevealedGameCard,
} from "./g-selectors"
import {
  phaseNames,
  stageNames,
  OM_COUNT,
  generateBlankOrderMarkers,
  generateBlankMoveRange,
  generateBlankPlayersOrderMarkers,
} from "./constants"

import { GameState, OrderMarker, GameUnit } from "./types"
import { moves } from "./moves"
import { rollD20Initiative } from "./rollInitiative"
import { hexagonMapScenario, testScenario } from "./setup"

export const defaultSetupData = hexagonMapScenario

export const HexedMeadow = {
  name: "HexedMeadow",
  setup: (_ctx) => {
    // Setup returns G - the initial bgio game state
    return hexagonMapScenario
    // return testScenario
  },
  moves,
  seed: "random_string",
  playerView: PlayerView.STRIP_SECRETS,
  phases: {
    //PHASE-PLACEMENT
    [phaseNames.placement]: {
      start: true,
      //onBegin
      onBegin: (G: GameState, ctx: BoardProps["ctx"]) => {
        ctx.events.setActivePlayers({ all: stageNames.placingUnits })
      },
      //endIf
      endIf: (G: GameState) => {
        return G.placementReady["0"] && G.placementReady["1"]
      },
      next: phaseNames.placeOrderMarkers,
    },
    //PHASE-ORDER MARKERS
    [phaseNames.placeOrderMarkers]: {
      //onBegin
      onBegin: (G: GameState, ctx: BoardProps["ctx"]) => {
        //🛠 reset state in future rounds
        if (G.currentRound > 0) {
          G.orderMarkers = generateBlankOrderMarkers()
          G.orderMarkersReady = {
            "0": false,
            "1": false,
          }
        }
        //🛠 set player stages
        ctx.events.setActivePlayers({ all: stageNames.placeOrderMarkers })
      },
      //endIf - -all players are ready
      endIf: (G: GameState) => {
        return G.orderMarkersReady["0"] && G.orderMarkersReady["1"]
      },
      next: phaseNames.roundOfPlay,
    },
    //PHASE-ROUND OF PLAY - after last turn, end RoundOfPlay phase, go to PlaceOrderMarkers phase ⤵
    [phaseNames.roundOfPlay]: {
      //onBegin
      onBegin: (G: GameState, ctx: BoardProps["ctx"]) => {
        //🛠 Setup Unrevealed Order Markers
        G.orderMarkers = Object.keys(G.players).reduce(
          (orderMarkers, playerID) => {
            return {
              ...orderMarkers,
              [playerID]: Object.values(
                G.players[playerID].orderMarkers
              ).map((om) => ({ gameCardID: om, order: "" })),
            }
          },
          {}
        )
        //🛠 Roll Initiative
        const initiativeRoll = rollD20Initiative(["0", "1"])
        G.initiative = initiativeRoll
        G.currentOrderMarker = 0
      },
      //onEnd
      onEnd: (G: GameState, ctx: BoardProps["ctx"]) => {
        // clear secret order marker state
        G.players["0"].orderMarkers = generateBlankPlayersOrderMarkers()
        G.players["1"].orderMarkers = generateBlankPlayersOrderMarkers()
        //🛠 Setup for Next Round
        G.orderMarkersReady = { "0": false, "1": false }
        G.roundOfPlayStartReady = { "0": false, "1": false }
        G.currentOrderMarker = 0
        G.currentRound += 1
      },
      //TURN-Round Of Play
      turn: {
        order: TurnOrder.CUSTOM_FROM("initiative"),
        //onBegin
        onBegin: (G: GameState, ctx: BoardProps["ctx"]) => {
          // Reveal order marker
          const revealedGameCardID =
            G.players[ctx.currentPlayer].orderMarkers[
              G.currentOrderMarker.toString()
            ]
          const indexToReveal = G.orderMarkers[ctx.currentPlayer].findIndex(
            (om: OrderMarker) =>
              om.gameCardID === revealedGameCardID && om.order === ""
          )
          if (indexToReveal >= 0) {
            G.orderMarkers[ctx.currentPlayer][
              indexToReveal
            ].order = G.currentOrderMarker.toString()
          }
          // Assign move points/ranges
          const currentPlayersOrderMarkers =
            G.players[ctx.currentPlayer].orderMarkers
          const unrevealedGameCard = selectUnrevealedGameCard(
            currentPlayersOrderMarkers,
            G.armyCards,
            G.currentOrderMarker
          )
          const currentTurnUnits = selectUnitsForCard(
            unrevealedGameCard.gameCardID,
            G.gameUnits
          )
          const movePoints = unrevealedGameCard.move
          let newGameUnits = { ...G.gameUnits }

          //🛠 loop thru this turns units
          currentTurnUnits.length &&
            currentTurnUnits.forEach((unit: GameUnit) => {
              const { unitID } = unit
              // move points
              const unitWithMovePoints = {
                ...unit,
                movePoints,
              }
              newGameUnits[unitID] = unitWithMovePoints
              // move range
              const moveRange = calcUnitMoveRange(
                unitWithMovePoints,
                G.boardHexes,
                newGameUnits
              )
              const unitWithMoveRange = {
                ...unitWithMovePoints,
                moveRange,
              }
              newGameUnits[unitID] = unitWithMoveRange
            })
          //🛠 end loop

          //🛠 update G
          G.gameUnits = newGameUnits
          G.unitsMoved = []
          G.unitsAttacked = []
        },
        //onEnd
        onEnd: (G: GameState, ctx: BoardProps["ctx"]) => {
          //🛠 reset unit move points and ranges
          Object.keys(G.gameUnits).forEach((uid) => {
            G.gameUnits[uid].movePoints = 0
            G.gameUnits[uid].moveRange = { ...generateBlankMoveRange() }
          })
          //🛠 handle turns & order markers
          const isLastTurn = ctx.playOrderPos === ctx.numPlayers - 1
          const isLastOrderMarker = G.currentOrderMarker >= OM_COUNT - 1
          if (isLastTurn && !isLastOrderMarker) {
            G.currentOrderMarker++
          }
          //🛠 END RoundOfPlay phase after last turn
          if (isLastTurn && isLastOrderMarker) {
            ctx.events.setPhase(phaseNames.placeOrderMarkers)
          }
        },
      },
    },
  },
  events: {
    endGame: false,
  },
  // The minimum and maximum number of players supported
  // (This is only enforced when using the Lobby server component.)
  minPlayers: 2,
  maxPlayers: 2,
  // Ends the game if this returns anything.
  // The return value is available in `ctx.gameover`.
  endIf: (G, ctx) => {
    const gameUnitsArr = Object.values(G.gameUnits)
    const isP0Dead = !gameUnitsArr.some((u: GameUnit) => u.playerID === "0")
    const isP1Dead = !gameUnitsArr.some((u: GameUnit) => u.playerID === "1")
    if (isP0Dead) {
      return { winner: "1" }
    } else if (isP1Dead) {
      return { winner: "0" }
    } else {
      return false
    }
  },
  // Called at the end of the game.
  // `ctx.gameover` is available at this point.
  onEnd: (G, ctx) => {
    const winner = ctx.gameover.winner === "0" ? "BEES" : "BUTTERFLIES"
    console.log(`THE ${winner} WON!`)
  },
}
