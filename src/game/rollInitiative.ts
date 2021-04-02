type Roll = {
  playerID: string,
  roll: number
}

export function rollD20Initiative(playerIDs: string[]) {
  const initialRolls = genRolls(playerIDs)
 return initialRolls.reduce(rollsToInitiative, [])
}

function rollsToInitiative(initiative: string[], curr: Roll, i: number, arr: Roll[]): string[] {
  // Player already in initiative result? Move on
  if (initiative.find((elem) => elem === curr.playerID)) {
    return [...initiative]
  }
  // Player has tied other player(s) ? Settle tie, add all involved to initiative
  const tiedRolls = arr.filter((rollObj) => rollObj.roll === curr.roll)
  if (tiedRolls.length >= 2) {
    const tiedPlayers = tiedRolls.map((rollObj) => rollObj.playerID)
    const newRollsForTiedPlayers = genRolls(tiedPlayers)
    const initiativeFromTieBreaker = newRollsForTiedPlayers.reduce(
      rollsToInitiative,
      []
    )
    return [...initiative, ...initiativeFromTieBreaker]
  } else {
    return [...initiative, curr.playerID]
  }
}
function genRolls(players: string[]) {
  const rolls = players.map(function (playerID) {
    return { playerID: playerID, roll: rollDie(20) }
  })
  return rolls.sort(highToLow)
}
function highToLow(a: Roll, b: Roll) {
  if (a.roll === b.roll) {
    return 0
  }
  if (a.roll > b.roll) {
    return -1
  }
  if (a.roll < b.roll) {
    return 1
  }
}
function rollDie(sides = 6) {
  return 1 + Math.floor(Math.random() * sides)
}
