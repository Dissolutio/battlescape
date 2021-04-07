import { HexgridCtxLayout } from "./HexgridLayout";
import { Hex, Point, HexOrientation } from "./models";

const DIRECTIONS = [
  // +q -s
  { q: 1, r: 0, s: -1 },
  // +q -r
  { q: 1, r: -1, s: 0 },
  // +s -r
  { q: 0, r: -1, s: 1 },
  // +s -q
  { q: -1, r: 0, s: 1 },
  // +r -q
  { q: -1, r: 1, s: 0 },
  // +r -s
  { q: 0, r: 1, s: -1 },
];
function equals(a: Hex, b: Hex) {
  return a.q === b.q && a.r === b.r && a.s === b.s;
}
function add(a: Hex, b: Hex) {
  return { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s };
}
function subtract(a: Hex, b: Hex) {
  return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
}
function multiply(a: Hex, k: number) {
  return { q: a.q * k, r: a.r * k, s: a.s * k };
}
function lengths(hex: Hex) {
  return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2;
}
function distance(a: Hex, b: Hex) {
  return HexUtils.lengths(HexUtils.subtract(a, b));
}
function direction(direction: number) {
  return HexUtils.DIRECTIONS[(6 + (direction % 6)) % 6];
}
function neighbor(hex: Hex, direction: number) {
  return HexUtils.add(hex, HexUtils.direction(direction));
}
function neighbors(hex: Hex): Hex[] {
  return DIRECTIONS.map((direction, directionIndex) =>
    neighbor(hex, directionIndex)
  );
}
const round = (hex: Hex) => {
  let rq = Math.round(hex.q);
  let rr = Math.round(hex.r);
  let rs = Math.round(hex.s);

  const qDiff = Math.abs(rq - hex.q);
  const rDiff = Math.abs(rr - hex.r);
  const sDiff = Math.abs(rs - hex.s);

  if (qDiff > rDiff && qDiff > sDiff) rq = -rr - rs;
  else if (rDiff > sDiff) rr = -rq - rs;
  else rs = -rq - rr;

  return { q: rq, r: rr, s: rs };
};
const hexToPixel = (
  hex: Hex,
  layout: {
    spacing: any;
    orientation: HexOrientation;
    size: { x: number; y: number };
    origin: { x: number; y: number };
  }
) => {
  const s = layout.spacing;
  const M = layout.orientation;
  let x = (M.f0 * hex.q + M.f1 * hex.r) * layout.size.x;
  let y = (M.f2 * hex.q + M.f3 * hex.r) * layout.size.y;
  // Apply spacing
  x = x * s;
  y = y * s;
  return { x: x + layout.origin.x, y: y + layout.origin.y };
};
const pixelToHex = (point: Point, layout: HexgridCtxLayout) => {
  const M = layout.orientation;
  const pt = {
    x: (point.x - layout.origin.x) / layout.size.x,
    y: (point.y - layout.origin.y) / layout.size.y,
  };
  const q = M.b0 * pt.x + M.b1 * pt.y;
  const r = M.b2 * pt.x + M.b3 * pt.y;
  const hex = { q, r, s: -q - r };
  return HexUtils.round(hex);
};
const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
};
const hexLerp = (a: Hex, b: Hex, t: number) => {
  return {
    q: HexUtils.lerp(a.q, b.q, t),
    r: HexUtils.lerp(a.r, b.r, t),
    s: HexUtils.lerp(a.s, b.s, t),
  };
};
const getID = (hex: Hex) => {
  return `${hex.q},${hex.r},${hex.s}`;
};
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
};
