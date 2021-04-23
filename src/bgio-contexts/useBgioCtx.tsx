import * as React from "react"
import { BoardProps } from "boardgame.io/react"

import { useBgioClientInfo } from "./useBgioClientInfo"
import { phaseNames, stageNames } from "game/constants"

type BgioCtxProviderProps = {
  children: React.ReactNode
  ctx: BoardProps["ctx"]
}

// add two handy properties
type BgioCtxValue = {
  ctx: BoardProps["ctx"] & {
    isMyTurn: boolean
    isSetupPhase: boolean
    isPlacementPhase: boolean
    isOrderMarkerPhase: boolean
    isRoundOfPlayPhase: boolean
    isAttackingStage: boolean
    isGameover: boolean
  }
}
const BgioCtxContext = React.createContext<BgioCtxValue | undefined>(undefined)

export function BgioCtxProvider({ ctx, children }: BgioCtxProviderProps) {
  const { playerID } = useBgioClientInfo()
  const isMyTurn: boolean = ctx.currentPlayer === playerID
  const isSetupPhase: boolean = ctx.phase === phaseNames.setup
  const isPlacementPhase: boolean = ctx.phase === phaseNames.placement
  const isOrderMarkerPhase: boolean = ctx.phase === phaseNames.placeOrderMarkers
  const isRoundOfPlayPhase: boolean = ctx.phase === phaseNames.roundOfPlay
  const isAttackingStage: boolean =
    isRoundOfPlayPhase && ctx.activePlayers?.[playerID] === stageNames.attacking
  const isGameover: boolean = Boolean(ctx.gameover)
  return (
    <BgioCtxContext.Provider
      value={{
        ctx: {
          ...ctx,
          isMyTurn,
          isSetupPhase,
          isPlacementPhase,
          isOrderMarkerPhase,
          isRoundOfPlayPhase,
          isAttackingStage,
          isGameover,
        },
      }}
    >
      {children}
    </BgioCtxContext.Provider>
  )
}

export function useBgioCtx() {
  const context = React.useContext(BgioCtxContext)
  if (context === undefined) {
    throw new Error("useBgioCtx must be used within a BgioCtxProvider")
  }
  return context
}
