const users = require('../users.js')
const embedNames = require('../constants/embed-names.json')
const newEmbed = require('../functions/new-embed.js')
const newUser = require('../functions/new-user.js')

module.exports = (interaction) => {
  const optionsMember = interaction.options.getMentionable('member') ?? interaction.member

  newUser(optionsMember.id)

  const user = users[optionsMember.id]

  const embed =
  newEmbed(
    optionsMember,
    embedNames.profile,
    `XP: *${user.xp}*\n` +
    `Level: *${user.level}*\n` +
    `Coins: *${user.coins}*\n`
  )

  interaction.reply({
    embeds: [embed],
    ephemeral: interaction.options.getBoolean('private') ?? false
  })
}