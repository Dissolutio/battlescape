import React from 'react'
import styled from 'styled-components';
import { HexGrid, Layout, Hexagon, HexUtils } from 'react-hexgrid';

import { unitIcons } from '../game/constants/unitIcons'
import { playerColors } from '../game/constants/mapGen'

export function MapDisplay({ mapProps }) {
  const { activeHexID, boardHexes, onClickBoardHex,
    selectedUnitGameID, startZoneIDsArr,
    startingUnits, armyCardsInGame } = mapProps

  const hexagons = Object.values(boardHexes)
  return (
    <MapStyle>
      <HexGrid width={500} height={500}>
        <Layout size={{ x: 6, y: 6 }}>
          <MainMap
            activeHexID={activeHexID}
            hexagons={hexagons}
            onClickBoardHex={onClickBoardHex}
            startZoneIDsArr={startZoneIDsArr}
            selectedUnitGameID={selectedUnitGameID}
            startingUnits={startingUnits}
            armyCardsInGame={armyCardsInGame}
          />
        </Layout>
      </HexGrid>
    </MapStyle>
  )
}

const MainMap = (props) => {
  const { hexagons, activeHexID,
    onClickBoardHex, startZoneIDsArr,
    selectedUnitGameID, startingUnits,
    armyCardsInGame } = props

  function isStartZoneHex(hex) {
    return startZoneIDsArr.includes(hex.id)
  }
  function isActiveHex(hex) {
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
  return hexagons.map((hex, i) => {
    return (
      <Hexagon
        key={i}
        {...hex}
        onClick={(e, h) => onClickBoardHex(e, h)}
        className={
          selectedUnitGameID ?
            `${isStartZoneHex(hex) ? 'startZoneHex' : ''}`
            :
            `${isActiveHex(hex) ? 'selectedMapHex' : ''}`}
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

const MapStyle = styled.div`
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