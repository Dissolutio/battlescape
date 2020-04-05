import React from 'react'

export const DataReadout = ({ activeHex }) => {
  console.log("DataReadout -> activeHex", activeHex)
  return (
    <div>
      <div>ActiveHex: {`${(activeHex && activeHex.id) || 'none'}`}</div>
      <div>Unit on Hex: {`${(activeHex && activeHex.occupyingUnitID) || 'none'}`}</div>
    </div>
  )
}

