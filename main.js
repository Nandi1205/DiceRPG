//Require external modules, -constants, and -functions.
const fs = require('fs')
const discordJS = require('discord.js')
const commands = require('./constants/commands.json')
const {token, testGuildId} = require('./config.json')

const client = new discordJS.Client({intents: [discordJS.Intents.FLAGS.GUILDS]})
const commandFunctions = {}

client.once('ready', () => {
  const clientCommands = client.guilds.cache.get(testGuildId).commands
  //const clientCommands = client.application.commands
  const commandFiles = fs.readdirSync('./commands')

  commandFiles.forEach((commandFileName) => {
    const commandName = commandFileName.replace('.js', '')

    commandFunctions[commandName] = require('./commands/' + commandFileName)

    clientCommands.create(commands[commandName])
  })

  console.log('Client is ready.')
})
client.on('interactionCreate', (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  commandFunctions[interaction.commandName](interaction)
})

client.login(token)