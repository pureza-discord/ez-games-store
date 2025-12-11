const { EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
  async handleButton(interaction) {
    const [action, type] = interaction.customId.split('_')

    if (action === 'ticket') {
      if (type === 'close') {
        await this.closeTicket(interaction)
      } else if (type === 'create') {
        // Redirecionar para o comando /ticket
        await interaction.reply({
          content: 'Use o comando `/ticket` para abrir um ticket de suporte!',
          ephemeral: true
        })
      }
    } else if (interaction.customId === 'payment_info') {
      await this.showPaymentInfo(interaction)
    } else if (interaction.customId === 'faq_show') {
      await this.showFAQ(interaction)
    }
  },

  async closeTicket(interaction) {
    const channel = interaction.channel

    if (!channel.name.startsWith('ticket-')) {
      return await interaction.reply({
        content: '❌ Este comando só pode ser usado em canais de ticket!',
        ephemeral: true
      })
    }

    const embed = new EmbedBuilder()
      .setColor('#ef4444')
      .setTitle('🔒 Fechando Ticket')
      .setDescription('Este ticket será fechado em 5 segundos...')
      .setFooter({ text: 'Ez Games - Ticket System' })
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })

    setTimeout(async () => {
      try {
        await channel.delete()
      } catch (error) {
        console.error('Erro ao deletar canal de ticket:', error)
      }
    }, 5000)
  },

  async showPaymentInfo(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('💳 Informações de Pagamento')
      .setDescription('Aceitamos PIX e Cartão de Crédito/Débito')
      .addFields(
        { name: '💚 PIX', value: 'Aprovação instantânea', inline: true },
        { name: '💳 Cartão', value: 'Processamento seguro', inline: true }
      )

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },

  async showFAQ(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#3b82f6')
      .setTitle('❓ Perguntas Frequentes')
      .addFields(
        { name: 'Como comprar?', value: 'Use `/como-comprar` para ver o tutorial completo', inline: false },
        { name: 'Quanto tempo demora?', value: 'PIX: Instantâneo | Cartão: Até 5 minutos', inline: false },
        { name: 'É seguro?', value: 'Sim! Usamos Mercado Pago para processar pagamentos', inline: false },
        { name: 'Posso reembolso?', value: 'Entre em contato via ticket dentro de 7 dias', inline: false }
      )

    await interaction.reply({ embeds: [embed], ephemeral: true })
  }
}

