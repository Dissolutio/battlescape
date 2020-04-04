import React from 'react'

import { GiArcher, GiRobotGolem, GiTearTracks, GiHornedReptile, GiSpy, GiGlock, GiSpikedDragonHead, GiRoundBottomFlask } from "react-icons/gi";

export const unitIcons = {
  hs1000: (props) => {
    // marrow warriors
    return (<GiHornedReptile {...props} />)
  },
  hs1001: (props) => {
    // death walker 9000
    return (<GiRobotGolem {...props} />)
  },
  hs1004: (props) => {
    // syvarris
    return (<GiArcher {...props} />)
  },
  hs1005: (props) => {
    // Krav maga agents
    return (<GiGlock {...props} />)
  },
  hs1007: (props) => {
    // Agent Carr
    return (<GiSpy {...props} />)
  },
  hs1013: (props) => {
    // Mimring
    return (<GiSpikedDragonHead {...props} />)
  },
  hs1014: (props) => {
    // NeGokSa
    return (<GiTearTracks {...props} />)
  },
}