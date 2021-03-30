import React, { useState, useEffect } from "react"
import { LobbyClient } from "boardgame.io/client"
import { LobbyAPI } from "boardgame.io"

import { useBgioLobbyApi } from "./useBgioLobbyApi"
import { useAuth } from "hooks"
import { MyGameState, defaultSetupData, MYGAME_NUMPLAYERS } from "game/game"

type LobbyMatches = {
  [gameName: string]: LobbyAPI.Match[]
}
type LobbyMatchesError = {
  [gameName: string]: string
}
type BgioLobbyCtxValue = {
  lobbyGames: string[]
  lobbyMatches: LobbyMatches
  lobbyMatchesError: LobbyMatchesError
  lobbyGamesError: string
  createMatchError: string
  createMatchSuccess: string
  getMatchByIDSuccess: string
  getMatchByIDError: string
  selectedGame: string
  selectedMatch: LobbyAPI.Match
  joinedMatch: LobbyAPI.Match
  updateLobbyMatchesForSelectedGame: () => Promise<LobbyAPI.MatchList>
  updateLobbyGames: () => Promise<void>
  //handlers
  handleSelectGameChange: (e) => void
  handleSelectMatch: (matchID: string) => Promise<void>
  handleCreateMatchButton: () => Promise<void>
  handleJoinSelectedMatch: (playerID: string, matchID: string) => Promise<void>
  handleLeaveJoinedMatch: () => Promise<void>
}
type BgioLobbyProviderProps = {
  children: React.ReactNode
}

const BgioLobbyContext = React.createContext<BgioLobbyCtxValue | undefined>(
  undefined
)

export function BgioLobbyProvider({ children }: BgioLobbyProviderProps) {
  const { updateCredentials, storedCredentials } = useAuth()
  const {
    lobbyClient,
    getLobbyGames,
    getLobbyMatches,
    getMatch,
    createMatch,
    joinMatch,
    leaveMatch,
  } = useBgioLobbyApi()
  // STATE
  const [lobbyGames, setLobbyGames] = useState<string[]>([])
  const [lobbyGamesError, setLobbyGamesError] = useState("")
  const [lobbyMatches, setLobbyMatches] = useState<LobbyMatches>({})
  const [lobbyMatchesError, setLobbyMatchesError] = useState<LobbyMatchesError>(
    {}
  )
  const [createMatchSuccess, setCreateMatchSuccess] = useState("")
  const [createMatchError, setCreateMatchError] = useState("")
  const [getMatchByIDSuccess, setGetMatchByIDSuccess] = useState("")
  const [getMatchByIDError, setGetMatchByIDError] = useState("")
  const [selectedGame, setSelectedGame] = useState("")
  const [selectedMatch, setSelectedMatch] = useState<
    LobbyAPI.Match | undefined
  >(undefined)
  const [joinedMatch, setJoinedMatch] = useState<LobbyAPI.Match>(undefined)

  // effect -- initial fetch games
  useEffect(() => {
    updateLobbyGames()
    // eslint reason: Only want to fetch games on mount for now.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // effect -- auto-select first game (once they're fetched)
  useEffect(() => {
    const firstAvailableGame = lobbyGames?.[0]
    if (firstAvailableGame && !selectedGame) {
      setSelectedGame(firstAvailableGame)
    }
  }, [lobbyGames, selectedGame])

  // effect -- fetch matches on game select (including initial auto-selection)
  useEffect(() => {
    if (selectedGame) {
      updateLobbyMatchesForSelectedGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGame])

  async function updateLobbyGames() {
    try {
      const games = await getLobbyGames()
      if (games) {
        setLobbyGamesError("")
        setLobbyGames(games)
      }
    } catch (error) {
      setLobbyGamesError(error.message)
      console.log(`🚀 ~ getLobbyGames ~ error`, error)
    }
  }
  async function updateLobbyMatchesForSelectedGame() {
    try {
      const matches = await getLobbyMatches(selectedGame)
      if (matches) {
        setLobbyMatchesError((s) => ({
          ...s,
          [selectedGame]: undefined,
        }))
        setLobbyMatches((s) => ({ ...s, [selectedGame]: matches.matches }))
        return matches
      }
    } catch (error) {
      setLobbyMatchesError((s) => ({ ...s, [selectedGame]: error.message }))
      console.log(`🚀 ~ getLobbyMatches ~ error`, error)
    }
  }
  // handler select game
  const handleSelectGameChange = (e) => {
    setSelectedGame(e.target.value)
  }
  // handler select match
  async function handleSelectMatch(matchID: string) {
    // refresh the selected match
    const refreshedMatch = await getMatch(selectedGame, matchID)
    // then select the refreshed match (aka update) if success ...
    if (refreshedMatch?.matchID) {
      setSelectedMatch(refreshedMatch)
    }
    // ... otherwise, selected match does not exist, so we clear and refetch matches
    // todo: we should apologize
    else {
      setSelectedMatch(undefined)
      updateLobbyMatchesForSelectedGame()
    }
  }
  // handler createMatch
  async function handleCreateMatchButton() {
    // create a match, then select it (which refreshes the match), then join it
    try {
      const { matchID } = await createMatch(`${selectedGame}`, {
        setupData: defaultSetupData,
        numPlayers: MYGAME_NUMPLAYERS,
        unlisted: false,
      })
      if (matchID) {
        setCreateMatchSuccess(matchID)
        setCreateMatchError("")
        await updateLobbyMatchesForSelectedGame()
        await handleSelectMatch(matchID)
        await handleJoinSelectedMatch("0", matchID)
      }
    } catch (error) {
      setCreateMatchSuccess("")
      setCreateMatchError(error.message)
      console.log(`🚀 ~ createMatch ~ error`, error)
    }
  }
  // join match, then save credentials and proceed to Room
  async function handleJoinSelectedMatch(playerID: string, matchID: string) {
    const playerName = storedCredentials.playerName
    const joinMatchID = matchID || selectedMatch.matchID
    const gameName = selectedGame
    const playerCredentials = await joinMatch({
      gameName,
      matchID: joinMatchID,
      options: {
        playerID,
        playerName,
      },
    })
    if (playerCredentials) {
      const newCredentials = {
        playerName,
        matchID,
        gameName,
        playerCredentials: `${playerCredentials}`,
        playerID,
      }
      //save
      updateCredentials(newCredentials)
      // refresh match info
      const joinedMatch = await getMatch(gameName, matchID)
      if (joinedMatch) {
        // update display first
        setSelectedMatch(joinedMatch)
        //double check the server has matching player data
        const serverPlayer = joinedMatch.players.find(
          (playerMetadata) => playerMetadata.id.toString() === playerID
        )
        const serverPlayerName = serverPlayer?.name
        const isConfirmedJoin = serverPlayerName === playerName
        // set joined match to new match info
        if (isConfirmedJoin) {
          setJoinedMatch(joinedMatch)
        }
      }
    } else {
      console.log(`🚀 handleJoinSelectedMatch ~ FAILED TO JOIN`)
    }
  }
  // handle leave current match
  async function handleLeaveJoinedMatch() {
    const { gameName, matchID, playerID, playerCredentials } = storedCredentials
    setJoinedMatch(undefined)
    const isLeft = await leaveMatch({
      gameName,
      matchID,
      options: { playerID, credentials: playerCredentials },
    })
    updateCredentials({
      gameName: "",
      matchID: "",
      playerID: "",
      playerCredentials: "",
    })
    return isLeft
  }

  return (
    <BgioLobbyContext.Provider
      value={{
        lobbyGames,
        lobbyGamesError,
        lobbyMatches,
        lobbyMatchesError,
        createMatchError,
        createMatchSuccess,
        getMatchByIDSuccess,
        getMatchByIDError,
        selectedGame,
        selectedMatch,
        joinedMatch,
        updateLobbyGames,
        updateLobbyMatchesForSelectedGame,
        handleSelectGameChange,
        handleSelectMatch,
        handleCreateMatchButton,
        handleJoinSelectedMatch,
        handleLeaveJoinedMatch,
      }}
    >
      {children}
    </BgioLobbyContext.Provider>
  )
}

export function useBgioLobby() {
  const context = React.useContext(BgioLobbyContext)
  if (context === undefined) {
    throw new Error("useBgioLobby must be used within a BgioLobbyProvider")
  }
  return context
}
