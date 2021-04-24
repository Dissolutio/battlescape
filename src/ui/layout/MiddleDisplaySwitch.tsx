import { useBgioCtx, useBgioG } from "bgio-contexts"
import { MatchSetupControls, PassAndPlayMatchSetupControls } from "ui/controls"
import { MapDisplay } from "ui/hexmap"

const MiddleDisplay = () => {
  const { ctx } = useBgioCtx()
  const { G } = useBgioG()
  const { isSetupPhase } = ctx
  if (isSetupPhase && G.passAndPlay) {
    return <PassAndPlayMatchSetupControls />
  }
  if (isSetupPhase && !G.passAndPlay) {
    return <MatchSetupControls />
  }
  return <MapDisplay />
}
