import React from 'react'
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';

import Board from './board/Board'
import { Battlescape } from './game/battlescape'

const BattlescapeClient = Client({
  game: Battlescape,
  board: Board,
  multiplayer: Local(),
  numPlayers: 2,
  debug: false,
  // debug: true,
  enhancer: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

const App = () => (
  <div>
    <h1>Player 0 View:</h1>
    <BattlescapeClient playerID="0" />
    <br />
    <h1>Player 1 View:</h1>
    <BattlescapeClient playerID="1" />
  </div>
);



export default App;