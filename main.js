/*
Require order:

fs
discordJS
users
[anything-else]
[constants]
[functions]
*/

const fs = require('fs')
const discordJS = require('discord.js')
const commands = require('./constants/commands.json')
const colorLog = require('./functions/color-log.js')
const {token, testGuildId} = require('./config.json')

const client = new discordJS.Client({intents: [discordJS.Intents.FLAGS.GUILDS]})
const commandFunctions = {}

client.once('ready', () => {
  const clientCommands = client.guilds.cache.get(testGuildId).commands
  //const clientCommands = client.application.commands
  const commandFiles = fs.readdirSync('./commands')

  //Working slash command deletion.
  /*clientCommands.fetch().then((cmds) => {
    cmds.find((cmd) => {
      return cmd.name === 'commandname'
    }).delete()
  })*/

  commandFiles.forEach((commandFileName) => {
    const commandName = commandFileName.replace('.js', '')

    commandFunctions[commandName] = require('./commands/' + commandFileName)

    clientCommands.create(commands[commandName])
  })

  colorLog('info', client.user.username + ' is ready.')
  colorLog('detail', `guilds: "${client.guilds.cache.size}"`)
})
client.on('interactionCreate', (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const beforeCommandTime = new Date().getTime()

  colorLog('info', 'Command received...')
  colorLog('detail', `command: "${interaction.commandName}"`)
  colorLog('detail', `user: "${interaction.user.id}"`)

  commandFunctions[interaction.commandName](interaction)

  colorLog('detail', `ping: "${new Date().getTime() - beforeCommandTime}"`)
  colorLog('success', 'Replied to command.')
})

client.login(token)