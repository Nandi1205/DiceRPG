const players = require('../players.js')
const error = require('./error.js')

module.exports = (interaction, userId, energyChange) => {
  const energy = players[userId].energy
  const currentTime = new Date().getTime() / 1000

  if (energy.amount === 10 && energyChange !== 0) {
    players[userId].energy.savedTimestamp = currentTime
  }

  const newEnergy = Math.floor((currentTime - energy.savedTimestamp) / 1800)

  players[userId].energy.savedTimestamp += newEnergy * 1800

  if (energy.amount + newEnergy > 10) {
    players[userId].energy.amount = 10
  } else {
    players[userId].energy.amount += newEnergy
  }

  if (energy.amount - energyChange < 0) {
    return error(interaction, "You don't have enough energy.")
  }

  players[userId].energy.amount -= energyChange
}