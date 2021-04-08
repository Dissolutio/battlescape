import { BoardProps } from "boardgame.io/react"
import * as React from "react"

type BgioClientInfo = {
  playerID: string
  log: BoardProps["log"]
  matchID: string
  matchData: any[]
  isActive: boolean
  isMultiplayer: boolean
  isConnected: boolean
  credentials: string
}
// add a handy utility property
type BgioClientInfoCtxValue = BgioClientInfo & {
  belongsToPlayer?: (thing: any) => boolean
}
type BgioClientInfoProviderProps = BgioClientInfo & {
  children: React.ReactNode
}
const BgioClientInfoContext = React.createContext<
  BgioClientInfoCtxValue | undefined
>(undefined)

export function BgioClientInfoProvider(props: BgioClientInfoProviderProps) {
  const {
    children,
    log,
    matchID,
    matchData,
    isActive,
    isMultiplayer,
    isConnected,
    credentials,
  } = props
  const belongsToPlayer = (thing: any): boolean => thing?.playerID === playerID
  const playerID = props.playerID || ""
  return (
    <BgioClientInfoContext.Provider
      value={{
        playerID,
        belongsToPlayer,
        log,
        matchID,
        matchData,
        isActive,
        isMultiplayer,
        isConnected,
        credentials,
      }}
    >
      {children}
    </BgioClientInfoContext.Provider>
  )
}
export function useBgioClientInfo() {
  const context = React.useContext(BgioClientInfoContext)
  if (context === undefined) {
    throw new Error(
      "useBgioClientInfo must be used within a BgioClientInfoProvider"
    )
  }
  return context
}
