import { coreHeroscapeCards } from './coreHeroscapeCards'

export const MS1Cards = coreHeroscapeCards.filter(filterMasterSetROTV)
export const MS1Heroes = MS1Cards.filter(filterHero)
export const MS1Squads = MS1Cards.filter(filterSquad)
export const MS1Abilities = MS1Cards.reduce(getAbilities, [])

function filterMasterSetROTV(card) {
  if (card.setWave !== 'Master Set: Rise of the Valkyrie') return false
  return true
}
function filterHero(card) {
  if (card.type.includes('hero')) return true
  return false
}
function filterSquad(card) {
  if (card.type.includes('squad')) return true
  return false
}
function getAbilities(previous, current, index, array) {
  const abilities = [...current.abilities]
  return previous.concat(abilities)
}
