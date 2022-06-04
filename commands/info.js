const discordJS = require('discord.js')
const package = require('../package.json')
const newEmbed = require('../functions/new-embed.js')

module.exports = (interaction) => {
  const GitHubLink = 'https://github.com/Nandi1205/DiceRPG'

  const embed =
  newEmbed(
    interaction.user,
    ':notepad_spiral: Info',
    'About: *A fun, open-source Discord bot.*\n' +
    `Version: *${package.version}*\n` +
    'Developer: *Nandi1205*\n' +
    `GitHub: *[GitHub](${GitHubLink})*`
  )

  const component =
  new discordJS.MessageActionRow()
  .addComponents(
    new discordJS.MessageButton()
    .setURL(GitHubLink)
    .setLabel('GitHub')
    .setStyle('LINK')
  )

  interaction.reply({
    embeds: [embed],
    components: [component],
    ephemeral: interaction.options.getBoolean('private') ?? false
  })
}