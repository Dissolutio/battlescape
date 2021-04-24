import React from "react"
import styled from "styled-components"
import { MapHexes } from "./MapHexes"

import { MapHexStyles } from "./MapHexStyles"
import { ReactHexgrid } from "./ReactHexgrid"
import { useBgioG } from "bgio-contexts"
import { MapZoomControls } from "./MapZoomControls"

export const MapDisplay = () => {
  const { G } = useBgioG()
  const { hexMap } = G
  const { hexSize, mapSize, flat } = hexMap

  //! MAP SETUP/LAYOUT CONFIG
  const initialMapState = {
    width: 100,
    height: 100,
    origin: { x: -500, y: -500 },
    flat,
    spacing: 0.99,
  }
  const [mapState, setMapState] = React.useState(() => initialMapState)

  //! ZOOM FEATURE
  const mapRef = React.useRef()
  const zoomInterval = 100
  // increases width and height by zoom interval, attempts scroll correction afterwards
  const handleClickZoomIn = () => {
    const el: any = mapRef.current
    setMapState((mapState) => ({
      ...mapState,
      width: mapState.width + zoomInterval,
      height: mapState.height + zoomInterval,
    }))
    try {
      el.scrollBy(2 * zoomInterval, 2 * zoomInterval)
    } catch (error) {
      console.error(
        `🚀 ~ handleClickZoomIn ~ couldn't zoom in, sorry! It's because we tried to scroll on an html element that didn't programmatically exist at the time, unfortunately. Here's the error:`,
        error
      )
    }
  }
  // decreases width and height by zoom interval, attempts scroll correction afterwards
  const handleClickZoomOut = () => {
    const el: any = mapRef.current
    setMapState((s) => ({
      ...s,
      width: s.width - zoomInterval,
      height: s.height - zoomInterval,
    }))
    try {
      el.scrollBy(-2 * zoomInterval, -2 * zoomInterval)
    } catch (error) {
      console.error(
        `🚀 ~ handleClickZoomOut ~ couldn't zoom out, sorry! It's because we tried to scroll on an html element that didn't programmatically exist at the time, unfortunately. Here's the error:`,
        error
      )
    }
  }
  return (
    <MapStyle>
      <MapZoomControls
        handleClickZoomIn={handleClickZoomIn}
        handleClickZoomOut={handleClickZoomOut}
      />
      <MapHexStyles hexSize={hexSize}>
        <MapHexStyles hexSize={hexSize} ref={mapRef}>
          <ReactHexgrid
            mapSize={mapSize}
            hexSize={hexSize}
            width={`${mapState.width}%`}
            height={`${mapState.height}%`}
            flat={mapState.flat}
            spacing={mapState.spacing}
            origin={mapState.origin}
          >
            <MapHexes hexSize={hexSize} />
          </ReactHexgrid>
        </MapHexStyles>
      </MapHexStyles>
    </MapStyle>
  )
}

const MapStyle = styled.div`
  height: 100%;
  transform-style: preserve-3d;
  position: relative;
`
