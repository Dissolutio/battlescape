export class Point {
  x: number
  y: number
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}
export class Hex {
  q: number
  r: number
  s: number
  id: string
  constructor(q = 0, r = 0, s = 0) {
    this.q = q
    this.r = r
    this.s = s
    this.id = `${q},${r},${s}`
  }
}
export type HexOrientation = {
  f0: number
  f1: number
  f2: number
  f3: number
  b0: number
  b1: number
  b2: number
  b3: number
  startAngle: number
}
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
}
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
}
