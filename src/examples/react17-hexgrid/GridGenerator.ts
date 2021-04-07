import { Hex } from "./models";
import { HexUtils } from "./HexUtils";

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
