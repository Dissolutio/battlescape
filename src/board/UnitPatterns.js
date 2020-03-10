import React from 'react'
import { Pattern } from 'react-hexgrid'
import kravmagaagents from '../portraits/kravmagaagents.jpg'
import agentcarr from '../portraits/agentcarr.jpg'
import negoksa from '../portraits/negoksa.jpg'
import syvarris from '../portraits/syvarris.jpg'
import marrowarriors from '../portraits/marrowarriors.jpg'
import mimring from '../portraits/mimring.jpg'
export const UnitPatterns = () => {
  return (
    <>
      <Pattern id="marrowarriors-portrait"
        size={{ x: 9, y: 9 }}
        link={marrowarriors} />
      <Pattern id="syvarris-portrait" link={syvarris} />
      <Pattern id="kravmagaagents-portrait" link={kravmagaagents} />
      <Pattern id="agentcarr-portrait" link={agentcarr} />
      <Pattern id="mimring-portrait" link={mimring} />
      <Pattern id="negoksa-portrait" link={negoksa} />
    </>
  )
}

// const Pattern = (props) => {
//   const { id, link, x, y, height, width } = props
//   // static propTypes = {
//   //   id: PropTypes.string.isRequired,
//   //   link: PropTypes.string.isRequired,
//   //   size: PropTypes.object
//   // };
//   // static defaultProps = {
//   //   size: new Point(10, 10)
//   // };
//   return (
//     <defs>
//       <pattern id={id} patternUnits="objectBoundingBox" x={x} y={y} width={width} height={height}>
//         <image xlinkHref={link} x={0} y={0} width={parseInt(width) * 2} height={parseInt(height) * 2} />
//       </pattern>
//     </defs>
//   );
// }