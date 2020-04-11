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
    mapSize,
    zoomLevel,
    armyCardsInGame,
    startingUnits,
    activeHexID,
    activeUnitID,
    onClickBoardHex,
    onClickMapBackground
  } = mapProps

  const boardHexesArr = Object.values(boardHexes)
  const originFactor = -10
  const sizeFactor = 25
  return (
    <HexSVGStyle
      onClick={onClickMapBackground}
    >
      <HexGrid
        width={`${mapSize * 200}`}
        height={`${mapSize * 221}`}
        viewBox={`${mapSize * originFactor} ${mapSize * originFactor} ${mapSize * sizeFactor} ${mapSize * sizeFactor}`}
      >
        <Layout
          size={{ x: `${zoomLevel}`, y: `${zoomLevel}` }}
          flat={true}
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
    if (!hex.occupyingUnitID) { return '' }
    return startingUnits[hex.occupyingUnitID]
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
    color: var(--light-blue);
    g {
      fill: var(--light-blue);
    }
    .selectedMapHex > g {
      fill: var(--neon-green);
    }
    .startZoneHex > g {
      fill: var(--neon-green);
    }
    svg g polygon {
    stroke: var(--dark-blue);
    stroke-width: 0.2;
  }
  svg g polygon text {
    font-size: 0.1rem;
  }
  @media (hover: hover) {
    svg g:hover {
        fill: var(--neon-orange);
        fill-opacity: 0.6;
      }

  }
`;