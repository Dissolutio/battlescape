export type HexgridCtxLayout = {
  orientation: HexOrientation;
  origin: Point;
  size: Point;
  spacing: number;
};

export type Point = {
  x: number;
  y: number;
};
export type Hex = {
  q: number;
  r: number;
  s: number;
};
export type HexOrientation = {
  f0: number;
  f1: number;
  f2: number;
  f3: number;
  b0: number;
  b1: number;
  b2: number;
  b3: number;
  startAngle: number;
};
export const flatOrientation = {
  f0: 3.0 / 2.0,
  f1: 0.0,
  f2: Math.sqrt(3.0) / 2.0,
  f3: Math.sqrt(3.0),
  b0: 2.0 / 3.0,
  b1: 0.0,
  b2: -1.0 / 3.0,
  b3: Math.sqrt(3.0) / 3.0,
  startAngle: 0.0,
};
export const pointyOrientation = {
  f0: Math.sqrt(3.0),
  f1: Math.sqrt(3.0) / 2.0,
  f2: 0.0,
  f3: 3.0 / 2.0,
  b0: Math.sqrt(3.0) / 3.0,
  b1: -1.0 / 3.0,
  b2: 0.0,
  b3: 2.0 / 3.0,
  startAngle: 0.5,
};


export const GridGenerator = {
  ring,
  spiral,
  parallelogram,
  triangle,
  hexagon,
  rectangle,
  orientedRectangle,
};

function ring(center: Hex, mapRadius: number): Hex[] {
  let hexArr = [];
  let hex = HexUtils.add(
    center,
    HexUtils.multiply(HexUtils.direction(4), mapRadius)
  );
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < mapRadius; j++) {
      hexArr.push(hex);
      hex = HexUtils.neighbor(hex, i);
    }
  }
  return hexArr;
}

function spiral(center: Hex, mapRadius: number): Hex[] {
  let hexArr = [center];
  for (let k = 1; k <= mapRadius; k++) {
    const temp = GridGenerator.ring(center, k);
    hexArr = hexArr.concat(temp);
  }
  return hexArr;
}

function parallelogram(q1: number, q2: number, r1: number, r2: number): Hex[] {
  let hexArr = [];
  for (let q = q1; q <= q2; q++) {
    for (let r = r1; r <= r2; r++) {
      hexArr.push({ q, r, s: -q - r });
    }
  }
  return hexArr;
}

function triangle(mapSize: number): Hex[] {
  let hexArr = [];
  for (let q = 0; q <= mapSize; q++) {
    for (let r = 0; r <= mapSize - q; r++) {
      hexArr.push({ q, r, s: -q - r });
    }
  }
  return hexArr;
}

function hexagon(mapRadius: number): Hex[] {
  let hexArr = [];
  for (let q = -mapRadius; q <= mapRadius; q++) {
    let r1 = Math.max(-mapRadius, -q - mapRadius);
    let r2 = Math.min(mapRadius, -q + mapRadius);
    for (let r = r1; r <= r2; r++) {
      hexArr.push({ q, r, s: -q - r });
    }
  }
  return hexArr;
}

function rectangle(mapWidth: number, mapHeight: number): Hex[] {
  let hexArr = [];
  for (let r = 0; r < mapHeight; r++) {
    let offset = Math.floor(r / 2); // or r>>1
    for (let q = -offset; q < mapWidth - offset; q++) {
      hexArr.push({ q, r, s: -q - r });
    }
  }
  return hexArr;
}

function orientedRectangle(mapWidth: number, mapHeight: number): Hex[] {
  let hexArr = [];
  for (let q = 0; q < mapWidth; q++) {
    let offset = Math.floor(q / 2); // or q>>1
    for (let r = -offset; r < mapHeight - offset; r++) {
      hexArr.push({ q, r, s: -q - r });
    }
  }
  return hexArr;
}


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
