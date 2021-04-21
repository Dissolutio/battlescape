import { coreHeroscapeCards } from './coreHeroscapeCards'
import { MS1Cards } from './setWaves'
export const Core_Data = organizeCards(coreHeroscapeCards)
export const MS1_Data = organizeCards(MS1Cards)
export const W1_Data = organizeCards(MS1Cards)

function organizeCards(cards) {
  const myCards = [...MS1Cards]
  const squads = myCards.filter((card) => card.type.includes('squad'))
  const heroes = myCards.filter((card) => card.type.includes('hero'))
  const abilities = myCards.reduce((previous, current) => {
    const abilities = [...current.abilities]
    return previous.concat(abilities)
  }, [])
  return {
    cards: MS1Cards,
    squads,
    heroes,
    abilities,
    uniqueSquads: squads.filter((c) => c.type.includes('unique')),
    commonSquads: squads.filter((c) => c.type.includes('common')),
    uniqueHeroes: heroes.filter((c) => c.type.includes('unique')),
    commonHeroes: heroes.filter((c) => c.type.includes('common')),
    uncommonHeroes: heroes.filter((c) => c.type.includes('uncommon')),
  }
}

export const neGokSa = MS1Cards.find((unit) => unit.name === 'Ne-gok-sa')
export const marroWarriors = MS1Cards.find(
  (unit) => unit.name === 'Marro Warriors',
)
export const mimring = MS1Cards.find((unit) => unit.name === 'Mimring')
export const syvarris = MS1Cards.find((unit) => unit.name === 'Syvarris')
export const deathwalker9000 = MS1Cards.find(
  (unit) => unit.name === 'Deathwalker 9000',
)

export const agentCarr = MS1Cards.find((unit) => unit.name === 'Agent Carr')
export const kravMagaAgents = MS1Cards.find(
  (unit) => unit.name === 'Krav Maga Agents',
)
