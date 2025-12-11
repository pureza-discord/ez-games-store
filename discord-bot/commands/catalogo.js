const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js')
const config = require('../config')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('catalogo')
    .setDescription('📚 Explore nosso catálogo completo de jogos premium')
    .addStringOption(option =>
      option.setName('categoria')
        .setDescription('Filtrar por categoria')
        .setRequired(false)
        .addChoices(
          { name: '📦 Pacotes', value: 'pacotes' },
          { name: '🎯 Populares', value: 'populares' },
          { name: '🎮 Ação', value: 'acao' },
          { name: '🧙 RPG', value: 'rpg' },
          { name: '👻 Terror', value: 'terror' },
          { name: '🎨 Indie', value: 'indie' }
        )
    ),
  
  async execute(interaction) {
    await interaction.deferReply()

    const categoria = interaction.options.getString('categoria')
    
    // Determinar quais embeds mostrar baseado na categoria
    let embedsToShow = []
    let titleSuffix = ''
    
    if (categoria === 'pacotes') {
      titleSuffix = ' - PACOTES'
    } else if (categoria === 'populares') {
      titleSuffix = ' - MAIS POPULARES'
    } else if (categoria) {
      titleSuffix = ` - ${categoria.toUpperCase()}`
    }

    // Embed principal - Hero
    const mainEmbed = new EmbedBuilder()
      .setColor('#6366f1')
      .setAuthor({ 
        name: 'Ez Games Store',
        iconURL: 'https://cdn.discordapp.com/icons/your-server-id/icon.png'
      })
      .setTitle(`🎮 CATÁLOGO PREMIUM DE JOGOS${titleSuffix}`)
      .setDescription('╔═══════════════════════════════╗\n║  **Mais de 100 jogos disponíveis!**  ║\n╚═══════════════════════════════╝\n\n🌟 *Qualidade garantida | Entrega imediata | Suporte 24/7*')
      .setImage('https://via.placeholder.com/800x200/6366f1/ffffff?text=Ez+Games+Store')
      .setThumbnail('https://via.placeholder.com/150/10b981/ffffff?text=EZ')
    
    // Adicionar embeds baseado na categoria selecionada
    embedsToShow.push(mainEmbed)

    // Embed de Pacotes
    const pacotesEmbed = new EmbedBuilder()
      .setColor('#8b5cf6')
      .setTitle('📦 PACOTES PREMIUM')
      .setDescription('*Economize comprando pacotes completos!*')
      .addFields(
        {
          name: '⚔️ SoulsLike Complete',
          value: '```yaml\nPreço: R$ 60,00\nJogos: Dark Souls I, II, III, Elden Ring, Sekiro\n⭐ Pacote Mais Vendido```',
          inline: true
        },
        {
          name: '🧟 Resident Evil Complete',
          value: '```yaml\nPreço: R$ 30,00\nJogos: RE 0-8, Remakes\n🔥 Promoção```',
          inline: true
        },
        {
          name: '🚗 GTA Collection',
          value: '```yaml\nPreço: R$ 30,00\nJogos: GTA III, VC, SA, IV, V\n✨ Popular```',
          inline: true
        },
        {
          name: '🐺 The Witcher Complete',
          value: '```yaml\nPreço: R$ 30,00\nJogos: Witcher 1, 2, 3\n🎭 História Épica```',
          inline: true
        },
        {
          name: '⚡ God of War Saga',
          value: '```yaml\nPreço: R$ 30,00\nJogos: GOW 1-3, 2018, Ragnarök\n🏆 Aclamado```',
          inline: true
        },
        {
          name: '🎨 Mega Pack Indie',
          value: '```yaml\nPreço: R$ 50,00\nJogos: 9 indies premiados\n💎 Exclusivo```',
          inline: true
        }
      )
      .setFooter({ text: '💡 Dica: Pacotes são mais econômicos que jogos individuais!' })

    // Embed de Destaques
    const destaquesEmbed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('🌟 DESTAQUES DO MÊS')
      .setDescription('*Os jogos mais vendidos e recomendados*')
      .addFields(
        {
          name: '🏆 Top 1 - Elden Ring',
          value: '```ansi\n[1;36mPreço: R$ 15,00[0m\n[1;32m✓ Mais vendido do mês[0m\n[1;33m⭐⭐⭐⭐⭐ 5/5[0m```',
          inline: false
        },
        {
          name: '🥈 Top 2 - God of War 2018',
          value: '```ansi\n[1;36mPreço: R$ 15,00[0m\n[1;32m✓ Melhor história[0m\n[1;33m⭐⭐⭐⭐⭐ 5/5[0m```',
          inline: false
        },
        {
          name: '🥉 Top 3 - Spider-Man Remastered',
          value: '```ansi\n[1;36mPreço: R$ 12,00[0m\n[1;32m✓ Melhor ação[0m\n[1;33m⭐⭐⭐⭐☆ 4.5/5[0m```',
          inline: false
        }
      )

    // Embed de Categorias
    const categoriasEmbed = new EmbedBuilder()
      .setColor('#f59e0b')
      .setTitle('🗂️ NAVEGUE POR CATEGORIAS')
      .setDescription('```\n📂 Todas as Categorias Disponíveis\n══════════════════════════════```')
      .addFields(
        { name: '🎮 Ação', value: '`45+ jogos`', inline: true },
        { name: '🧙 RPG', value: '`30+ jogos`', inline: true },
        { name: '👻 Terror', value: '`20+ jogos`', inline: true },
        { name: '🏎️ Corrida', value: '`15+ jogos`', inline: true },
        { name: '🎨 Indie', value: '`25+ jogos`', inline: true },
        { name: '⚔️ Aventura', value: '`35+ jogos`', inline: true }
      )

    // Embed de Informações
    const infoEmbed = new EmbedBuilder()
      .setColor('#ec4899')
      .setTitle('💎 VANTAGENS EXCLUSIVAS')
      .setDescription('**Por que comprar na Ez Games?**')
      .addFields(
        {
          name: '⚡ Entrega Instantânea',
          value: '> Receba seus jogos imediatamente após pagamento aprovado',
          inline: false
        },
        {
          name: '🔒 100% Seguro',
          value: '> Pagamentos via Mercado Pago com criptografia',
          inline: false
        },
        {
          name: '🎁 Cupons de Desconto',
          value: '> Use `PRIMEIRACOMPRA` e ganhe **15% OFF**',
          inline: false
        },
        {
          name: '💬 Suporte 24/7',
          value: '> Equipe sempre disponível para ajudar',
          inline: false
        }
      )
      .setFooter({ 
        text: '🎮 Ez Games © 2025 | Todos os direitos reservados',
        iconURL: 'https://via.placeholder.com/32/6366f1/ffffff?text=EZ'
      })
      .setTimestamp()

    // Botões de Ação
    const row1 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('catalog_packs')
          .setLabel('📦 Ver Todos os Pacotes')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('📦'),
        new ButtonBuilder()
          .setCustomId('catalog_popular')
          .setLabel('⭐ Mais Populares')
          .setStyle(ButtonStyle.Success)
          .setEmoji('⭐'),
        new ButtonBuilder()
          .setLabel('🛒 Acessar Loja')
          .setStyle(ButtonStyle.Link)
          .setURL(config.siteUrl)
          .setEmoji('🛒')
      )

    const row2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('catalog_promo')
          .setLabel('🔥 Promoções')
          .setStyle(ButtonStyle.Danger)
          .setEmoji('🔥'),
        new ButtonBuilder()
          .setCustomId('ticket_create')
          .setLabel('💬 Abrir Ticket')
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('💬'),
        new ButtonBuilder()
          .setCustomId('catalog_info')
          .setLabel('ℹ️ Mais Informações')
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('ℹ️')
      )

    // Select Menu de Categorias
    const selectMenu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('catalog_category')
          .setPlaceholder('🔍 Filtrar por Categoria')
          .addOptions([
            {
              label: 'Todos os Jogos',
              description: 'Ver catálogo completo',
              value: 'all',
              emoji: '🎮'
            },
            {
              label: 'Pacotes',
              description: 'Pacotes completos com desconto',
              value: 'packs',
              emoji: '📦'
            },
            {
              label: 'Ação',
              description: 'Jogos de ação e aventura',
              value: 'action',
              emoji: '⚔️'
            },
            {
              label: 'RPG',
              description: 'Role-playing games',
              value: 'rpg',
              emoji: '🧙'
            },
            {
              label: 'Terror',
              description: 'Jogos de terror e suspense',
              value: 'horror',
              emoji: '👻'
            },
            {
              label: 'Indie',
              description: 'Jogos independentes premiados',
              value: 'indie',
              emoji: '🎨'
            }
          ])
      )

    // Filtrar embeds baseado na categoria
    if (!categoria || categoria === 'pacotes') {
      embedsToShow.push(pacotesEmbed)
    }
    
    if (!categoria || categoria === 'populares') {
      embedsToShow.push(destaquesEmbed)
    }
    
    if (!categoria) {
      embedsToShow.push(categoriasEmbed)
    }
    
    // Sempre mostrar embed de info
    embedsToShow.push(infoEmbed)

    await interaction.editReply({
      embeds: embedsToShow,
      components: [selectMenu, row1, row2]
    })
  }
}

