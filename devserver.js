const Server = require("boardgame.io/server").Server
// const HexedMeadow = require("./server/game").HexedMeadow
const theSetupGame = require("./the-setup-game/theSetupGame").theSetupGame
// const myGame = require("./the-setup-game/game").myGame
// const myOtherGame = require("./server/game").myOtherGame

// const server = Server({ games: [myGame, myOtherGame] })
const server = Server({ games: [theSetupGame] })
const PORT = process.env.PORT || 8000

server.run(PORT, () => console.log("dev server running at: PORT"))
