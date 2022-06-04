const players = require('../players.js')
const gatherEmbedInfo = require('../constants/gather-embed-info.json')
const gatherThingInfo = require('../constants/gather-thing-info.json')
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

  const optionsThing = interaction.options.getString('thing')
  const player = players[interaction.user.id]
  const gatherLootTable = gatherLootTables[gatherThingInfo[optionsThing].tier][player[tool].tier]

  if (!gatherLootTable) {
    return error(
      interaction,
      `Your tool's tier is not high enough to ${interaction.commandName} this thing.`
    )
  }

  const optionsMultiplier = interaction.options.getInteger('multiplier') ?? 1

  if (updateEnergy(interaction, interaction.user.id, optionsMultiplier)) {
    return
  }

  let newXP = 0

  for (let i = 0; i < optionsMultiplier; i ++) {
    newXP += Math.floor(randomBetween(gatherLootTable.xp, gatherLootTable.xp * 2))
  }

  players[interaction.user.id].xp += newXP

  let embedNewItems = ''
  let j = 1

  gatherThingInfo[optionsThing].lootItemNames.forEach((lootItemName) => {
    let newItem = 0

    for (let i = 0; i < optionsMultiplier; i ++) {
      newItem += Math.floor(randomBetween(gatherLootTable.items, gatherLootTable.items * 2) * j)
    }

    if (!player.inventory[lootItemName]) {
      players[interaction.user.id].inventory[lootItemName] = 0
    }

    players[interaction.user.id].inventory[lootItemName] += newItem

    embedNewItems += `\n+${newItem} ${pluralize(lootItemName)}`

    j /= 2
  })

  const embedName =
  {
    'chop': ':axe: Chop',
    'mine': ':pick: Mine',
    'fish': ':fishing_pole_and_fish: Fish',
    'forage': ':scissors: Forage',
    'hunt': ':bow_and_arrow: Hunt'
  }[interaction.commandName]

  const embedInfoEnergy = randomBetween(0, 1)

  const embedDescription =
  gatherEmbedInfo.action[randomBetween(0, gatherEmbedInfo.action.length - 1)]
  .replace('COMMAND', interaction.commandName)
  .replace('THING', gatherThingInfo[optionsThing].plural) +
  gatherEmbedInfo.energy[
    embedInfoEnergy
  ][
    randomBetween(0, gatherEmbedInfo.energy[embedInfoEnergy].length - 1)
  ] +
  ` You ${gatherEmbedInfo.got[randomBetween(0, gatherEmbedInfo.got.length - 1)]}:\n` +
  `*+${newXP} XP${embedNewItems}*`

  const embed =
  newEmbed(
    interaction.user,
    optionsMultiplier === 1 ? embedName : `${embedName} x${optionsMultiplier}`,
    embedDescription
  )

  const levelUpEmbed = levelUp(interaction.user)

  interaction.reply({
    embeds: levelUpEmbed ? [embed, levelUpEmbed] : [embed],
    ephemeral: interaction.options.getBoolean('private') ?? false
  })
}