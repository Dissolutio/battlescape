"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.myOtherGame = exports.myGame = exports.MAX_PLAYERS = exports.defaultSetupData = void 0;
exports.defaultSetupData = {
    score: { "0": 0, "1": 0 }
};
exports.MAX_PLAYERS = 2;
exports.myGame = {
    name: "myGame",
    setup: function (ctx, setupData) {
        var myG = __assign(__assign({}, exports.defaultSetupData), setupData);
        return myG;
    },
    moves: {
        increaseScore: increaseScore
    },
    minPlayers: 2,
    maxPlayers: 2
};
exports.myOtherGame = {
    name: "myOtherGame",
    setup: function (ctx, setupData) {
        var myG = __assign(__assign({}, exports.defaultSetupData), setupData);
        return myG;
    },
    moves: {
        increaseScore: increaseScore
    },
    minPlayers: 2,
    maxPlayers: 2
};
function increaseScore(G, ctx) {
    var currentPlayer = ctx.currentPlayer;
    var currentScore = G.score[currentPlayer];
    G.score["" + currentPlayer] = currentScore + 1;
}
