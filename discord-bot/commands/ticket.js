const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js')
const config = require('../config')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Abre um ticket de suporte')
    .addStringOption(option =>
      option.setName('motivo')
        .setDescription('Motivo do ticket')
        .setRequired(false)
        .addChoices(
          { name: '💰 Compra de Jogo', value: 'compra' },
          { name: '❓ Dúvida', value: 'duvida' },
          { name: '🔧 Problema Técnico', value: 'tecnico' },
          { name: '💳 Pagamento', value: 'pagamento' },
          { name: '📦 Entrega', value: 'entrega' },
          { name: '🎮 Outros', value: 'outros' }
        )
    ),
  
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true })

    const motivo = interaction.options.getString('motivo') || 'outros'
    const motivoText = {
      'compra': '💰 Compra de Jogo',
      'duvida': '❓ Dúvida',
      'tecnico': '🔧 Problema Técnico',
      'pagamento': '💳 Pagamento',
      'entrega': '📦 Entrega',
      'outros': '🎮 Outros'
    }[motivo]

    try {
      const guild = interaction.guild
      const member = interaction.member

      // Verificar se já tem um ticket aberto
      const existingTicket = guild.channels.cache.find(
        channel => channel.name === `ticket-${member.user.username.toLowerCase()}`
      )

      if (existingTicket) {
        return await interaction.editReply({
          content: `❌ Você já tem um ticket aberto: ${existingTicket}`,
          ephemeral: true
        })
      }

      // Criar canal do ticket
      const ticketChannel = await guild.channels.create({
        name: `ticket-${member.user.username}`,
        type: ChannelType.GuildText,
        parent: config.channels.tickets || null,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionFlagsBits.ViewChannel]
          },
          {
            id: member.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory
            ]
          },
          {
            id: config.roles.staff,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory
            ]
          }
        ]
      })

      // Embed do ticket
      const ticketEmbed = new EmbedBuilder()
        .setColor('#7c3aed')
        .setTitle(`🎫 Ticket - ${motivoText}`)
        .setDescription(`Olá ${member}, bem-vindo ao seu ticket de suporte!\n\nUm membro da equipe irá te atender em breve.`)
        .addFields(
          { name: '👤 Usuário', value: `${member.user.tag}`, inline: true },
          { name: '🏷️ Motivo', value: motivoText, inline: true },
          { name: '📅 Criado em', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: false }
        )
        .setFooter({ text: 'Ez Games - Suporte' })
        .setTimestamp()

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('ticket_close')
            .setLabel('🔒 Fechar Ticket')
            .setStyle(ButtonStyle.Danger)
        )

      await ticketChannel.send({
        content: `${member} | <@&${config.roles.staff}>`,
        embeds: [ticketEmbed],
        components: [row]
      })

      await interaction.editReply({
        content: `✅ Ticket criado com sucesso! ${ticketChannel}`,
        ephemeral: true
      })
    } catch (error) {
      console.error('Erro ao criar ticket:', error)
      await interaction.editReply({
        content: '❌ Erro ao criar ticket. Entre em contato com um administrador.',
        ephemeral: true
      })
    }
  }
}

