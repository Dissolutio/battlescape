import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import { Client } from "boardgame.io/react"
import { Local, SocketIO } from "boardgame.io/multiplayer"
import { Debug } from "boardgame.io/debug"

import { Battlescape } from "./game/game"
import { MAX_PLAYERS } from "./game/constants"
import { AuthProvider, useAuth } from "hooks/useAuth"
import { BgioLobbyApiProvider } from "bgio-contexts"
import { MultiplayerLobby, MultiplayerLobbyProvider } from "lobby"
import { Board } from "./Board"
import { MultiplayerNav } from "ui/layout"
import { FeedbackPage, HelpPage, PageLayout, RulesPage } from "ui/pages"
import { ROUTES } from "routes"

// ! 3 OPTIONS:
//  A local game (for game development): `npm run start`
//  Client that connects to a local server: `npm run devstart` + run local server: `npm run devserver`
//  Client (served from `build/`) that connects to production server: `npm run server`

export const SERVER = determineServerAddress()
const isLocalApp = SERVER === ""

// Enable Redux DevTools in development
const reduxDevTools =
  window &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()

const bgioClientOptions = {
  game: Battlescape,
  board: Board,
  numPlayers: MAX_PLAYERS,
}

const DemoGameClient = Client({
  ...bgioClientOptions,
  multiplayer: Local(),
  enhancer: reduxDevTools,
  // debug: { impl: Debug },
  debug: false,
})

const MultiplayerGameClient = Client({
  ...bgioClientOptions,
  multiplayer: SocketIO({ server: SERVER }),
  debug: { impl: Debug },
})

export const App = () => {
  if (isLocalApp) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.root}>
            <DemoGameClient matchID="matchID" playerID="0" />
          </Route>
          <Route exact path={ROUTES.help}>
            <PageLayout>
              <HelpPage />
            </PageLayout>
          </Route>
          <Route exact path={ROUTES.feedback}>
            <PageLayout>
              <FeedbackPage />
            </PageLayout>
          </Route>
          <Route exact path={ROUTES.rules}>
            <PageLayout>
              <RulesPage />
            </PageLayout>
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
  return (
    <BrowserRouter>
      <AuthProvider>
        <BgioLobbyApiProvider serverAddress={SERVER}>
          <MultiplayerLobbyProvider>
            <OnlineMultiplayerApp />
          </MultiplayerLobbyProvider>
        </BgioLobbyApiProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

const OnlineMultiplayerApp = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.root}>
        <MultiplayerNav />
        <MultiplayerLobby />
      </Route>
      {/* <Route exact path={`${ROUTES.onlineLobby}`}>
        <MultiplayerNav />
        <MultiplayerLobby />
      </Route> */}
      <Route path={ROUTES.playDemo}>
        <MultiplayerNav />
        <DemoGameClient matchID="matchID" playerID="0" />
      </Route>
      <Route path={ROUTES.playLocal}>
        <MultiplayerNav />
        <PassAndPlayLobby />
      </Route>
      {/* Nav play-link not shown when user is not joined in a match */}
      <Route path={ROUTES.playOnline}>
        <MultiplayerNav />
        <PlayJoinedMatchPage />
      </Route>
    </Switch>
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

const PassAndPlayLobby = () => {
  return (
    <Switch>
      <Route exact path="/local">
        <>
          <h2>Play locally</h2>
          <p className="text-muted small">
            You will pass the device between players after each turn.
          </p>
          <p>
            Number of players:
            <span style={{ display: "inline-block" }}>
              {Array(MAX_PLAYERS - 1)
                .fill(null)
                .map((_, i) => (
                  <Link
                    className="btn btn-primary btn-sm"
                    to={`/local/${i + 2}`}
                    key={i}
                  >
                    {i + 2}
                  </Link>
                ))}
            </span>
          </p>
        </>
      </Route>
      <Route
        path="/local/:numPlayers"
        render={(props) => {
          const numPlayers = parseInt(props.match.params.numPlayers)
          return <PassAndPlayMatch numPlayers={numPlayers} />
        }}
      />
    </Switch>
  )
}

const PassAndPlayMatch = (props) => {
  const numPlayers = props.numPlayers
  // We use playerID=0 but we will let all the players play for everyone,
  // because we are assuming players are passing the device around
  const GameClient = Client({
    game: Battlescape,
    numPlayers,
    board: Board,
    multiplayer: Local(),
    debug: true,
    // enhancer: applyMiddleware(logger),
  })
  return <GameClient playerID="0" />
}

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
