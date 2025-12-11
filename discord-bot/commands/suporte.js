const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suporte')
    .setDescription('Mostra informações de suporte e ajuda'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#f59e0b')
      .setTitle('🆘 Central de Suporte - Ez Games')
      .setDescription('Precisa de ajuda? Estamos aqui para você!')
      .addFields(
        {
          name: '🎫 Abrir Ticket',
          value: 'Use o comando `/ticket` para abrir um ticket de suporte. Nossa equipe responderá em breve.',
          inline: false
        },
        {
          name: '❓ Perguntas Frequentes',
          value: '**Como comprar?** Use `/como-comprar`\n**Formas de pagamento?** Use `/pagamento`\n**Ver catálogo?** Use `/catalogo`',
          inline: false
        },
        {
          name: '📞 Horário de Atendimento',
          value: '🕐 Segunda a Sexta: 9h às 22h\n🕐 Sábado: 10h às 20h\n🕐 Domingo: 10h às 18h\n\n*Respostas automáticas 24/7*',
          inline: false
        },
        {
          name: '⚡ Problemas Comuns',
          value: '• **Download lento?** Verifique sua conexão\n• **Erro na instalação?** Veja o tutorial que enviamos\n• **Jogo não inicia?** Verifique os requisitos mínimos\n• **Pagamento pendente?** Aguarde até 5 minutos para PIX',
          inline: false
        },
        {
          name: '📧 Outros Contatos',
          value: '• Discord: Abra um ticket aqui\n• Email: suporte@ezgames.com (em breve)\n• WhatsApp: Em breve',
          inline: false
        }
      )
      .setFooter({ text: 'Ez Games - Estamos aqui para ajudar!' })
      .setTimestamp()

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('🎫 Abrir Ticket')
          .setStyle(ButtonStyle.Primary)
          .setCustomId('ticket_create'),
        new ButtonBuilder()
          .setLabel('💬 FAQ')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('faq_show')
      )

    await interaction.reply({
      embeds: [embed],
      components: [row]
    })
  }
}

