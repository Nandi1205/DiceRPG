const players = require('../players.js')
const levelRequirements = require('../constants/level-requirements.json')
const newEmbed = require('./new-embed.js')

module.exports = (user) => {
  const player = players[user.id]

  if (player.xp < levelRequirements[player.level] || player.level === 50) {
    return
  }

  for (let i = 0; player.xp >= levelRequirements[player.level + i]; i ++) {
    players[user.id].level ++
  }

  const embed =
  newEmbed(
    user,
    ':tada: Level Up',
    `You have levelled up! Your level now is:\n*${player.level}/50*`
  )

  return embed
}