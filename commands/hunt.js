const gatherCommand = require('../functions/gather-command.js')

module.exports = (interaction) => {
  gatherCommand(interaction, 'ranged')
}