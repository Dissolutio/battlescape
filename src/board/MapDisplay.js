import React from 'react'
import { HexGrid, Layout, Hexagon, HexUtils } from 'react-hexgrid';
import { unitIcons } from '../game/constants/unitIcons'
import { playerColors } from '../game/constants/playerColors'


export function MapDisplay({ mapProps }) {
  const { activeHex, boardHexes, onClickBoardHex,
    selectedUnitGameId, startZoneIdsArr,
    startingUnits, armyCardsInGame } = mapProps

  const hexagons = Object.values(boardHexes)
  return (
    <HexGrid width={400} height={450}>
      <Layout size={{ x: 6, y: 6 }}>
        <MainMap
          activeHex={activeHex}
          hexagons={hexagons}
          onClickBoardHex={onClickBoardHex}
          startZoneIdsArr={startZoneIdsArr}
          selectedUnitGameId={selectedUnitGameId}
          startingUnits={startingUnits}
          armyCardsInGame={armyCardsInGame}
        />
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
    return {
      ...unit,
      ...armyCardsInGame[unit.hsCardId]
    }
  }
  return hexagons.map((hex, i) => {
    return (
      <Hexagon
        key={i}
        {...hex}
        onClick={(e, h) => onClickBoardHex(e, h)}
        className={
          unitIsSelected ?
            `${hexIsStartZoneHex(hex) ? 'startZoneHex' : ''}`
            :
            `${hexIsActiveHex(hex) ? 'selectedMapHex' : ''}`}
      >
        <UnitIcon unitForHex={unitForHex(hex)} />
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