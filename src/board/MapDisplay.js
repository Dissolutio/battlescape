import React from 'react'
import { HexGrid, Layout, Hexagon, HexUtils, Pattern, Text } from 'react-hexgrid';
import { unitIcons } from '../game/constants/unitIcons'
import { playerColors } from '../game/constants/playerColors'
import { UnitPatterns } from './UnitPatterns'

export function MapDisplay({ mapProps }) {
  const { activeHex, boardHexes, onClickBoardHex,
    selectedUnitGameId, startZoneIdsArr,
    startingUnits, armyCardsInGame } = mapProps

  const hexagons = Object.values(boardHexes)
  return (
    <HexGrid width={600} height={700} style={{ overflow: "auto" }}>
      <Layout size={{ x: 8, y: 8 }}>
        <MainMap
          activeHex={activeHex}
          hexagons={hexagons}
          onClickBoardHex={onClickBoardHex}
          startZoneIdsArr={startZoneIdsArr}
          selectedUnitGameId={selectedUnitGameId}
          startingUnits={startingUnits}
          armyCardsInGame={armyCardsInGame}
        />
        <UnitPatterns />
      </Layout>
    </HexGrid>
  )
}
const MainMap = (props) => {
  const { hexagons, activeHex,
    onClickBoardHex, startZoneIdsArr,
    selectedUnitGameId, startingUnits,
    armyCardsInGame } = props
  const hexIsStartZoneHex = (hex) => {
    return startZoneIdsArr.includes(hex.id)
  }
  const hexIsActiveHex = (hex) => HexUtils.equals(hex, activeHex)
  const unitIsSelected = Boolean(selectedUnitGameId)
  const unitForHex = (hex) => {
    if (!hex?.unitGameId) { return '' }
    const unit = startingUnits[hex.unitGameId]
    console.log("unitForHex -> armyCardsInGame[unit.hsCardId]", armyCardsInGame[unit.hsCardId].portraitPattern)
    return {
      ...unit,
      ...armyCardsInGame[unit.hsCardId]
    }
  }
  return hexagons.map((hex, i) => {
    const unitPortrait = unitForHex(hex) ? unitForHex(hex).portraitPattern : ''
    console.log("MainMap -> unitPortrait", unitPortrait)
    return (
      <Hexagon
        key={i}
        {...hex}
        onClick={(e, h) => onClickBoardHex(e, h)}
        fill={unitPortrait || ''}
        className={
          unitIsSelected ?
            `${hexIsStartZoneHex(hex) ? 'startZoneHex' : ''}`
            :
            `${hexIsActiveHex(hex) ? 'selectedMapHex' : ''}`}
      >

      </Hexagon >
    )
  })
}

const UnitIcon = ({ unitForHex }) => {
  if (!unitForHex) { return null }
  const id = unitForHex && unitForHex.hsCardId
  const props = {
    x: "-3",
    y: "-3",
    style: {
      fill: `${playerColors[unitForHex.playerId]}`,
      fontSize: '0.5rem',
      transform: "translate(30, 0)",
    }
  }
  return unitIcons[id](props)
}