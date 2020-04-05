import React, { Component } from 'react'
import { Client, Lobby } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
// import { SocketIO } from "boardgame.io/multiplayer";

import Board from './board/Board'
import { Battlescape } from './game/battlescape'

export const App = () => {

  // return (
  //   <MainLobby />
  // )

  return (
    <>
      <BattlescapeClient gameID="gameid" playerID="0" />
      <BattlescapeClient gameID="gameid" playerID="1" />
    </>
  );
}

const BattlescapeClient = Client({
  game: Battlescape,
  board: Board,
  multiplayer: Local(),
  // multiplayer: SocketIO({ server: 'http://localhost:8000' }),
  // multiplayer: SocketIO({ server: 'http://battlescape-server.herokuapp.com' }),
  numPlayers: 2,
  debug: false,
  enhancer: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

// const MainLobby = () => {
//   return (
//     <Lobby
//       gameServer={`http://localhost:8000`}
//       lobbyServer={`http://localhost:8000`}
//       // gameServer={`http://battlescape-server.herokuapp.com`}
//       // lobbyServer={`http://battlescape-server.herokuapp.com`}
//       gameComponents={[{ game: Battlescape, board: Board }]}
//     />
//   )
// }
