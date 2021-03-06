import styled from "styled-components"

type MapHexStylesProps = {
  hexSize: number
}
export const MapHexStyles = styled.div<MapHexStylesProps>`
  height: 100%;
  position: relative;
  overflow: scroll;
  //🛠 Style Map Scrollbars
  scrollbar-width: thin;
  scrollbar-color: var(--player-color) var(--black);
  &::-webkit-scrollbar {
    height: 0.2rem;
    width: 0.2rem;
    background: var(--black);
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 1px var(--player-color);
    background: var(--black);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--player-color);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-corner {
    background: var(--black);
  }
  //🛠 Style Hex Text
  .maphex_altitude-text {
    fill: var(--sub-white);
    font-size: ${(props) => `${props.hexSize / 75}rem`};
  }
  //🛠 All Hex Styles
  // highlight all hexes
  svg g polygon {
    stroke: var(--white);
    stroke-width: 0.1;
  }
  // paint all hexes
  .hexagon-group {
    fill: var(--white);
    g polygon {
      @media (hover: hover) {
        &:hover {
          fill: var(--neon-orange);
          fill-opacity: 0.6;
        }
      }
    }
  }
  //
  //🛠 Selected Map Hex
  .maphex__selected--active > g polygon {
    stroke: var(--white);
    stroke-width: 0.6;
  }

  // PHASE: PLACEMENT
  // highlight all player startzones
  .maphex__startzone--player0 > g polygon {
    stroke: var(--bee-yellow);
    stroke-width: 0.3;
    @media screen and (max-width: 1100px) {
      stroke-width: 0.4;
    }
  }
  .maphex__startzone--player1 > g polygon {
    stroke: var(--butterfly-purple);
    stroke-width: 0.3;
    @media screen and (max-width: 1100px) {
      stroke-width: 0.4;
    }
  }
  // highlight placeable hexes for selected unit
  .maphex__start-zone--placement > g polygon {
    stroke: var(--player-color);
    stroke-width: 0.6;
    @media screen and (max-width: 1100px) {
      stroke-width: 0.8;
    }
  }
  // PHASE: ROP-all stages
  // highlight selectable units for selected card
  .maphex__selected-card-unit--selectable > g polygon {
    stroke: var(--sub-white);
    stroke-width: 0.6;
  }
  // highlight selected unit
  .maphex__selected-card-unit--active > g polygon {
    stroke: var(--player-color);
    stroke-width: 0.6;
  }
  // PHASE: ROP-opponent's turn
  // highlight active enemy unit
  .maphex__opponents-active-unit > g polygon {
    stroke: var(--neon-red);
    stroke-width: 0.6;
  }
  //PHASE: ROP-move
  // paint safe moverange
  .maphex__move-safe > g polygon {
    fill: var(--neon-green);
    fill-opacity: 1;
  }
  // paint engage moverange
  .maphex__move-engage > g {
    fill: var(--neon-orange);
    fill-opacity: 1;
  }
  // paint disengage moverange
  .maphex__move-disengage > g {
    fill: var(--neon-red);
    fill-opacity: 1;
  }
  //PHASE: ROP-attack
  // paint targetable enemy unit
  .maphex__targetable-enemy > g polygon {
    fill: var(--neon-red);
    fill-opacity: 1;
  }
`
