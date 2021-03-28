import { Hex, Point, HexOrientation } from "./models"

const DIRECTIONS = [
  // +q -s
  new Hex(1, 0, -1),
  // +q -r
  new Hex(1, -1, 0),
  // +s -r
  new Hex(0, -1, 1),
  // +s -q
  new Hex(-1, 0, 1),
  // +r -q
  new Hex(-1, 1, 0),
  // +r -s
  new Hex(0, 1, -1),
]
function equals(a: Hex, b: Hex) {
  return a.q == b.q && a.r == b.r && a.s == b.s
}
function add(a: Hex, b: Hex) {
  return new Hex(a.q + b.q, a.r + b.r, a.s + b.s)
}
function subtract(a: Hex, b: Hex) {
  return new Hex(a.q - b.q, a.r - b.r, a.s - b.s)
}
function multiply(a: Hex, k: number) {
  return new Hex(a.q * k, a.r * k, a.s * k)
}
function lengths(hex: Hex) {
  return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2
}
function distance(a: Hex, b: Hex) {
  return HexUtils.lengths(HexUtils.subtract(a, b))
}
function direction(direction: number) {
  return HexUtils.DIRECTIONS[(6 + (direction % 6)) % 6]
}
function neighbor(hex: Hex, direction: number) {
  return HexUtils.add(hex, HexUtils.direction(direction))
}
function neighbors(hex: Hex) {
  return DIRECTIONS.map((direction, directionIndex) =>
    neighbor(hex, directionIndex)
  )
}
const round = (hex: Hex) => {
  let rq = Math.round(hex.q)
  let rr = Math.round(hex.r)
  let rs = Math.round(hex.s)

  const qDiff = Math.abs(rq - hex.q)
  const rDiff = Math.abs(rr - hex.r)
  const sDiff = Math.abs(rs - hex.s)

  if (qDiff > rDiff && qDiff > sDiff) rq = -rr - rs
  else if (rDiff > sDiff) rr = -rq - rs
  else rs = -rq - rr

  return new Hex(rq, rr, rs)
}
const hexToPixel = (
  hex: Hex,
  layout: {
    spacing: any
    orientation: HexOrientation
    size: { x: number; y: number }
    origin: { x: number; y: number }
  }
) => {
  const s = layout.spacing
  const M = layout.orientation
  let x = (M.f0 * hex.q + M.f1 * hex.r) * layout.size.x
  let y = (M.f2 * hex.q + M.f3 * hex.r) * layout.size.y
  // Apply spacing
  x = x * s
  y = y * s
  return new Point(x + layout.origin.x, y + layout.origin.y)
}
const pixelToHex = (point, layout) => {
  const M = layout.orientation
  const pt = new Point(
    (point.x - layout.origin.x) / layout.size.x,
    (point.y - layout.origin.y) / layout.size.y
  )
  const q = M.b0 * pt.x + M.b1 * pt.y
  const r = M.b2 * pt.x + M.b3 * pt.y
  const hex = new Hex(q, r, -q - r)
  return HexUtils.round(hex)
}
const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t
}
const hexLerp = (a: Hex, b: Hex, t: number) => {
  return new Hex(
    HexUtils.lerp(a.q, b.q, t),
    HexUtils.lerp(a.r, b.r, t),
    HexUtils.lerp(a.s, b.s, t)
  )
}
const getID = (hex: Hex) => {
  return `${hex.q},${hex.r},${hex.s}`
}
export const HexUtils = {
  DIRECTIONS,
  equals,
  add,
  subtract,
  multiply,
  lengths,
  distance,
  direction,
  neighbor,
  neighbors,
  round,
  hexToPixel,
  pixelToHex,
  lerp,
  hexLerp,
  getID,
}

// {

//   DIRECTIONS: Hex[];
//   equals: (a: Hex, b: Hex) => boolean;
//     add: (a: Hex, b: Hex) => Hex;
//     subtract: (a: Hex, b: Hex) => Hex;
//     multiply: (a: Hex, k: number) => Hex;
//     lengths: (hex: Hex) => number;
//     distance: (a: Hex, b: Hex) => number;
// }
