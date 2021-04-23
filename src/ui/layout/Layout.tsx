import styled from "styled-components"
// import { useBgioCtx, useBgioG } from "bgio-contexts"
// import {
//   Controls,
//   MatchSetupControls,
//   PassAndPlayMatchSetupControls,
// } from "ui/controls"
// import { MapDisplay } from "ui/hexmap"
export const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <LayoutMiddle>{children[0]}</LayoutMiddle>
      <LayoutBottom>
        {children[1]}
        {children[2]}
      </LayoutBottom>
    </LayoutContainer>
  );
};
// const MiddleDisplay = () => {
//   const { ctx } = useBgioCtx()
//   const { G } = useBgioG()
//   const { isSetupPhase } = ctx
//   if (isSetupPhase && G.passAndPlay) {
//     return <PassAndPlayMatchSetupControls />
//   }
//   if (isSetupPhase && !G.passAndPlay) {
//     return <MatchSetupControls />
//   }
//   return <MapDisplay />
// }

const LayoutContainer = styled.div`
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
