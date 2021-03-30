import { Link } from "react-router-dom"

export const HelpPage = () => {
  return (
    <>
      <h1>Help Page</h1>
      <p>
        <Link to="/rules">Game Rules</Link>
      </p>
    </>
  )
}
