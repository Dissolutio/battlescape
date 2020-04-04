import React from 'react'
import styled from 'styled-components';
import { Image } from "cloudinary-react"

export const ArmyForPlacing = ({ availableUnits, onClickUnit, selectedUnitGameID }) => {

  const selectedStyle = (gameID) => {
    if (selectedUnitGameID === gameID) {
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
      <h2>Units available to place on map:</h2>
      <Wrapper>
        {availableUnits && availableUnits.map(unit => (
          <li
            key={unit.gameID}
          >
            <button
              style={selectedStyle(unit.gameID)}
              onClick={() => onClickUnit(unit.gameID)}
            >
              <Image cloudName="mystery-maintenance" publicId={`${unit.image}`} alt={unit.name} />
              <span>{unit.name}</span>
            </button>
          </li>
        ))}
      </Wrapper>
    </>
  )
}
const Wrapper = styled.ul`
display: flex;
flex-flow: row wrap;
list-style-type: none;
margin: 0;
padding: 0;
li {
  width: 120px;
}
button {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
}
img {
  margin: 0.5rem 0 0 0;
  border-radius: 35%;
  width: 2.5rem;
  height: 2.5rem;
}
span {
  font-size: 0.7rem;
}
`