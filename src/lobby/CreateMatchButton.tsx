import { useBgioLobby } from "bgio-contexts"

export function CreateMatchButton() {
  const {
    createMatchSuccess,
    createMatchError,
    handleCreateMatchButton,
  } = useBgioLobby()
  return (
    <div>
      <button onClick={handleCreateMatchButton}>Create new match</button>
      {createMatchError && (
        <span style={{ color: "red" }}>
          Sorry! Failed to create match: {`${createMatchError}`}
        </span>
      )}
      {createMatchSuccess && (
        <span style={{ color: "green" }}>
          Last match created: {`${createMatchSuccess}`}
        </span>
      )}
    </div>
  )
}
