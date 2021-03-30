import { uniqBy } from "lodash"

import { useBgioLobby } from "bgio-contexts"
import { MyGameState } from "game/game"
import { CreateMatchButton } from "./CreateMatchButton"
import { SelectedGameMatchList } from "./SelectedGameMatchList"
import { GameSelect } from "./GameSelect"
import { SelectedMatchDisplay } from "./SelectedMatchDisplay"

export type LobbyMatchSetupData = {
  lobbyDisplayName: string
}
export type MyGameSetupData = MyGameState & LobbyMatchSetupData

export type MatchPlayerMetadata = {
  id: number
  name?: string
  credentials?: string
  data?: any
  isConnected?: boolean
}

export const NewLobby = () => {
  const {
    getLobbyGames,
    getLobbyMatches,
    lobbyMatches,
    lobbyGamesError,
    selectedGame,
    joinedMatch,
    handleLeaveJoinedMatch,
  } = useBgioLobby()
  const joinedMatchID = joinedMatch?.matchID
  const selectedGameMatches = lobbyMatches?.[selectedGame] ?? []
  // the BGIO server often returns duplicate matches, unsure why
  const matches = uniqBy(selectedGameMatches, "matchID")
  const numCurrentMatches = selectedGameMatches?.length ?? 0
  // TODO
  // If we've joined a match, time to go to play page
  // if (joinedMatch?.matchID) {
  //   return <Redirect to="/play" />;
  // }
  async function handleRefreshButton(e) {
    getLobbyMatches(selectedGame)
  }
  return (
    <>
      {lobbyGamesError ? (
        <p style={{ color: "red" }}>
          {`Error -- Could not retrieve games from server : ${lobbyGamesError}`}
          <button onClick={getLobbyGames}>Retry</button>
        </p>
      ) : (
        <>
          <GameSelect />
        </>
      )}
      <hr></hr>
      {/* First game will be auto-selected, so this should display if games are successfully fetched */}
      {selectedGame ? (
        <>
          <CreateMatchButton />
          {joinedMatchID ? (
            <div>
              <button onClick={handleLeaveJoinedMatch}>
                Leave Joined Game
              </button>
            </div>
          ) : null}
          <section>
            <h3>{`${selectedGame} matches (${numCurrentMatches})`}</h3>
            <button onClick={handleRefreshButton}>{`Refresh`}</button>
            <SelectedGameMatchList />
          </section>
          <hr></hr>
          <h3>Viewing Match:</h3>
          <SelectedMatchDisplay />
        </>
      ) : null}
    </>
  )
}
