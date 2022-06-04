const discordJS = require('discord.js')
const players = require('../players.js')
const error = require('../functions/error.js')
const newEmbed = require('../functions/new-embed.js')
const newPlayer = require('../functions/new-player.js')
const pluralize = require('../functions/pluralize.js')

module.exports = (interaction) => {
  const optionsUser = interaction.options.getUser('user') ?? interaction.user

  if (optionsUser.bot) {
    return error(interaction, "Can't check the inventory of a bot.")
  }

  newPlayer(optionsUser.id)

  const player = players[optionsUser.id]

  const playerInventorySorted =
  Object.entries(player.inventory).sort((a, b) => {
    return b[1] - a[1]
  })

  let itemNumber = 0

  const inventoryPages = []

  for (let i = 0;; i ++) {
    if (!playerInventorySorted[i]) {
      break
    }

    const itemName = playerInventorySorted[i][0]
    const itemAmount = playerInventorySorted[i][1]

    const page = Math.floor(itemNumber / 10)

    if (!inventoryPages[page]) {
      inventoryPages[page] = []
    }

    inventoryPages[page].push(`${pluralize(itemName, itemAmount)}: *${itemAmount}*`)

    itemNumber ++
  }

  console.log(inventoryPages)

  const pages = inventoryPages.length

  if (pages === 0) {
    return error(interaction, 'The inventory for this player is empty.')
  }

  const embedName = ':package: Inventory'

  const embed =
  newEmbed(
    optionsUser,
    pages === 1 ? embedName : embedName + ' 1/' + pages,
    inventoryPages[0].join('\n')
  )

  const optionsPrivate = interaction.options.getBoolean('private') ?? false

  if (pages === 1) {
    return interaction.reply({
      embeds: [embed],
      ephemeral: optionsPrivate
    })
  }

  const previousPageButton =
  new discordJS.MessageButton()
  .setCustomId('previousPage')
  .setLabel('<<')
  .setStyle('SECONDARY')
  .setDisabled(true)

  const nextPageButton =
  new discordJS.MessageButton()
  .setCustomId('nextPage')
  .setLabel('>>')
  .setStyle('SECONDARY')

  const component =
  new discordJS.MessageActionRow()
  .addComponents(previousPageButton, nextPageButton)

  interaction.reply({
    embeds: [embed],
    components: [component],
    ephemeral: optionsPrivate
  })

  const filter = (i) => {
    return (i.customId === 'previousPage' || 'nextPage') && i.user.id === interaction.user.id
  }

  const collector = interaction.channel.createMessageComponentCollector({
    filter,
    time: 60000
  })

  let page = 1
  let updatedEmbed = embed

  collector.on('collect', (i) => {
    if (i.customId === 'previousPage') {
      page --
    } else if (i.customId === 'nextPage') {
      page ++
    }

    previousPageButton.setDisabled(false)
    nextPageButton.setDisabled(false)

    if (page === 1) {
      previousPageButton.setDisabled(true)
    }
    if (page === pages) {
      nextPageButton.setDisabled(true)
    }

    updatedEmbed = new discordJS.MessageEmbed()
    .setColor('#ff9966')
    .setTitle(embedName + ` ${page}/${pages}`)
    .setDescription(inventoryPages[page - 1].join('\n'))
    .setThumbnail(optionsUser.displayAvatarURL())

    i.update({
      embeds: [updatedEmbed],
      components: [component],
      private: optionsPrivate
    })
  })
  collector.on('end', () => {
    previousPageButton.setDisabled(true)
    nextPageButton.setDisabled(true)

    interaction.editReply({
      embeds: [updatedEmbed ?? embed],
      components: [component],
      private: optionsPrivate
    })
  })
}