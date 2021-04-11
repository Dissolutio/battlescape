import { useAuth } from "hooks"
import { Link, NavLink } from "react-router-dom"

export const PageNav = () => {
  return (
    <nav>
      <Link to={"/"}>Back to App</Link>
      <Link to={"/help"}>Help</Link>
      <Link to={"/rules"}>Rules</Link>
      <Link to={"/feedback"}>Feedback</Link>
    </nav>
  )
}

export const MultiplayerNav = () => {
  const { storedCredentials } = useAuth()
  const isJoinedInMatch = Boolean(storedCredentials.matchID)
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            Lobby
          </NavLink>
        </li>
        <li>
          <NavLink to="/demo">Demo</NavLink>
        </li>
        <li>
          <NavLink to="/local">Pass-and-Play</NavLink>
        </li>
        {isJoinedInMatch ? (
          <li>
            <NavLink to="/play">Play</NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}
