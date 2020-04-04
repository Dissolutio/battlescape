import React from 'react'
// SEE BELOW for <Pattern /> DETAILS
import { Pattern } from 'react-hexgrid'

import kravmagaagents from '../portraits/kravmagaagents.jpg'
import agentcarr from '../portraits/agentcarr.jpg'
import negoksa from '../portraits/negoksa.jpg'
import syvarris from '../portraits/syvarris.jpg'
import marrowarriors from '../portraits/marrowarriors.jpg'
import deathwalker9000 from '../portraits/deathwalker9000.jpg'
import mimring from '../portraits/mimring.jpg'
export const UnitPatterns = () => {
  return (
    <>
      <Pattern id="marrowarriors-portrait" link={marrowarriors} x={9} y={9} />
      <Pattern id="deathwalker9000-portrait" link={deathwalker9000} />
      <Pattern id="syvarris-portrait" link={syvarris} />
      <Pattern id="kravmagaagents-portrait" link={kravmagaagents} />
      <Pattern id="agentcarr-portrait" link={agentcarr} />
      <Pattern id="mimring-portrait" link={mimring} />
      <Pattern id="negoksa-portrait" link={negoksa} />
    </>
  )
}
// THIS IS WHAT PATTERN FROM REACT-HEXGRID LOOKS LIKE
// const Pattern = (props) => {
//   const { id, link, x, y, height, width } = props
//   return (
//     <defs>
//       <pattern id={id} patternUnits="objectBoundingBox" x={x} y={y} width={width} height={height}>
//         <image xlinkHref={link} x={0} y={0} width={parseInt(width) * 2} height={parseInt(height) * 2} />
//       </pattern>
//     </defs>
//   );
// }