import { useAuth } from "hooks"
import { Link, NavLink } from "react-router-dom"
import { ROUTES } from "routes"

export const PageNav = () => {
  return (
    <nav>
      <Link to={ROUTES.root}>Back to App</Link>
      <Link to={ROUTES.help}>Help</Link>
      <Link to={ROUTES.rules}>Rules</Link>
      <Link to={ROUTES.feedback}>Feedback</Link>
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
          <NavLink exact to={ROUTES.root}>
            Lobby
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.playDemo}>Demo</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.playLocal}>Pass-and-Play</NavLink>
        </li>
        {isJoinedInMatch ? (
          <li>
            <NavLink to={ROUTES.playOnline}>Play</NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}
