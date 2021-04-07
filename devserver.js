const Server = require("boardgame.io/server").Server
const HexedMeadow = require("./server/game").HexedMeadow

const server = Server({ games: [HexedMeadow] })
const PORT = process.env.PORT || 8000

server.run(PORT, () => console.log("dev server running at: PORT"))
