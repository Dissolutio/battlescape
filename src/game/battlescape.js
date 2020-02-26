
import { hexagonMap } from './mapGen'
import { armyCardsInGame, startingUnits } from './startingUnits'

export const Battlescape = {
    name: 'Battlescape',
    setup: () => (
        {
            boardHexes: { ...hexagonMap },
            armyCardsInGame: armyCardsInGame,
            startingUnits: startingUnits,
        }
    ),
    moves: {
        addTile: (G, ctx, hex) => {
            G.boardHexes["q-1r0s1"].altitude++;
        },
        removeTile: (G, ctx, hex) => {
            const oldAltitude = G.boardHexes["q-1r0s1"].altitude
            if (oldAltitude <= 0) {
                return
            };
            G.boardHexes["q-1r0s1"].altitude--;
        },
    },
    // Everything below is OPTIONAL.

    // Function that allows you to tailor the game state to a specific player.
    // playerView: (G, ctx, playerID) => G,

    // The seed used by the pseudo-random number generator.
    seed: 'random-string',

    turn: {
        // The turn order.
        //   order: TurnOrder.DEFAULT,

        // Called at the beginning of a turn.
        //   onBegin: (G, ctx) => G,

        // Called at the end of a turn.
        //   onEnd: (G, ctx) => G,

        // Ends the turn if this returns true.
        //   endIf: (G, ctx) => true,

        // Called at the end of each move.
        //   onMove: (G, ctx) => G,

        // Ends the turn automatically after a number of moves.
        // moveLimit: 1,

        // Calls setActivePlayers with this as argument at the
        // beginning of the turn.
        //   activePlayers: { ... },

        //   stages: {
        //     A: {
        //       // Players in this stage are restricted to moves defined here.
        //       moves: { ... },

        //       // Players in this stage will be moved to the stage specified
        //       // here when the endStage event is called.
        //       next: 'B'
        //     },

        //     ...
        //   },
    },

    phases: {
        startGame: {
            // Called at the beginning of a phase.
            onBegin: (G, ctx) => G,

            // Called at the end of a phase.
            onEnd: (G, ctx) => G,

            // Ends the phase if this returns true.
            endIf: (G, ctx) => (1 === -1),

            // Overrides `moves` for the duration of this phase.
            // moves: { ... },

            // Overrides `turn` for the duration of this phase.
            // turn: { ... },
        }
    },
    // Ends the game if this returns anything.
    // The return value is available in `ctx.gameover`.
    // endIf: (G, ctx) => (1 === -1)
}