const discordJS = require('discord.js')

module.exports = (user, title, description, fields) => {
  const embed =
  new discordJS.MessageEmbed()
  .setColor('#ff9966')
  .setTitle(title)
  .setDescription(description)
  .setThumbnail(user.displayAvatarURL())

  if (fields) {
    embed.addFields(fields)
  }

  return embed
}