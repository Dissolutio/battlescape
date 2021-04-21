import { contourLinesBG } from "assets/contourLinesBG"
import { makeHexagonsHeroPatternDataUrl } from "assets/hexagonsHeroPatternDataUrl"

export const colors = {
  gray: "#5d576b",
  // player colors
  beeYellow: "#E0BB00",
  butterflyPurple: "#fc65b8",
  waspRed: "#E4572E",
  beetleBlue: "#058ed9",
  hummingbirdGreen: "#75DBCD",
  humansPurple: "#8900f2",
}

const bgContourLines = (playerID: string) =>
  contourLinesBG(encodeURIComponent(playerColors[playerID]), "0.1")
const hexSvgBgUrl = (playerID: string) =>
  makeHexagonsHeroPatternDataUrl(playerColors[playerID], 0.2)

export const playerColors = {
  "0": colors.beeYellow,
  "1": colors.butterflyPurple,
  "2": colors.waspRed,
  "3": colors.beetleBlue,
  "4": colors.hummingbirdGreen,
  "5": colors.humansPurple,
}

export const theme = (playerID: string) => {
  return {
    colors,
    playerColors,
    playerColor: playerColors[playerID],
    playerColorUrlEncoded: encodeURIComponent(playerColors[playerID]),
    bgContourLinesUrl: bgContourLines(playerID),
    hexSvgBgUrl: hexSvgBgUrl(playerID),
  }
}
