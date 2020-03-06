import React from 'react'
import { HexGrid, Layout, Hexagon, HexUtils } from 'react-hexgrid';
import { unitIcons } from '../game/constants/unitIcons'
import { playerColors } from '../game/constants/playerColors'


export function MapDisplay({ mapProps }) {
  const { activeHex, boardHexes, onClickBoardHex } = mapProps
  const hexagons = Object.values(boardHexes)
  return (
    <HexGrid width={400} height={450}>
      <Layout size={{ x: 8, y: 8 }}>
        <MainMap activeHex={activeHex} hexagons={hexagons} onClickBoardHex={onClickBoardHex} />
      </Layout>
    </HexGrid>
  )
}
const MainMap = ({ hexagons, activeHex, onClickBoardHex }) => {
  return hexagons.map((hex, i) => {
    return (
      <Hexagon
        key={i}
        {...hex}
        onClick={(e, h) => onClickBoardHex(e, h)}
        className={HexUtils.equals(hex, activeHex) ? 'selectedMapHex' : ''}
      >
      </Hexagon>
    )
  })
}

// <UnitIcon unitForHex={unitForHex} />
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