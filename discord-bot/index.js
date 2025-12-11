const { Client, GatewayIntentBits, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const fs = require('fs')
const path = require('path')
const config = require('./config')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
})

client.commands = new Collection()

// Carregar comandos
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  }
}

// Carregar eventos
const eventsPath = path.join(__dirname, 'events')
if (fs.existsSync(eventsPath)) {
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))
  
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client))
    } else {
      client.on(event.name, (...args) => event.execute(...args, client))
    }
  }
}

// Evento de login
client.once('ready', () => {
  console.log(`✅ Bot ${client.user.tag} está online!`)
  client.user.setActivity('Ez Games Store', { type: 'WATCHING' })
})

// Lidar com interações
client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName)
    
    if (!command) return
    
    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(`Erro ao executar comando ${interaction.commandName}:`, error)
      const errorMessage = { content: 'Houve um erro ao executar este comando!', ephemeral: true }
      
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage)
      } else {
        await interaction.reply(errorMessage)
      }
    }
  } else if (interaction.isButton()) {
    // Lidar com botões de tickets, etc
    if (interaction.customId.startsWith('ticket_')) {
      const ticketHandler = require('./handlers/ticketHandler')
      await ticketHandler.handleButton(interaction)
    }
  }
})

// Login
client.login(config.token).catch(error => {
  console.error('❌ Erro ao fazer login no Discord:', error)
  process.exit(1)
})

module.exports = client

