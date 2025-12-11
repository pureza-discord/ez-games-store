const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../config')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('como-comprar')
    .setDescription('Mostra o tutorial de como comprar jogos'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('💳 Como Comprar Jogos - Passo a Passo')
      .setDescription('Siga os passos abaixo para comprar seus jogos com segurança em nosso servidor:')
      .addFields(
        {
          name: '1️⃣ Escolha o Jogo',
          value: `Veja a lista de jogos disponíveis no canal <#${config.channels.catalog}> ou use \`/catalogo\`. Você também pode acessar nosso site para ver o catálogo completo.`,
          inline: false
        },
        {
          name: '2️⃣ Abra um Ticket',
          value: 'Clique no botão 🎫 abaixo ou use `/ticket` para abrir um ticket. Nossa equipe irá te atender.',
          inline: false
        },
        {
          name: '3️⃣ Pagamento',
          value: 'Nossa equipe irá informar o valor e as formas de pagamento disponíveis:\n• 💚 **PIX** (Aprovação instantânea)\n• 💳 **Cartão** (Crédito/Débito)',
          inline: false
        },
        {
          name: '4️⃣ Entrega do Jogo',
          value: 'Após a confirmação do pagamento, você receberá:\n• 📥 Links de download\n• 🔑 Chaves de ativação (se aplicável)\n• 📖 Instruções de instalação\n• ✅ Role @Cliente no servidor',
          inline: false
        },
        {
          name: '💡 Cupons de Desconto',
          value: '**Cupons disponíveis:**\n`PRIMEIRACOMPRA` - 15% OFF\n`BLACKFRIDAY` - 20% OFF\n`DESCONTO10` - R$ 10 OFF\n`VIP20` - 25% OFF\n`BEMVINDO` - R$ 5 OFF',
          inline: false
        }
      )
      .setFooter({ text: 'Ez Games - Compras Seguras' })
      .setTimestamp()

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('🛒 Acessar Site')
          .setStyle(ButtonStyle.Link)
          .setURL(`${config.siteUrl}`),
        new ButtonBuilder()
          .setLabel('🎫 Abrir Ticket')
          .setStyle(ButtonStyle.Primary)
          .setCustomId('ticket_create'),
        new ButtonBuilder()
          .setLabel('💳 Ver Formas de Pagamento')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('payment_info')
      )

    await interaction.reply({
      embeds: [embed],
      components: [row]
    })
  }
}

