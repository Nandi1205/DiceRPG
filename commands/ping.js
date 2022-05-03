//Require external modules, -constants, and -functions.
const discordJS = require('discord.js')

//The function ran when calling "commandFunctions[interaction.commandName](interaction)".
module.exports = (interaction) => {
  const embed = new discordJS.MessageEmbed()
    .setColor('#ff9966')
    .setTitle(':ping_pong: Ping')
    .setDescription('Pong!')
    .setThumbnail(interaction.user.displayAvatarURL())

  interaction.reply({
    embeds: [embed],
    ephemeral: interaction.options.getBoolean('private') ?? false
  })
}