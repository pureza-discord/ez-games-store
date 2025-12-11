const axios = require('axios')

class DiscordNotifier {
  constructor() {
    this.webhookUrl = process.env.DISCORD_WEBHOOK_URL || ''
    this.salesChannelId = process.env.SALES_CHANNEL_ID || ''
  }

  async sendPaymentApproved(orderData) {
    if (!this.webhookUrl) {
      console.log('⚠️ Discord Webhook não configurado')
      return
    }

    const itemsList = orderData.items
      .map(item => `• ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`)
      .join('\n')

    const embed = {
      title: '✅ NOVO PAGAMENTO APROVADO',
      color: 0x10b981, // Verde
      fields: [
        {
          name: '📦 Pedido',
          value: `\`#${orderData.orderId}\``,
          inline: true
        },
        {
          name: '💰 Valor',
          value: `\`R$ ${orderData.amount.toFixed(2)}\``,
          inline: true
        },
        {
          name: '💳 Método',
          value: orderData.paymentMethod === 'pix' ? '💚 PIX' : '💳 Cartão',
          inline: true
        },
        {
          name: '🎮 Itens Comprados',
          value: itemsList || 'Sem itens',
          inline: false
        },
        {
          name: '👤 Cliente',
          value: orderData.customerEmail || 'Não informado',
          inline: false
        },
        {
          name: '⏰ Data/Hora',
          value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
          inline: false
        }
      ],
      footer: {
        text: 'Ez Games - Sistema de Vendas',
        icon_url: 'https://via.placeholder.com/32/10b981/ffffff?text=EZ'
      },
      timestamp: new Date().toISOString()
    }

    try {
      await axios.post(this.webhookUrl, {
        username: 'Ez Games Store',
        avatar_url: 'https://via.placeholder.com/128/7c3aed/ffffff?text=EZ',
        embeds: [embed]
      })

      console.log('✅ Notificação enviada para o Discord')
    } catch (error) {
      console.error('❌ Erro ao enviar notificação Discord:', error.message)
    }
  }

  async sendNewTicket(ticketData) {
    // Implementar se necessário
    console.log('🎫 Novo ticket criado:', ticketData)
  }

  isConfigured() {
    return Boolean(this.webhookUrl)
  }
}

module.exports = new DiscordNotifier()

