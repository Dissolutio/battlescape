import React, { useState } from 'react'
import { HexUtils } from 'react-hexgrid';

import { MapDisplay } from './MapDisplay'
import './Board.css'

export default function Board(props) {
    const { boardHexes, startingUnits } = props.G
    const hexagons = Object.values(boardHexes)
    const units = Object.values(startingUnits)
    const [activeHex, setActiveHex] = useState({})
    const currentPlayer = props.ctx.currentPlayer;



    function onClickBoardHex(event, source) {
        const { q, r, s, id } = source.props
        setActiveHex({ q, r, s, id })
    }

    const dataReadoutProps = {
        activeHex,
    }
    const mapProps = {
        onClickBoardHex,
        hexagons,
        units,
        activeHex,
    }

    return (
        <div>
            <h1>Current player: {currentPlayer}</h1>
            <MapDisplay mapProps={mapProps} />
            <DataReadout dataReadoutProps={dataReadoutProps} />
        </div>
    )
}

const DataReadout = ({ dataReadoutProps }) => {
    const { activeHex } = dataReadoutProps
    if (activeHex.hasOwnProperty('id')) {
        return (
            <div>
                <div>ActiveHex: {`${activeHex.id}`}</div>
            </div>
        )
    }
    return null
}