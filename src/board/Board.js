import React, { useState } from 'react'
import {
    HexGrid, Layout,
    Hexagon, Text, HexUtils
} from 'react-hexgrid';
import { unitIcons } from '../game/unitIcons'
import { playerColors } from '../game/playerColors'
import './Board.css'

export default function Board(props) {
    const { boardHexes, startingUnits, armyCardsInGame } = props.G
    const hexagons = Object.values(boardHexes)
    const units = Object.values(startingUnits)

    const [activeHex, setActiveHex] = useState({ q: 0, r: 0, s: 0, id: 'q0r0s0' })


    function onClickBoardHex(event, source) {
        const { q, r, s, id } = source.props
        setActiveHex({ q, r, s, id })
    }

    return (
        <div>
            <HexGrid width={400} height={450}>
                <Layout size={{ x: 12, y: 12 }}>
                    <MainMap activeHex={activeHex} hexagons={hexagons} units={units} onClickBoardHex={onClickBoardHex} />
                </Layout>
            </HexGrid>
            <DataReadout activeHex={activeHex} units={units} armyCardsInGame={armyCardsInGame} />
        </div>
    )
}

const MainMap = ({ hexagons, activeHex, units, onClickBoardHex }) => {
    return hexagons.map((hex, i) => {
        const unitForHex = units.find(unit => HexUtils.equals(hex, unit.coords[0]))
        console.log("TCL: MainMap -> unitForHex", unitForHex)
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

const DataReadout = ({ activeHex, units, armyCardsInGame }) => {
    const unitOnHex = units.find(unit => HexUtils.equals(activeHex, unit.coords[0]))
    const unitInfo = unitOnHex && armyCardsInGame[unitOnHex.hsCardId]
    return (
        <div>
            <div>ActiveHex: {`${activeHex.id}`}</div>
            <p>"{`${activeHex.id}`}"</p>
            {unitOnHex ? (<p>Unit on Hex: {unitInfo.name} Player{unitInfo.playerId}</p>) : null}
        </div>
    )
}