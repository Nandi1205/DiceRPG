const players = require('../players.js')
const embedNames = require('../constants/embed-names.json')
const gatherInfo = require('../constants/gather-info.json')
const gatherLootTables = require('../constants/gather-loot-tables.json')
const error = require('./error.js')
const levelUp = require('./level-up.js')
const newEmbed = require('./new-embed.js')
const newPlayer = require('./new-player.js')
const pluralize = require('./pluralize.js')
const randomBetween = require('./random-between.js')
const updateEnergy = require('./update-energy.js')

module.exports = (interaction, tool) => {
  newPlayer(interaction.user.id)
  if (updateEnergy(interaction, interaction.user.id, 1)) {
    return
  }

  const optionsThing = interaction.options.getString('thing')
  const player = players[interaction.user.id]
  const gatherLootTable = gatherLootTables[gatherInfo[optionsThing].tier][player[tool].tier]

  if (gatherLootTable === null) {
    return error(
      interaction,
      `Your tool's tier is not high enough to ${interaction.commandName} this thing.`
    )
  }

  const newXP = Math.floor(randomBetween(gatherLootTable.xp, gatherLootTable.xp * 2))

  players[interaction.user.id].xp += newXP

  let embedText = ''
  let i = 1

  gatherInfo[optionsThing].lootItemNames.forEach((lootItemName) => {
    const newItem = Math.floor(randomBetween(gatherLootTable.items, gatherLootTable.items * 2) * i)

    if (player.inventory[lootItemName] === undefined) {
      players[interaction.user.id].inventory[lootItemName] = 0
    }

    players[interaction.user.id].inventory[lootItemName] += newItem

    embedText += `\n+${newItem} ${pluralize(lootItemName)}`

    i /= 2
  })

  const embed =
  newEmbed(
    interaction.user,
    embedNames[interaction.commandName],
    `You went to ${interaction.commandName} for ${gatherInfo[optionsThing].plural} and got:\n` +
    `*+${newXP} XP${embedText}*`
  )

  const levelUpEmbed = levelUp(interaction.user)

  if (levelUpEmbed === undefined) {
    interaction.reply({
      embeds: [embed],
      ephemeral: interaction.options.getBoolean('private') ?? false
    })
  } else {
    interaction.reply({
      embeds: [embed, levelUpEmbed],
      ephemeral: interaction.options.getBoolean('private') ?? false
    })
  }
}