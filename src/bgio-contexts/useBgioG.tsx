import * as React from "react"
import { GameType } from "the-setup-game/theSetupGame"
// import { MyGameState } from "the-setup-game/game"

type BgioGProviderProps = { children: React.ReactNode; G: any }

const BgioGContext = React.createContext<
  // | { G: MyGameState }
  { G: GameType } | undefined
>(undefined)

export function BgioGProvider({ G, children }: BgioGProviderProps) {
  return <BgioGContext.Provider value={{ G }}>{children}</BgioGContext.Provider>
}
export function useBgioG() {
  const context = React.useContext(BgioGContext)
  if (context === undefined) {
    throw new Error("useBgioG must be used within a BgioGProvider")
  }
  return context
}
