import { GridGenerator, Hex } from "react17-hexgrid"
import { BoardHexes, HexTerrain } from "./types"
import { generateHexID } from "./constants"

function hexesToBoardHexes(hexgridHexes: Hex[]): BoardHexes {
  return hexgridHexes.reduce((prev, curr, i): BoardHexes => {
    const boardHex = {
      ...curr,
      id: generateHexID(curr),
      startzonePlayerIDs: [],
      // assign all to grass
      terrain: HexTerrain.grass,
      // assign all to altitude 1
      altitude: 1,
    };
    return {
      ...prev,
      [boardHex.id]: boardHex,
    };
  }, {});
}
// REACT-HEXGRID GENERATORS
export const generateHexagon = (mapSize: number): BoardHexes => {
  const hexgridHexes = GridGenerator.hexagon(mapSize)
  const boardHexes = hexesToBoardHexes(hexgridHexes)
  return boardHexes
}
export function generateOrientedRectangle(
  mapLength: number,
  mapWidth: number
): BoardHexes {
  const hexgridHexes = GridGenerator.orientedRectangle(mapLength, mapWidth);
  const boardHexes = hexesToBoardHexes(hexgridHexes);
  return boardHexes;
}
export function generateRectangle(
  mapLength: number,
  mapWidth: number
): BoardHexes {
  const hexgridHexes = GridGenerator.rectangle(mapLength, mapWidth);
  const boardHexes = hexesToBoardHexes(hexgridHexes);
  return boardHexes;
}
