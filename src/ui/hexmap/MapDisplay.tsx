import React from "react"
import { GridGenerator, Hexagon } from "../../examples/react17-hexgrid"

import { MapHexStyles } from "./MapHexStyles"
import { ReactHexgrid } from "./ReactHexgrid"

export const MapDisplay = () => {
  //! MAP SETUP/LAYOUT CONFIG
  const mapSize = 20
  const hexSize =
    mapSize <= 3 ? 15 : mapSize <= 5 ? 20 : mapSize <= 10 ? 25 : 25
  const initialHexes = GridGenerator.hexagon(mapSize)
  const mapState = {
    mapSize,
    hexSize,
    width: "100%",
    height: 800,
    flat: true,
    origin: { x: 0, y: 0 },
    spacing: 1.15,
  }

  return (
    <MapHexStyles hexSize={mapState.hexSize}>
      <ReactHexgrid
        mapSize={mapState.mapSize}
        hexSize={mapState.hexSize}
        width={mapState.width}
        height={mapState.height}
        flat={mapState.flat}
        spacing={mapState.spacing}
        origin={mapState.origin}
      >
        {initialHexes.map((hex, i) => (
          <Hexagon hex={hex} key={i} />
        ))}
      </ReactHexgrid>
    </MapHexStyles>
  )
}
