import React from 'react'
import { HexGrid, Layout, Hexagon, HexUtils } from 'react-hexgrid';
import { unitIcons } from '../game/constants/unitIcons'
import { playerColors } from '../game/constants/playerColors'


export function MapDisplay({ mapProps }) {
  const { activeHex, hexagons, units, onClickBoardHex } = mapProps
  return (
    <HexGrid width={400} height={450}>
      <Layout size={{ x: 12, y: 12 }}>
        <MainMap activeHex={activeHex} hexagons={hexagons} units={units} onClickBoardHex={onClickBoardHex} />
      </Layout>
    </HexGrid>
  )
}
const MainMap = ({ hexagons, activeHex, units, onClickBoardHex }) => {
  return hexagons.map((hex, i) => {
    const unitForHex = units.find(unit => HexUtils.equals(hex, unit.coords[0]))
    return (
      <Hexagon
        key={i}
        {...hex}
        onClick={(e, h) => onClickBoardHex(e, h)}
        className={HexUtils.equals(hex, activeHex) ? 'selectedMapHex' : ''}
      >
        <UnitIcon unitForHex={unitForHex} />
      </Hexagon>
    )
  })
}
const UnitIcon = ({ unitForHex }) => {
  if (!unitForHex) { return null }
  const id = unitForHex && unitForHex.hsCardId
  const props = {
    style: {
      fill: `${playerColors[unitForHex.playerId]}`,
      fontSize: '0.5rem',
    }
  }
  return unitIcons[id](props)
}