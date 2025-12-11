const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../config')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('como-comprar')
    .setDescription('📖 Guia completo: aprenda a comprar jogos de forma rápida e segura'),
  
  async execute(interaction) {
    // Embed Principal - Banner
    const bannerEmbed = new EmbedBuilder()
      .setColor('#10b981')
      .setAuthor({ 
        name: 'Ez Games - Tutorial de Compra',
        iconURL: 'https://via.placeholder.com/32/10b981/ffffff?text=?'
      })
      .setTitle('📚 COMO COMPRAR NA EZ GAMES')
      .setDescription('```ansi\n[1;32m╔════════════════════════════════════════╗[0m\n[1;37m║  Processo Simples, Rápido e Seguro!  ║[0m\n[1;32m╚════════════════════════════════════════╝[0m```\n\n**🎯 Tempo médio de compra: 5-10 minutos**\n**✅ Taxa de satisfação: 98.5%**\n**🚀 Mais de 1.000 clientes atendidos**')
      .setThumbnail('https://via.placeholder.com/150/10b981/ffffff?text=EZ')
      .setImage('https://via.placeholder.com/800x150/10b981/ffffff?text=Compre+com+Seguranca')

    // Embed Passo 1
    const passo1Embed = new EmbedBuilder()
      .setColor('#6366f1')
      .setTitle('**PASSO 1** 🎮 Escolha seu Jogo')
      .setDescription('```yaml\nTempo estimado: 2-3 minutos```')
      .addFields(
        {
          name: '📍 Onde Encontrar',
          value: '• Use o comando `/catalogo` aqui no Discord\n• Visite nosso site: [ezgames.com](https://ezgames.com)\n• Navegue pelas categorias: Ação, RPG, Terror, Indie...',
          inline: false
        },
        {
          name: '💡 Dicas',
          value: '> ✓ Veja pacotes para economizar\n> ✓ Confira os mais vendidos\n> ✓ Leia as descrições completas',
          inline: false
        },
        {
          name: '🏷️ Preços',
          value: '```\nJogos Individuais: R$ 8,00 - R$ 15,00\nPacotes:          R$ 30,00 - R$ 60,00\n```',
          inline: false
        }
      )
      .setFooter({ text: 'Passo 1 de 4' })

    // Embed Passo 2  
    const passo2Embed = new EmbedBuilder()
      .setColor('#8b5cf6')
      .setTitle('**PASSO 2** 🎫 Abra um Ticket')
      .setDescription('```yaml\nTempo estimado: 1 minuto```')
      .addFields(
        {
          name: '📝 Como Abrir',
          value: '**Opção 1:** Clique no botão `🎫 Abrir Ticket` abaixo\n**Opção 2:** Use o comando `/ticket motivo:compra`\n**Opção 3:** Acesse nosso site e faça o pedido direto',
          inline: false
        },
        {
          name: '⚙️ O que Acontece',
          value: '```diff\n+ Canal privado criado automaticamente\n+ Apenas você e nossa equipe têm acesso\n+ Receba atendimento personalizado\n+ Histórico de mensagens salvo\n```',
          inline: false
        },
        {
          name: '⏰ Tempo de Resposta',
          value: '> **Durante o horário comercial:** Imediato\n> **Fora do horário:** Até 2 horas\n> **Finais de semana:** Até 4 horas',
          inline: false
        }
      )
      .setFooter({ text: 'Passo 2 de 4' })

    // Embed Passo 3
    const passo3Embed = new EmbedBuilder()
      .setColor('#f59e0b')
      .setTitle('**PASSO 3** 💳 Realize o Pagamento')
      .setDescription('```yaml\nTempo estimado: 2-5 minutos```')
      .addFields(
        {
          name: '💚 PIX (Recomendado)',
          value: '```ansi\n[1;32m✓ Aprovação INSTANTÂNEA[0m\n[1;36m✓ QR Code gerado automaticamente[0m\n[1;33m✓ Sem taxas extras[0m\n[1;35m✓ Disponível 24/7[0m\n```',
          inline: true
        },
        {
          name: '💳 Cartão de Crédito',
          value: '```ansi\n[1;32m✓ Processamento seguro[0m\n[1;36m✓ Tokenização de dados[0m\n[1;33m✓ Aprovação em 2-5 min[0m\n[1;35m✓ Crédito ou Débito[0m\n```',
          inline: true
        },
        {
          name: '🎟️ Cupons de Desconto',
          value: '**Aplique no checkout:**\n`PRIMEIRACOMPRA` → **15% OFF**\n`BLACKFRIDAY` → **20% OFF**\n`DESCONTO10` → **R$ 10 OFF**\n`VIP20` → **25% OFF**\n`BEMVINDO` → **R$ 5 OFF**',
          inline: false
        },
        {
          name: '🔒 Segurança',
          value: '> Pagamentos via **Mercado Pago**\n> Criptografia SSL de ponta a ponta\n> Sistema anti-fraude ativo\n> Seus dados nunca são armazenados',
          inline: false
        }
      )
      .setFooter({ text: 'Passo 3 de 4' })

    // Embed Passo 4
    const passo4Embed = new EmbedBuilder()
      .setColor('#ec4899')
      .setTitle('**PASSO 4** 🎁 Receba seus Jogos')
      .setDescription('```yaml\nTempo estimado: Instantâneo após pagamento```')
      .addFields(
        {
          name: '📥 O que Você Recebe',
          value: '```yaml\n1. Links de Download Diretos\n2. Chaves de Ativação (quando aplicável)\n3. Tutorial de Instalação Completo\n4. Suporte Técnico Vitalício\n5. Atualizações Gratuitas\n```',
          inline: false
        },
        {
          name: '✨ Bônus Exclusivos',
          value: '> 🎖️ Role **@Cliente** no servidor\n> 🎁 Acesso a promoções exclusivas\n> 💬 Suporte prioritário\n> 🎮 Comunidade de jogadores',
          inline: false
        },
        {
          name: '📞 Suporte Pós-Compra',
          value: '**Problemas com instalação?**\n• Abra um novo ticket\n• Resposta em minutos\n• Assistência remota disponível\n• Garantia de funcionamento',
          inline: false
        }
      )
      .setFooter({ text: 'Passo 4 de 4 - Processo Completo!' })

    // Embed FAQ
    const faqEmbed = new EmbedBuilder()
      .setColor('#3b82f6')
      .setTitle('❓ PERGUNTAS FREQUENTES')
      .addFields(
        {
          name: '⏱️ Quanto tempo demora?',
          value: '```\nPIX:    Instantâneo (até 5 minutos)\nCartão: 2-5 minutos após aprovação\n```',
          inline: false
        },
        {
          name: '🔄 Posso trocar/devolver?',
          value: '> Sim! Aceitamos trocas em até 7 dias\n> Reembolso disponível em casos específicos\n> Entre em contato via ticket',
          inline: false
        },
        {
          name: '🎮 Os jogos funcionam offline?',
          value: '> Maioria funciona offline\n> Alguns requerem conexão (indicado no catálogo)\n> Todos testados e funcionais',
          inline: false
        },
        {
          name: '💰 Posso parcelar?',
          value: '> Parcelamento via cartão (em breve)\n> Atualmente apenas à vista\n> Use cupons para economizar!',
          inline: false
        }
      )
      .setFooter({ 
        text: '💡 Mais dúvidas? Use /suporte',
        iconURL: 'https://via.placeholder.com/32/3b82f6/ffffff?text=?'
      })

    // Embed Final - CTA
    const ctaEmbed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('🚀 PRONTO PARA COMEÇAR?')
      .setDescription('```diff\n+ Milhares de clientes satisfeitos\n+ Entrega 100% garantida\n+ Suporte em português\n+ Pagamento 100% seguro\n```\n\n**👇 Clique nos botões abaixo para começar!**')
      .setImage('https://via.placeholder.com/800x100/10b981/ffffff?text=Compre+Agora+-+Entrega+Imediata')
      .setFooter({ 
        text: 'Ez Games © 2025 | Compre com Confiança',
        iconURL: 'https://via.placeholder.com/32/10b981/ffffff?text=EZ'
      })
      .setTimestamp()

    // Botões Principais
    const row1 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('🎫 Abrir Ticket Agora')
          .setStyle(ButtonStyle.Success)
          .setCustomId('ticket_create')
          .setEmoji('🎫'),
        new ButtonBuilder()
          .setLabel('🛒 Ir para a Loja')
          .setStyle(ButtonStyle.Link)
          .setURL(config.siteUrl)
          .setEmoji('🛒'),
        new ButtonBuilder()
          .setLabel('📚 Ver Catálogo')
          .setStyle(ButtonStyle.Primary)
          .setCustomId('show_catalog')
          .setEmoji('📚')
      )

    // Botões Secundários
    const row2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('💳 Formas de Pagamento')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('payment_info')
          .setEmoji('💳'),
        new ButtonBuilder()
          .setLabel('💬 Suporte')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('support_info')
          .setEmoji('💬'),
        new ButtonBuilder()
          .setLabel('🎁 Ver Cupons')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('show_coupons')
          .setEmoji('🎁')
      )

    await interaction.reply({
      embeds: [bannerEmbed, passo1Embed, passo2Embed, passo3Embed, passo4Embed, faqEmbed, ctaEmbed],
      components: [row1, row2]
    })
  }
}

