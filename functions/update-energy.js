const users = require('../users.js')
const error = require('../functions/error.js')

module.exports = (interaction, userId, energyChange) => {
  const energy = users[userId].energy
  const currentTime = new Date().getTime() / 1000

  if (energy.amount === 10 && energyChange !== 0) {
    users[userId].energy.savedTimestamp = currentTime
  }

  const newEnergy = Math.floor((currentTime - energy.savedTimestamp) / 1800)

  users[userId].energy.savedTimestamp += newEnergy * 1800

  if (energy.amount + newEnergy > 10) {
    users[userId].energy.amount = 10
  } else {
    users[userId].energy.amount += newEnergy
  }

  if (energy.amount - energyChange < 0) {
    return error(interaction, 'You do not have enough energy.')
  }

  users[userId].energy.amount -= energyChange
}