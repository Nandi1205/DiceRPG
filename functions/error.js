const newEmbed = require('./new-embed.js')

module.exports = (interaction, errorMessage) => {
  const embed =
  newEmbed(
    interaction.user,
    ':x: Error',
    errorMessage
  )

  interaction.reply({
    embeds: [embed],
    ephemeral: true
  })

  return true
}