import { useBgioLobby } from "bgio-contexts"
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
  const { joinedMatch } = useBgioLobby()
  const isJoinedInMatch = Boolean(joinedMatch?.matchID)
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/demo">Demo</NavLink>
        </li>
        <li>
          <NavLink to="/lobby">Lobby</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
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
export const IngameNav = () => {
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/help"}>Help</Link>
      <Link to={"/rules"}>Rules</Link>
      <Link to={"/feedback"}>Feedback</Link>
    </nav>
  )
}
