import React from 'react'
import styled from 'styled-components';
import { HexGrid, Layout, Hexagon, HexUtils } from 'react-hexgrid';
import { IBoardHex } from '../game/constants/mapGen'
import { UnitPatterns } from './UnitPatterns'
import { unitIcons } from '../game/constants/unitIcons'
import { playerColors } from '../game/constants/mapGen'

export function MapDisplay({ mapProps }) {
  const {
    playerID,
    boardHexes,
    startZones,
    armyCardsInGame,
    startingUnits,
    activeHexID,
    activeUnitID,
    onClickBoardHex,
  } = mapProps

  const boardHexesArr = Object.values(boardHexes)
  return (
    <HexSVGStyle>
      <HexGrid width={500} height={500}>
        <Layout size={{ x: 6, y: 6 }}>
          <Hexes
            // Game state
            playerID={playerID}
            boardHexesArr={boardHexesArr}
            startZones={startZones}
            startingUnits={startingUnits}
            armyCardsInGame={armyCardsInGame}
            // active hex
            activeHexID={activeHexID}
            onClickBoardHex={onClickBoardHex}
            // active unit
            activeUnitID={activeUnitID}
          />
          <UnitPatterns />
        </Layout>
      </HexGrid>
    </HexSVGStyle>
  )
}

const Hexes = (props) => {
  const {
    playerID,
    boardHexesArr,
    startingUnits,
    armyCardsInGame,
    activeHexID,
    activeUnitID,
    onClickBoardHex,
    startZones,
  } = props

  const startZone: IBoardHex[] = startZones[playerID]

  function isStartZoneHex(hex: IBoardHex) {
    return startZone.includes(hex)
  }
  function isActiveHex(hex: IBoardHex) {
    return HexUtils.equals(hex, activeHexID)
  }

  function getUnitForHex(hex) {
    if (!hex?.unitGameID) { return '' }
    const unit = startingUnits[hex.unitGameID]
    return {
      ...unit,
      ...armyCardsInGame[unit.hsCardID]
    }
  }
  function calcClassNames(hex: IBoardHex) {
    return activeUnitID ?
      `${isStartZoneHex(hex) ? 'startZoneHex' : ''}`
      :
      `${isActiveHex(hex) ? 'selectedMapHex' : ''}`
  }
  return boardHexesArr.map((hex: IBoardHex, i: number) => {
    // const unitSVGPatternID = getUnitForHex(hex) ? getUnitForHex(hex).portraitPattern : ''
    return (
      <Hexagon
        key={i}
        {...hex}
        onClick={(e: Event, source: { props: any; }) => onClickBoardHex(e, source.props)}
        className={calcClassNames(hex)}
      >
        <UnitIcon unit={getUnitForHex(hex)} />
      </Hexagon >
    )
  })
}

const UnitIcon = ({ unit }) => {
  if (!unit) { return null }
  const id = unit && unit.hsCardID
  const props = {
    x: "-3",
    y: "-3",
    style: {
      fill: `${playerColors[unit.playerID]}`,
      fontSize: '0.5rem',
      transform: "translate(30, 0)",
    }
  }
  return unitIcons[id](props)
}

const HexSVGStyle = styled.div`
    background: #e4e7ec;
    color: #6d819c;
    overflow: auto;
  g {
    fill: #7be3f6;
  }
  .selectedMapHex > g {
    fill: #BaDa55;
  }
  .startZoneHex > g {
    fill: #BaDa55;
  }
  svg g polygon {
    stroke: #263959;
    stroke-width: 0.2;
  }
  svg g polygon text {
    font-size: 0.1rem;
  }
svg g:hover {
    fill: #BaDa55;
    fill-opacity: 0.7;
  }
`;