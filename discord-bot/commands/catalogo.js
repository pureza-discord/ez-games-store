const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../config')
const axios = require('axios')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('catalogo')
    .setDescription('Mostra o catálogo completo de jogos disponíveis'),
  
  async execute(interaction) {
    await interaction.deferReply()

    try {
      // Buscar produtos da API
      const response = await axios.get(`${config.apiUrl}/api/products`)
      const products = response.data || []

      // Separar pacotes e individuais
      const packs = products.filter(p => p.type === 'pack').slice(0, 10)
      const individuals = products.filter(p => p.type === 'individual' && p.popular).slice(0, 10)

      const embed = new EmbedBuilder()
        .setColor('#7c3aed')
        .setTitle('🎮 Catálogo Ez Games - Jogos Premium')
        .setDescription('Confira nossos pacotes e jogos individuais disponíveis!')
        .setThumbnail('https://i.imgur.com/your-logo.png') // Adicione logo se tiver
        .addFields(
          {
            name: '📦 Pacotes Populares',
            value: packs.map(p => 
              `**${p.name}** - R$ ${p.price.toFixed(2).replace('.', ',')}\n${p.description.substring(0, 60)}...`
            ).join('\n\n') || 'Nenhum pacote disponível',
            inline: false
          },
          {
            name: '🎯 Jogos Individuais em Destaque',
            value: individuals.map(p => 
              `**${p.name}** - R$ ${p.price.toFixed(2).replace('.', ',')} - ${p.category}`
            ).join('\n') || 'Nenhum jogo disponível',
            inline: false
          }
        )
        .setFooter({ text: 'Ez Games - Jogos Premium | Clique no botão abaixo para ver o catálogo completo' })
        .setTimestamp()

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('🛒 Ver Catálogo Completo')
            .setStyle(ButtonStyle.Link)
            .setURL(`${config.siteUrl}`),
          new ButtonBuilder()
            .setLabel('💬 Suporte')
            .setStyle(ButtonStyle.Success)
            .setCustomId('ticket_create')
        )

      await interaction.editReply({
        embeds: [embed],
        components: [row]
      })
    } catch (error) {
      console.error('Erro ao buscar catálogo:', error)
      
      // Fallback com informações estáticas
      const embed = new EmbedBuilder()
        .setColor('#7c3aed')
        .setTitle('🎮 Catálogo Ez Games')
        .setDescription('Visite nosso site para ver todos os jogos disponíveis!')
        .addFields(
          { name: '📦 Pacotes', value: 'SoulsLike, GTA, Resident Evil, The Witcher, God of War, Spider-Man e muito mais!', inline: false },
          { name: '💰 Preços', value: 'Pacotes a partir de R$ 30,00\nJogos individuais de R$ 8,00 a R$ 15,00', inline: false }
        )
        .setFooter({ text: 'Ez Games - Jogos Premium' })

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('🛒 Ver Catálogo Completo')
            .setStyle(ButtonStyle.Link)
            .setURL(`${config.siteUrl}`)
        )

      await interaction.editReply({
        embeds: [embed],
        components: [row]
      })
    }
  }
}

