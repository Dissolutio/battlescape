import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Client } from "boardgame.io/react"
import { Local, SocketIO } from "boardgame.io/multiplayer"
import { Debug } from "boardgame.io/debug"

import { Login } from "lobby/Login"
import { BgioLobbyApiProvider, BgioLobbyProvider } from "bgio-contexts"
import { AuthProvider, useAuth } from "hooks/useAuth"
import { NewLobby } from "lobby/NewLobby"
import { myGame } from "./game/game"
import { Board } from "./Board"
import { PageRoutes } from "ui/pages/PageRoutes"
import { MultiplayerNav } from "ui/layout"

// ! Three Options:
// * A local game (for game development) `npm run start`
// * Client that connects to a local server `npm run devstart`
// * Client that connects to its origin server `npm run build`

const isDeploymentEnv = process.env.NODE_ENV === "production"
const isDevEnv = process.env.NODE_ENV === "development"
const isSeparateServer = Boolean(process.env.REACT_APP_WITH_SEPARATE_SERVER)
const isLocalApp = isDevEnv && !isSeparateServer

// use appropriate address for server
const hostname = window?.location?.hostname ?? ""
const protocol = window?.location?.protocol ?? ""
const port = window?.location?.port ?? ""
const deploymentServerAddr = `${protocol}//${hostname}${port ? `:${port}` : ``}`
const localServerAddr = `http://localhost:8000`
const SERVER = isDeploymentEnv ? deploymentServerAddr : localServerAddr

// Enable Redux DevTools in development
const reduxDevTools =
  window &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()

const bgioClientOptions = {
  game: myGame,
  board: Board,
  numPlayers: 2,
}

const DemoGameClient = Client({
  ...bgioClientOptions,
  multiplayer: Local(),
  enhancer: reduxDevTools,
  debug: { impl: Debug },
})

const MultiplayerGameClient = Client({
  ...bgioClientOptions,
  multiplayer: SocketIO({ server: SERVER }),
  debug: false,
})

export const App = () => {
  if (isLocalApp) {
    return <LocalApp />
  } else {
    return (
      <AuthProvider>
        <BgioLobbyApiProvider serverAddress={SERVER}>
          <BgioLobbyProvider>
            <BrowserRouter>
              <Switch>
                <Route exact path="/">
                  <MultiplayerNav />
                  <Login />
                  <NewLobby />
                </Route>
                <Route path="/demo">
                  <MultiplayerNav />
                  <DemoGameClient matchID="matchID" playerID="0" />
                </Route>
                <Route path="/play">
                  <PlayPage />
                </Route>
              </Switch>
            </BrowserRouter>
          </BgioLobbyProvider>
        </BgioLobbyApiProvider>
      </AuthProvider>
    )
  }
}

const LocalApp = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <DemoGameClient matchID="matchID" playerID="0" />
        </Route>
        <PageRoutes />
      </Switch>
    </BrowserRouter>
  )
}

const PlayPage = () => {
  const { storedCredentials } = useAuth()
  const { playerID, matchID, playerCredentials } = storedCredentials
  return (
    <MultiplayerGameClient
      matchID={matchID}
      playerID={playerID}
      credentials={playerCredentials}
    />
  )
}
