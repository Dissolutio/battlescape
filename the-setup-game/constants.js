"use strict";
var _a, _b, _c, _d, _e, _f;
exports.__esModule = true;
exports.SERVER = exports.PLAYER_NAME_MAX_LEN = exports.NUM_COLORS = exports.MAX_PLAYERS = exports.multiplayerSetupData = exports.passAndPlaySetupData = void 0;
exports.passAndPlaySetupData = {
    passAndPlay: true
};
exports.multiplayerSetupData = {
    passAndPlay: false
};
exports.MAX_PLAYERS = 6;
exports.NUM_COLORS = 7;
exports.PLAYER_NAME_MAX_LEN = 16;
// We also use the constants on the backend server, for which `window` is not defined.
var isDeploymentEnv = process.env.NODE_ENV === "production";
var isDevEnv = process.env.NODE_ENV === "development";
var isSeparateServer = Boolean(process.env.REACT_APP_WITH_SEPARATE_SERVER);
var isLocalApp = isDevEnv && !isSeparateServer;
// use appropriate address for server
var hostname = (_b = (_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.hostname) !== null && _b !== void 0 ? _b : "";
var protocol = (_d = (_c = window === null || window === void 0 ? void 0 : window.location) === null || _c === void 0 ? void 0 : _c.protocol) !== null && _d !== void 0 ? _d : "";
var port = (_f = (_e = window === null || window === void 0 ? void 0 : window.location) === null || _e === void 0 ? void 0 : _e.port) !== null && _f !== void 0 ? _f : "";
var deploymentServerAddr = protocol + "//" + hostname + (port ? ":" + port : "");
var localServerAddr = "http://localhost:8000";
exports.SERVER = isDeploymentEnv ? deploymentServerAddr : localServerAddr;
