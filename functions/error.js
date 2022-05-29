const embedNames = require('../constants/embed-names.json')
const newEmbed = require('./new-embed.js')

module.exports = (interaction, errorMessage) => {
  const embed =
  newEmbed(
    interaction.user,
    embedNames.error,
    errorMessage
  )

  interaction.reply({
    embeds: [embed],
    ephemeral: true
  })

  return true
}