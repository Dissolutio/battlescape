import { contourLinesBG } from "assets/contourLinesBG"
import { makeHexagonsHeroPatternDataUrl } from "assets/hexagonsHeroPatternDataUrl"

export const colors = {
  gray: "#5d576b",
  grayUrlEncoded: "%235d576b",
  // player colors
  beeYellow: "#E0BB00",
  beeYellowUrlEncoded: "%23E0BB00",
  butterflyPurple: "#fc65b8",
  butterflyPurpleUrlEncoded: "%23fc65b8",
  waspRed: "#E4572E",
  waspRedUrlEncoded: "%23E4572E",
  beetleBlue: "#058ed9",
  beetleBlueUrlEncoded: "%23058ed9",
  hummingbirdGreen: "#75DBCD",
  hummingbirdGreenUrlEncoded: "%2375DBCD",
  humansGoldenrod: "#E8AA14",
  humansGoldenrodUrlEncoded: "%23E8AA14",
}
const playerColorsUrlEncoded = {
  "0": colors.beeYellowUrlEncoded,
  "1": colors.butterflyPurpleUrlEncoded,
  "2": colors.waspRedUrlEncoded,
  "3": colors.beetleBlueUrlEncoded,
  "4": colors.hummingbirdGreen,
  "5": colors.humansGoldenrodUrlEncoded,
}

const bgContourLines = (playerID: string) =>
  contourLinesBG(playerColorsUrlEncoded[playerID], "0.1")
const hexSvgBgUrl = (playerID: string) =>
  makeHexagonsHeroPatternDataUrl(playerColors[playerID], 0.2)

const playerColors = {
  "0": colors.beeYellow,
  "1": colors.butterflyPurple,
}

export const theme = (playerID: string) => {
  return {
    colors,
    playerColors,
    playerColor: playerColors[playerID],
    playerColorUrlEncoded: encodeURIComponent(playerColorsUrlEncoded[playerID]),
    bgContourLinesUrl: bgContourLines(playerID),
    hexSvgBgUrl: hexSvgBgUrl(playerID),
  }
}
