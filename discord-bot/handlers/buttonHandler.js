const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../config')

module.exports = {
  async handleButton(interaction) {
    const customId = interaction.customId

    // Handlers específicos para TODOS os botões customizados
    const handlers = {
      'ticket_create': () => this.showTicketPrompt(interaction),
      'payment_info': () => this.showPaymentInfo(interaction),
      'payment_pix': () => this.showPixInfo(interaction),
      'payment_card': () => this.showCardInfo(interaction),
      'show_tutorial': () => this.showTutorial(interaction),
      'show_catalog': () => this.showCatalog(interaction),
      'show_coupons': () => this.showCoupons(interaction),
      'support_info': () => this.showSupport(interaction),
      'faq_show': () => this.showFAQ(interaction),
      'catalog_packs': () => this.showPacks(interaction),
      'catalog_popular': () => this.showPopular(interaction),
      'catalog_promo': () => this.showPromo(interaction),
      'catalog_info': () => this.showCatalogInfo(interaction),
      'show_tutorials': () => this.showTutorial(interaction),
      'live_chat': () => this.showLiveChat(interaction),
      'catalog_category': () => this.handleCategorySelect(interaction),
      'support_category': () => this.handleSupportCategory(interaction),
    }

    const handler = handlers[customId]
    if (handler) {
      await handler()
    } else {
      console.log(`⚠️ Handler não encontrado para: ${customId}`)
      await interaction.reply({ 
        content: '⚠️ Esta função ainda está em desenvolvimento!', 
        ephemeral: true 
      })
    }
  },

  async showTicketPrompt(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#7c3aed')
      .setTitle('🎫 Criar Ticket de Suporte')
      .setDescription('Para abrir um ticket, use o comando:\n\n`/ticket motivo:compra`\n\n**Motivos disponíveis:**\n• `compra` - Comprar jogo\n• `duvida` - Dúvidas gerais\n• `tecnico` - Problema técnico\n• `pagamento` - Questões de pagamento\n• `entrega` - Problemas com entrega\n• `outros` - Outros assuntos')

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },

  async showPaymentInfo(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('💳 Formas de Pagamento')
      .setDescription('```\n💚 PIX         - Instantâneo\n💳 Cartão      - 2-5 minutos\n🔒 Segurança   - Mercado Pago\n```\n\nUse `/pagamento` para mais detalhes!')

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },

  async showPixInfo(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#00D86E')
      .setTitle('💚 Pagamento via PIX')
      .setDescription('**Vantagens do PIX:**\n\n✅ Aprovação instantânea\n✅ Disponível 24/7\n✅ Sem taxas\n✅ QR Code automático\n\n**Como pagar:**\n1. Escolha PIX no checkout\n2. Escaneie o QR Code\n3. Confirme o pagamento\n4. Pronto! Receba imediatamente')

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('🛒 Ir para Loja')
          .setStyle(ButtonStyle.Link)
          .setURL(config.siteUrl)
      )

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
  },

  async showCardInfo(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#6366f1')
      .setTitle('💳 Pagamento com Cartão')
      .setDescription('**Cartões Aceitos:**\n\n🔵 Visa\n🟠 Mastercard\n🟡 Elo\n🔷 American Express\n\n**Segurança:**\n✅ Tokenização PCI-DSS\n✅ Dados não salvos\n✅ Criptografia SSL')

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },

  async showTutorial(interaction) {
    await interaction.reply({ 
      content: 'Use o comando `/como-comprar` para ver o tutorial completo!', 
      ephemeral: true 
    })
  },

  async showCatalog(interaction) {
    await interaction.reply({ 
      content: 'Use o comando `/catalogo` para ver todos os jogos!', 
      ephemeral: true 
    })
  },

  async showCoupons(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#ec4899')
      .setTitle('🎁 CUPONS DE DESCONTO DISPONÍVEIS')
      .setDescription('```\nCódigo            Desconto        Mínimo\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nPRIMEIRACOMPRA    15% OFF         R$ 30\nBLACKFRIDAY       20% OFF         R$ 50\nDESCONTO10        R$ 10 OFF       R$ 40\nVIP20             25% OFF         R$ 100\nBEMVINDO          R$ 5 OFF        R$ 20\n```\n\n**Como usar:**\n1. Adicione jogos ao carrinho\n2. Vá para checkout\n3. Digite o cupom\n4. Desconto aplicado!')

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },

  async showSupport(interaction) {
    await interaction.reply({ 
      content: 'Use o comando `/suporte` para ver a central de ajuda completa!', 
      ephemeral: true 
    })
  },

  async showFAQ(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#3b82f6')
      .setTitle('❓ FAQ - Perguntas Frequentes')
      .addFields(
        { name: 'Quanto tempo demora?', value: 'PIX: Instantâneo | Cartão: 2-5 min', inline: false },
        { name: 'É seguro?', value: 'Sim! Mercado Pago + SSL', inline: false },
        { name: 'Posso reembolso?', value: 'Sim, até 7 dias', inline: false },
        { name: 'Como recebo?', value: 'Automaticamente após pagamento', inline: false }
      )

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },

  async showPacks(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#8b5cf6')
      .setTitle('📦 PACOTES DISPONÍVEIS')
      .setDescription('**Economize comprando pacotes!**\n\n🎮 SoulsLike - R$ 60\n🧟 Resident Evil - R$ 30\n🚗 GTA Collection - R$ 30\n🐺 The Witcher - R$ 30\n⚡ God of War - R$ 30\n🎨 Mega Pack Indie - R$ 50')

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },

  async showPopular(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('⭐ JOGOS MAIS POPULARES')
      .setDescription('**Top 5 Mais Vendidos:**\n\n🥇 Elden Ring - R$ 15\n🥈 God of War 2018 - R$ 15\n🥉 Spider-Man - R$ 12\n4️⃣ GTA V - R$ 12\n5️⃣ The Witcher 3 - R$ 12')

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },

  async showPromo(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#ef4444')
      .setTitle('🔥 PROMOÇÕES ATIVAS')
      .setDescription('**Use cupons para economizar!**\n\n🎁 PRIMEIRACOMPRA - 15% OFF\n🔥 BLACKFRIDAY - 20% OFF\n💰 DESCONTO10 - R$ 10 OFF\n\nVálidos para todos os produtos!')

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },

  async showCatalogInfo(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#6366f1')
      .setTitle('ℹ️ INFORMAÇÕES DO CATÁLOGO')
      .setDescription('```\nTotal de Jogos:      100+\nPacotes:             30+\nJogos Individuais:   70+\nCategorias:          10\n```\n\n**Destaques:**\n✓ Lançamentos recentes\n✓ Clássicos atemporais\n✓ Indies premiados\n✓ AAA com desconto')

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },

  async showLiveChat(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('💬 Chat ao Vivo')
      .setDescription('Para falar com nossa equipe em tempo real, abra um ticket usando:\n\n`/ticket motivo:duvida`\n\nUm membro da equipe responderá em minutos!')

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },

  async handleCategorySelect(interaction) {
    const category = interaction.values[0]
    
    const embed = new EmbedBuilder()
      .setColor('#7c3aed')
      .setTitle(`📂 Categoria: ${category.toUpperCase()}`)
      .setDescription(`Filtrando jogos por **${category}**...\n\nPara ver o catálogo completo filtrado, visite nosso site!`)

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('🛒 Ver no Site')
          .setStyle(ButtonStyle.Link)
          .setURL(config.siteUrl)
      )

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
  },

  async handleSupportCategory(interaction) {
    const category = interaction.values[0]
    
    const categoryInfo = {
      'purchase': { title: 'Dúvidas sobre Compra', emoji: '💳' },
      'technical': { title: 'Problemas Técnicos', emoji: '🔧' },
      'delivery': { title: 'Entrega de Jogos', emoji: '📦' },
      'refund': { title: 'Reembolso/Troca', emoji: '🔄' },
      'other': { title: 'Outros Assuntos', emoji: '📝' }
    }

    const info = categoryInfo[category] || categoryInfo['other']

    const embed = new EmbedBuilder()
      .setColor('#f59e0b')
      .setTitle(`${info.emoji} ${info.title}`)
      .setDescription(`Para obter ajuda sobre **${info.title}**, abra um ticket:\n\n\`/ticket motivo:${category}\`\n\nNossa equipe te atenderá em minutos!`)

    await interaction.reply({ embeds: [embed], ephemeral: true })
  }
}

