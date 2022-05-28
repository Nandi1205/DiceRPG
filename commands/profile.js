const users = require('../users.js')
const embedNames = require('../constants/embed-names.json')
const error = require('../functions/error.js')
const newEmbed = require('../functions/new-embed.js')
const newUser = require('../functions/new-user.js')
const updateEnergy = require('../functions/update-energy.js')

module.exports = (interaction) => {
  const optionsUser = interaction.options.getMentionable('user') ?? interaction.user

  if (optionsUser.bot === true) {
    return error(interaction, 'Can not check the profile of a bot user.')
  }

  newUser(optionsUser.id)
  updateEnergy(interaction, optionsUser.id, 0)

  const user = users[optionsUser.id]

  const embed =
  newEmbed(
    optionsUser,
    embedNames.profile,
    `XP: *${user.xp}*\n` +
    `Level: *${user.level}*\n` +
    `Coins: *${user.coins}*\n` +
    `Energy: *${user.energy.amount}*\n`
  )

  interaction.reply({
    embeds: [embed],
    ephemeral: interaction.options.getBoolean('private') ?? false
  })
}