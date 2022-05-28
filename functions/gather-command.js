const users = require('../users.js')
const embedNames = require('../constants/embed-names.json')
const gatherInfo = require('../constants/gather-info.json')
const gatherLootTables = require('../constants/gather-loot-tables.json')
const error = require('./error.js')
const newEmbed = require('./new-embed.js')
const newUser = require('./new-user.js')
const pluralize = require('./pluralize.js')
const randomBetween = require('./random-between.js')
const updateEnergy = require('./update-energy.js')

module.exports = (interaction, tool) => {
  newUser(interaction.user.id)
  if (updateEnergy(interaction, interaction.user.id, 1)) {
    return
  }

  const optionThing = interaction.options.getString('thing')
  const user = users[interaction.user.id]
  const gatherLootTable = gatherLootTables[gatherInfo[optionThing].tier][user[tool].tier]

  if (gatherLootTable === null) {
    return error(
      interaction,
      `Your tool's tier is not high enough to ${interaction.commandName} this thing.`
    )
  }

  const newXP = Math.floor(randomBetween(gatherLootTable.xp, gatherLootTable.xp * 2))

  users[interaction.user.id].xp += newXP

  let embedText = ''

  gatherInfo[optionThing].lootItemNames.forEach((lootItemName) => {
    const newItem = Math.floor(randomBetween(gatherLootTable.items, gatherLootTable.items * 2))

    if (user.inventory[lootItemName] === undefined) {
      users[interaction.user.id].inventory[lootItemName] = 0
    }

    users[interaction.user.id].inventory[lootItemName] += newItem

    embedText += `\n+${newItem} ${pluralize(lootItemName)}`
  })

  const embed =
  newEmbed(
    interaction.user,
    embedNames[interaction.commandName],
    `You went to ${interaction.commandName} ${optionThing} and got:\n` +
    `*+${newXP} XP${embedText}*`
  )

  interaction.reply({
    embeds: [embed],
    ephemeral: interaction.options.getBoolean('private') ?? false
  })
}