import { coreHeroscapeCards } from './coreHeroscapeCards'

export const setWaves = [...new Set(coreHeroscapeCards.map((c) => c.setWave))]

export const MS1Cards= coreHeroscapeCards.filter(
  (card) => card.setWave === 'Master Set: Rise of the Valkyrie',
)
export const W1Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 1: Malliddon's Prophecy`,
)
export const W2Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 2: Utgar's Rage`,
)
export const W3Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 3: Jandar's Oath`,
)
export const W4Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 4: Zanafor's Discovery`,
)
export const GW1Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Giant Wave 1: Orm's Return`,
)
export const GW2Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Giant Wave 2: Raknar's Vision`,
)
export const GW3Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Giant Wave 3: Aquilla's Alliance`,
)
export const MS2Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Master Set: Swarm of the Marro`,
)
export const MS3Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Master Set: Battle for the Underdark`,
)
export const W5Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 5: Thora's Vengeance`,
)
export const W6Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 6: Dawn of Darkness`,
)
export const W7Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 7: Fields of Valor`,
)
export const W8Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 8: Defenders of Kinsland`,
)
export const W9Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 9: Blackmoon Siege`,
)
export const W10Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 10: Valkrill's Gambit`,
)
export const W11Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 11: Champions of the Forgotten Realms`,
)
export const W12Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 12: Warriors of Eberron`,
)
export const W13Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Wave 13: Moltenclaw's Invasion`,
)
export const T1Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Terrain Set 1: Road to the Forgotten Forest`,
)
export const T2Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Terrain Set 2: Volcarren Wasteland`,
)
export const T3Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Terrain Set 3: Thaelenk Tundra`,
)
export const T4Cards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Terrain Set 4: Ticalla Jungle`,
)
export const SRCards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Special Release`,
)
export const SRFlagBearerCards = coreHeroscapeCards.filter(
  (card) => card.setWave === `Special Release: Crest of the Valkyrie`,
)
