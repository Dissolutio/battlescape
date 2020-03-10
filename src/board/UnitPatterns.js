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
      <Pattern id="marrowarriors-portrait" x="3" y="3" link={marrowarriors} />
      <Pattern id="syvarris-portrait" link={syvarris} />
      <Pattern id="kravmagaagents-portrait" link={kravmagaagents} />
      <Pattern id="agentcarr-portrait" link={agentcarr} />
      <Pattern id="mimring-portrait" link={mimring} />
      <Pattern id="negoksa-portrait" link={negoksa} />
    </>
  )
}