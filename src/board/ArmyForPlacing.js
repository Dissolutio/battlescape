import React from 'react'
import styled from 'styled-components';
import { Image } from "cloudinary-react"

export const ArmyForPlacing = ({ availableUnits, onClickUnit, activeUnitID, errorMsg }) => {

  const selectedStyle = (unitID) => {
    if (activeUnitID === unitID) {
      return {
        boxShadow: `0 0 5px rgba(81, 203, 238, 1)`,
        padding: `3px 0px 3px 3px`,
        margin: `5px 1px 3px 0px`,
        border: `1px solid rgba(81, 203, 238, 1)`,
      }
    } else {
      return {}
    }
  }

  return (
    <>
      <ArmyListStyle>
        {availableUnits && availableUnits.map(unit => (
          <li
            key={unit.unitID}
          >
            <button
              style={selectedStyle(unit.unitID)}
              onClick={() => onClickUnit(unit.unitID)}
            >
              <Image cloudName="mystery-maintenance" publicId={`${unit.image}`} alt={unit.name} />
              <span>{unit.name}</span>
            </button>
          </li>
        ))}
      </ArmyListStyle>
      <p style={{ color: "red" }}>{errorMsg}</p>
    </>
  )
}
const ArmyListStyle = styled.ul`
display: flex;
flex-flow: row wrap;
list-style-type: none;
margin: 0;
padding: 0;
button {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
}
img {
  border-radius: 35%;
  width: auto;
  height: 1.5rem;
}
span {
  font-size: 0.3rem;
}
`