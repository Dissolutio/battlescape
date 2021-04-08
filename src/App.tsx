import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import { Client } from "boardgame.io/react"
import { Local, SocketIO } from "boardgame.io/multiplayer"
import { Debug } from "boardgame.io/debug"

import { HexedMeadow } from "./game/game"
import { LOCAL_GAME_MATCH_ID, MAX_PLAYERS } from "./game/constants"
import { AuthProvider, useAuth } from "hooks/useAuth"
import { BgioLobbyApiProvider } from "bgio-contexts"
import { MultiplayerLobby, MultiplayerLobbyProvider } from "lobby"
import { Board } from "./Board"
import { PageRoutes } from "ui/pages/PageRoutes"
import { MultiplayerNav } from "ui/layout"

// ! 3 OPTIONS:
//  A local game (for game development): `npm run start`
//  Client that connects to a local server: `npm run devstart` + run local server: `npm run devserver`
//  Client (served from `build/`) that connects to production server: `npm run server`
function determineServerAddress() {
  const isDeploymentEnv = process.env.NODE_ENV === "production"
  const isDevEnv = process.env.NODE_ENV === "development"
  const isSeparateServer = Boolean(process.env.REACT_APP_WITH_SEPARATE_SERVER)
  const isLocalApp = isDevEnv && !isSeparateServer
  // use appropriate address for server
  const hostname = window?.location?.hostname ?? ""
  const protocol = window?.location?.protocol ?? ""
  const port = window?.location?.port ?? ""
  const deploymentServerAddr = `${protocol}//${hostname}${
    port ? `:${port}` : ``
  }`
  const localServerAddr = `http://localhost:8000`
  if (isLocalApp) {
    return ""
  } else {
    return isDeploymentEnv ? deploymentServerAddr : localServerAddr
  }
}
export const SERVER = determineServerAddress()
const isLocalApp = SERVER === ""

// Enable Redux DevTools in development
const reduxDevTools =
  window &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()

const bgioClientOptions = {
  game: HexedMeadow,
  board: Board,
  numPlayers: MAX_PLAYERS,
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
  debug: { impl: Debug },
})

export const App = () => {
  if (isLocalApp) {
    return <LocalApp />
  } else {
    return (
      <AuthProvider>
        <BgioLobbyApiProvider serverAddress={SERVER}>
          <MultiplayerLobbyProvider>
            <OnlineMultiplayerApp />
          </MultiplayerLobbyProvider>
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
          <DemoGameClient matchID={LOCAL_GAME_MATCH_ID} playerID="0" />
        </Route>
        <PageRoutes />
      </Switch>
    </BrowserRouter>
  )
}

const OnlineMultiplayerApp = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MultiplayerNav />
          <MultiplayerLobby />
        </Route>
        <Route path="/demo">
          <MultiplayerNav />
          <DemoGameClient matchID="matchID" playerID="0" />
        </Route>
        {/* Nav play-link not shown when user is not joined in a match */}
        <Route path="/play">
          <MultiplayerNav />
          <PlayJoinedMatchPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

const PlayJoinedMatchPage = () => {
  const { storedCredentials } = useAuth()
  const { playerID, matchID, playerCredentials } = storedCredentials
  if (!playerID || !matchID || !playerCredentials) {
    return (
      <p>
        You are not currently joined in a match.{" "}
        <Link to="/">Return to Lobby?</Link>
      </p>
    )
  }
  return (
    <MultiplayerGameClient
      matchID={matchID}
      playerID={playerID}
      credentials={playerCredentials}
    />
  )
}
