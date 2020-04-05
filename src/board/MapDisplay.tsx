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
      <HexGrid width={'100%'} height={'100%'}>
        <Layout
          size={{ x: 5, y: 5 }}
          flat={true}
          className={``}
          origin={{ x: 0, y: 0 }}
          spacing={1.01}
        >
          <Hexes
            playerID={playerID}
            boardHexesArr={boardHexesArr}
            startZones={startZones}
            startingUnits={startingUnits}
            armyCardsInGame={armyCardsInGame}
            activeHexID={activeHexID}
            onClickBoardHex={onClickBoardHex}
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

  const startZone: string[] = startZones[playerID]

  function isStartZoneHex(hex: IBoardHex) {
    return startZone.includes(hex.id)
  }
  function isActiveHex(hex: IBoardHex) {
    return hex.id === activeHexID
  }

  function getUnitForHex(hex) {
    if (!hex.unitGameID) { return '' }
    return startingUnits[hex.unitGameID]
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
        onClick={(e, source) => onClickBoardHex(e, source.props)}
        className={calcClassNames(hex)}
      >
        <UnitIcon unit={getUnitForHex(hex)} />
      </Hexagon >
    )
  })
}

const UnitIcon = ({ unit }) => {
  const { hsCardID } = unit
  if (!unit || !hsCardID) {
    return null
  }
  const unitPlayerID = unit.playerID
  const playerColor = playerColors[unitPlayerID]
  console.log("UnitIcon -> playerColor", playerColor)
  const props = {
    x: "-2.5",
    y: "-2.5",
    style: {
      fill: `${playerColor}`,
      fontSize: '0.3rem',
      transform: "translate(30, 0)",
    }
  }
  return unitIcons[hsCardID](props)
}

const HexSVGStyle = styled.div`
    color: #6d819c;

    background: #263959;
    g {
      fill: #6d819c;
    }
    .selectedMapHex > g {
      fill: #BaDa55;
    }
    .startZoneHex > g {
      fill: #BaDa55;
    }
    svg g polygon {
    stroke: #263959; /* #263959 darkBlue */
    stroke-width: 0.2;
  }
  svg g polygon text {
    font-size: 0.1rem;
  }
  @media (hover: hover) {
    svg g:hover {
        fill: rgb(224, 150, 40);
        fill-opacity: 0.6;
      }

  }
`;