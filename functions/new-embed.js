const discordJS = require('discord.js')

module.exports = (interaction, title, description) => {
  return new discordJS.MessageEmbed()
  .setColor('#ff9966')
  .setTitle(title)
  .setDescription(description)
  .setThumbnail(interaction.user.displayAvatarURL())
}