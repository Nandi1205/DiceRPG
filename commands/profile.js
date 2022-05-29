const players = require('../players.js')
const embedNames = require('../constants/embed-names.json')
const error = require('../functions/error.js')
const newEmbed = require('../functions/new-embed.js')
const newPlayer = require('../functions/new-player.js')
const updateEnergy = require('../functions/update-energy.js')

module.exports = (interaction) => {
  const optionsUser = interaction.options.getMentionable('user') ?? interaction.user

  if (optionsUser.bot === true) {
    return error(interaction, 'Can not check the profile of a bot.')
  }

  newPlayer(optionsUser.id)
  updateEnergy(interaction, optionsUser.id, 0)

  const player = players[optionsUser.id]

  const embed =
  newEmbed(
    optionsUser,
    embedNames.profile,
    `Level: *${player.level}/50*\n` +
    `XP: *${player.xp}*\n` +
    `Energy: *${player.energy.amount}/10*\n` +
    `Coins: *${player.coins}*\n`,
    [
      {name: ':axe: Axe', value: player.axe.name, inline: true},
      {name: ':pick: Pickaxe', value: player.pickaxe.name, inline: true},
      {name: ':fishing_pole_and_fish: Fishing Rod', value: player.fishingRod.name, inline: true},
      {name: ':scissors: Pruner', value: player.pruner.name, inline: true},
      {name: ':bow_and_arrow: Ranged', value: player.ranged.name, inline: true}
    ]
  )

  interaction.reply({
    embeds: [embed],
    ephemeral: interaction.options.getBoolean('private') ?? false
  })
}