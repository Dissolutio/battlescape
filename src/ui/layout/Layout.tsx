import styled from "styled-components"
import { useBgioClientInfo, useBgioCtx } from "bgio-contexts"
import { Controls } from "ui/layout/Controls"
import { MapDisplay } from "ui/hexmap"
import GameSetup from "./GameSetup"

// ? perhaps this could be moved into theme.js, but the playerID will still be dynamic....

export const Layout = () => {
  const { ctx } = useBgioCtx()
  const bgioClientInfoCtx = useBgioClientInfo()
  const clientPlayerID = bgioClientInfoCtx.playerID
  if (ctx.phase === "setup") {
    return <GameSetup />
  }
  return (
    <LayoutContainer playerID={clientPlayerID}>
      <LayoutMiddle>
        <MapDisplay />
      </LayoutMiddle>
      <LayoutBottom>
        <Controls />
      </LayoutBottom>
    </LayoutContainer>
  )
}
type LayoutContainerProps = {
  playerID: string
}
const LayoutContainer = styled.div<LayoutContainerProps>`
  //🛠 SET CSS VARS
  --player-color: ${(props) => props.theme.playerColor};
  /* --navbar-height: 46px; */
  /* --navbar-logo-height: 32px; */

  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  color: var(--player-color);
  background-image: url("${(props) => props.theme.bgContourLinesUrl}");
`
const LayoutMiddle = styled.div`
  width: 100%;
  height: 70vh;
  position: relative;
  overflow: auto;
`
const LayoutBottom = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  min-height: 30vh;
  padding: 5px;
  margin: 0;
  background: var(--black);
`
