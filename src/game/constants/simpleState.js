import { GridGenerator } from 'react-hexgrid';
import { convertCardsToStartingUnits } from './startingUnits'
import { neGokSa, agentCarr } from './hsSelectors'

const boardHexes = GridGenerator.hexagon(1)
const cardQuantity = 2
const armyCardsInGame =
{
  [neGokSa.id]: {
    ...neGokSa,
    cardQuantity,
    playerId: '0',
  },
  [agentCarr.id]: {
    ...agentCarr,
    cardQuantity,
    playerId: '1',
  },
}
const startingUnits = convertCardsToStartingUnits(armyCardsInGame)

export default {
  startingUnits,
  boardHexes,
  armyCardsInGame,
}

