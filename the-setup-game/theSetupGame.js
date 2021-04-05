"use strict";
exports.__esModule = true;
exports.myOtherGame = exports.theSetupGame = void 0;
var core_1 = require("boardgame.io/core");
var setup = function (ctx, setupData) {
    // we might want to default to true, leaving it for now
    var passAndPlay = setupData === null || setupData === void 0 ? void 0 : setupData.passAndPlay;
    // Create G properties per player
    var playerInfos = {};
    // For pass-and-play games we set default player names.
    if (passAndPlay) {
        for (var i = 0; i < ctx.numPlayers; ++i) {
            playerInfos[i.toString()] = {
                name: "Player " + (i + 1),
                color: i,
                ready: false
            };
        }
    }
    var scores = {};
    for (var i = 0; i < ctx.numPlayers; ++i) {
        scores[i] = 0;
    }
    return {
        scores: scores,
        passAndPlay: passAndPlay,
        numPlayers: ctx.numPlayers,
        playerInfos: playerInfos
    };
};
var setName = function (G, ctx, name, playerID) {
    if (playerID === void 0) { playerID = "0"; }
    // Nothing happens if the name is empty.
    // This way we make sure a player without a name is not ready.
    if (!name) {
        return;
    }
    playerID = G.passAndPlay ? playerID : ctx.playerID;
    // G.playerInfos[playerID].name = name.substring(0, PLAYER_NAME_MAX_LEN);
    G.playerInfos[playerID].name = name;
};
var setColor = function (G, ctx, color, playerID) {
    if (playerID === void 0) { playerID = "0"; }
    playerID = G.passAndPlay ? playerID : ctx.playerID;
    // If we are not actually changing the color we can ignore this.
    // This happens when we click on the same color we already have.
    if (G.playerInfos[playerID].color === color) {
        return;
    }
    // It's an invalid move if someone else already has that color.
    if (Object.values(G.playerInfos).some(function (info) { return info.color === color; })) {
        return core_1.INVALID_MOVE;
    }
    G.playerInfos[playerID].color = color;
};
exports.theSetupGame = {
    name: "theSetupGame",
    setup: setup,
    phases: {
        // Phase where we wait for everyone to join, choose a name, colors, etc.
        setup: {
            start: true,
            turn: {
                onBegin: function (G, ctx) {
                    ctx.events.setActivePlayers({ all: "setup" });
                },
                // There is only one stage, but we need it for all the players to be able to
                // interact in any order.
                stages: {
                    setup: {
                        moves: {
                            // Join a new game with potentially a prefered name and color.
                            join: function (G, ctx, playerName, playerColor) {
                                if (G.passAndPlay) {
                                    console.error("INVALID_MOVE: Nobody does this in pass and play, weirdo");
                                    return core_1.INVALID_MOVE;
                                }
                                // If we have already joined, we ignore this.
                                if (G.playerInfos.hasOwnProperty(ctx.playerID)) {
                                    return;
                                }
                                // Find the next available color.
                                var availableColors = Array(6).fill(true);
                                Object.values(G.playerInfos).forEach(function (playerInfo) { return (availableColors[playerInfo.color] = false); });
                                // We shouldn't need this fallback because there as more colors than
                                // players.
                                var newColor = 0;
                                if (playerColor != null && availableColors[playerColor]) {
                                    // If we supplied a prefered color and if it's available, we use that.
                                    newColor = playerColor;
                                }
                                else {
                                    // Otherwise we take the next available color.
                                    availableColors.some(function (available, color) {
                                        if (available) {
                                            newColor = color;
                                            return true;
                                        }
                                        return false;
                                    });
                                }
                                if (!playerName) {
                                    playerName = "Player " + (parseInt(ctx.playerID) + 1);
                                }
                                G.playerInfos[ctx.playerID] = {
                                    name: playerName,
                                    color: newColor,
                                    ready: false
                                };
                            },
                            setName: setName,
                            setColor: setColor,
                            setReady: function (G, ctx, playerID, ready) {
                                if (G.passAndPlay) {
                                    return core_1.INVALID_MOVE;
                                }
                                G.playerInfos[playerID].ready = ready;
                            },
                            startMatch: function (G, ctx) {
                                if (ctx.playerID !== "0") {
                                    return core_1.INVALID_MOVE;
                                }
                                // If some players are not ready, we can't start the game. Not ready is
                                // the same as writing down your name, at least for now.
                                if (Object.values(G.playerInfos).some(function (info) { return !info.name; })) {
                                    return core_1.INVALID_MOVE;
                                }
                                // Set the number of players
                                G.numPlayers = G.passAndPlay
                                    ? ctx.numPlayers
                                    : Object.keys(G.playerInfos).length;
                                ctx.events.endPhase();
                            }
                        }
                    }
                }
            }
        }
    }
};
exports.myOtherGame = {
    name: "myOtherGame",
    setup: function (ctx, setupData) {
        return { score: { "0": 0, "1": 0 } };
    },
    moves: {
        increaseScore: increaseScore
    },
    minPlayers: 2,
    maxPlayers: 2
};
function increaseScore(G, ctx) {
    G.score["" + ctx.currentPlayer]++;
}
