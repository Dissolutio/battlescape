import React from 'react'
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
// import { SocketIO } from "boardgame.io/multiplayer";
import BoardRouter from './board/BoardRouter'
import { Battlescape } from './game/battlescape'

const BattlescapeClient = Client({
  game: Battlescape,
  board: BoardRouter,
  multiplayer: Local(),
  // multiplayer: SocketIO({server: 'localhost:8000'}),
  numPlayers: 2,
  debug: true,
  enhancer: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

const App = () => (
  <div
    style={{ maxWidth: "600px", padding: "2rem" }}
  >
    <h1>Player 0 View:</h1>
    <BattlescapeClient playerID="0" />
    <br />
    <h1>Player 1 View:</h1>
    <BattlescapeClient playerID="1" />
  </div>
);



export default App;