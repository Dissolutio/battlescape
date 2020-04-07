const Battlescape = require('./game/battlescape').Battlescape;

const Server = require('boardgame.io/server').Server;

const server = Server({
  games: [Battlescape],
});

server.run(8000, () => console.log("server running..."));