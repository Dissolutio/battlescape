import React from 'react'

import { GiTearTracks, GiHornedReptile, GiSpy, GiGlock, GiSpikedDragonHead } from "react-icons/gi";

export const unitIcons = {
  hs1000: (props) => {
    return (<GiHornedReptile {...props} />)
  },
  hs1005: (props) => {
    return (<GiGlock {...props} />)
  },
  hs1007: (props) => {
    return (<GiSpy {...props} />)
  },
  hs1013: (props) => {
    return (<GiSpikedDragonHead {...props} />)
  },
  hs1014: (props) => {
    return (<GiTearTracks {...props} />)
  },
}