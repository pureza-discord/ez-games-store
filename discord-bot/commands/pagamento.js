const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pagamento')
    .setDescription('Mostra as formas de pagamento aceitas'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('💳 Formas de Pagamento')
      .setDescription('Aceitamos as seguintes formas de pagamento:')
      .addFields(
        {
          name: '💚 PIX',
          value: '• ✅ Aprovação **instantânea**\n• ✅ Entrega **imediata** após confirmação\n• ✅ Sem taxas adicionais\n• ✅ QR Code gerado automaticamente',
          inline: false
        },
        {
          name: '💳 Cartão de Crédito/Débito',
          value: '• ✅ Processamento **seguro**\n• ✅ Tokenização de dados\n• ✅ Aprovação rápida\n• ✅ Parcelamento disponível (em breve)',
          inline: false
        },
        {
          name: '🔒 Segurança',
          value: 'Todos os pagamentos são processados através do **Mercado Pago**, garantindo:\n• Criptografia de ponta a ponta\n• Proteção de dados sensíveis\n• Sistema anti-fraude\n• Compra 100% segura',
          inline: false
        },
        {
          name: '📊 Processo de Pagamento',
          value: '1️⃣ Escolha seus jogos no site\n2️⃣ Adicione ao carrinho\n3️⃣ Escolha a forma de pagamento\n4️⃣ Realize o pagamento\n5️⃣ Receba seus jogos automaticamente',
          inline: false
        },
        {
          name: '💡 Cupons de Desconto',
          value: 'Não esqueça de usar nossos cupons!\nUse `/como-comprar` para ver os cupons disponíveis.',
          inline: false
        }
      )
      .setFooter({ text: 'Ez Games - Pagamentos Seguros via Mercado Pago' })
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })
  }
}

