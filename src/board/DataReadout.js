import React from 'react'

export const DataReadout = ({ dataReadoutProps }) => {
  const { activeHexID } = dataReadoutProps
  if (activeHexID.hasOwnProperty('id')) {
    return (
      <div>
        <div>ActiveHex: {`${activeHexID.id}`}</div>
        <div>Unit on Hex: {`${activeHexID.unitGameID || 'none'}`}</div>
      </div>
    )
  }
  return null
}

