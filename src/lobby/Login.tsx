import { useState, useEffect } from "react"

import { useAuth } from "hooks"
import { useMultiplayerLobby } from "./useMultiplayerLobby"

export const Login = () => {
  const [inputText, setInputText] = useState("")
  const handleTextInputChange = (e) => {
    setInputText(e.target.value)
  }
  const { isAuthenticated, storedCredentials, signin, signout } = useAuth()
  const isNameChanged = inputText !== storedCredentials.playerName

  // effect -- auto-fill input on auth change
  useEffect(() => {
    setInputText(storedCredentials.playerName)
  }, [storedCredentials])

  const handleSubmit = (e) => {
    e.preventDefault()
    signin(inputText)
  }

  const inputHtmlId = `playerName`
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor={inputHtmlId}>
          {isAuthenticated ? "Change your " : "Choose a "} player name:
          <input
            type="text"
            onChange={handleTextInputChange}
            value={inputText}
            id={inputHtmlId}
          />
        </label>
        <div>
          {isNameChanged && (
            <button type="submit">
              {isAuthenticated ? "Change Name" : "Submit"}
            </button>
          )}
        </div>
      </form>
      {isAuthenticated && (
        <p>
          <LogoutButton />
        </p>
      )}
    </>
  )
}

// A little more complicated, ideally we'd want to make sure we tell everybody we left the match
export const LogoutButton = () => {
  const { handleLeaveJoinedMatch } = useMultiplayerLobby()
  const { storedCredentials, signout } = useAuth()
  const isInJoinedMatch = Boolean(storedCredentials.matchID)
  const handleSignout = async (e) => {
    await handleLeaveJoinedMatch()
    signout()
  }

  return (
    <button onClick={handleSignout}>
      Sign out {`${storedCredentials?.playerName}`}
    </button>
  )
}
