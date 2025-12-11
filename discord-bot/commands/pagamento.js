const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../config')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pagamento')
    .setDescription('💳 Veja todas as formas de pagamento aceitas e informações de segurança'),
  
  async execute(interaction) {
    // Embed Principal
    const mainEmbed = new EmbedBuilder()
      .setColor('#10b981')
      .setAuthor({ 
        name: 'Sistema de Pagamentos Ez Games',
        iconURL: 'https://via.placeholder.com/32/10b981/ffffff?text=$'
      })
      .setTitle('💳 FORMAS DE PAGAMENTO')
      .setDescription('```ansi\n[1;32m╔═══════════════════════════════════╗[0m\n[1;37m║  Pagamentos Rápidos e Seguros!  ║[0m\n[1;32m╚═══════════════════════════════════╝[0m```\n\n**🏆 Processados via Mercado Pago**\n**🔒 Criptografia SSL 256-bit**\n**✅ Sistema Anti-Fraude Ativo**')
      .setThumbnail('https://via.placeholder.com/150/10b981/ffffff?text=PAY')
      .setImage('https://via.placeholder.com/800x150/10b981/ffffff?text=Pagamento+Seguro')

    // Embed PIX
    const pixEmbed = new EmbedBuilder()
      .setColor('#00D86E')
      .setTitle('💚 PIX - Pagamento Instantâneo')
      .setDescription('**✨ Método Recomendado | Mais Rápido | Mais Popular**')
      .addFields(
        {
          name: '⚡ Vantagens do PIX',
          value: '```yaml\nAprovação:     Instantânea (até 5 minutos)\nDisponibilidade: 24/7 - Todos os dias\nTaxas:         R$ 0,00 - Sem custos extras\nSegurança:     Máxima\nLimite:        Conforme seu banco\n```',
          inline: false
        },
        {
          name: '📱 Como Funciona',
          value: '```diff\n+ 1. Escolha PIX no checkout\n+ 2. QR Code gerado automaticamente\n+ 3. Abra seu app do banco\n+ 4. Escaneie o QR Code ou copie a chave\n+ 5. Confirme o pagamento\n+ 6. Aprovação INSTANTÂNEA!\n```',
          inline: false
        },
        {
          name: '🎯 Aprovação Automática',
          value: '> ✓ Sistema detecta pagamento automaticamente\n> ✓ Não precisa enviar comprovante\n> ✓ Webhook em tempo real\n> ✓ Jogos liberados imediatamente',
          inline: false
        },
        {
          name: '💡 Dica Pro',
          value: '**Para pagamento mais rápido:**\n• Use PIX Copia e Cola (mais rápido que QR)\n• Alguns bancos aprovam em segundos!\n• Mantenha o site aberto durante o pagamento',
          inline: false
        }
      )
      .setFooter({ text: '💚 PIX - Escolha de 85% dos nossos clientes' })

    // Embed Cartão
    const cardEmbed = new EmbedBuilder()
      .setColor('#6366f1')
      .setTitle('💳 Cartão de Crédito/Débito')
      .setDescription('**🔒 Processamento Seguro | Tokenização Avançada**')
      .addFields(
        {
          name: '✨ Vantagens do Cartão',
          value: '```yaml\nAprovação:     2-5 minutos\nTipos:         Crédito e Débito\nBandeiras:     Visa, Master, Elo, Amex\nTokenização:   Dados não são salvos\nParcelamento:  Em breve!\n```',
          inline: false
        },
        {
          name: '🔐 Segurança Máxima',
          value: '```ansi\n[1;32m✓[0m Tokenização PCI-DSS Compliant\n[1;32m✓[0m Seus dados NUNCA são armazenados\n[1;32m✓[0m Criptografia end-to-end\n[1;32m✓[0m 3D Secure 2.0 ativo\n[1;32m✓[0m Verificação anti-fraude\n```',
          inline: false
        },
        {
          name: '🏦 Bandeiras Aceitas',
          value: '**Principais bandeiras:**\n🔵 **Visa** | 🟠 **Mastercard** | 🟡 **Elo**\n🔷 **American Express** | 🟢 **Hipercard**',
          inline: false
        },
        {
          name: '⚠️ Importante',
          value: '> Aprovação depende da operadora do cartão\n> Certifique-se de ter limite disponível\n> Cartões internacionais são aceitos',
          inline: false
        }
      )
      .setFooter({ text: '💳 Processado via Mercado Pago - 100% Seguro' })

    // Embed Comparação
    const compareEmbed = new EmbedBuilder()
      .setColor('#8b5cf6')
      .setTitle('⚖️ COMPARAÇÃO DETALHADA')
      .setDescription('**Qual método escolher?**')
      .addFields(
        {
          name: '⏱️ Velocidade',
          value: '```diff\n+ PIX:    ⭐⭐⭐⭐⭐ Instantâneo\n+ Cartão: ⭐⭐⭐⭐☆ 2-5 minutos\n```',
          inline: true
        },
        {
          name: '💰 Custos',
          value: '```diff\n+ PIX:    R$ 0,00\n+ Cartão: R$ 0,00\n```',
          inline: true
        },
        {
          name: '🔒 Segurança',
          value: '```diff\n+ PIX:    ⭐⭐⭐⭐⭐\n+ Cartão: ⭐⭐⭐⭐⭐\n```',
          inline: true
        }
      )
      .addFields(
        {
          name: '📊 Estatísticas',
          value: '**Métodos mais usados:**\n```\n██████████████████ PIX (85%)\n███████░░░░░░░░░░░ Cartão (15%)\n```\n**Satisfação:** 98.5% ⭐⭐⭐⭐⭐',
          inline: false
        }
      )

    // Embed Processo
    const processEmbed = new EmbedBuilder()
      .setColor('#f59e0b')
      .setTitle('📊 FLUXO DE PAGAMENTO')
      .setDescription('**Veja como funciona do início ao fim:**')
      .addFields(
        {
          name: 'ETAPA 1: Carrinho',
          value: '```\n→ Adicione jogos ao carrinho\n→ Aplique cupom de desconto\n→ Revise os itens\n```',
          inline: false
        },
        {
          name: 'ETAPA 2: Checkout',
          value: '```\n→ Escolha PIX ou Cartão\n→ Confirme o valor total\n→ Prossiga para pagamento\n```',
          inline: false
        },
        {
          name: 'ETAPA 3: Pagamento',
          value: '```\n→ QR Code / Dados do Cartão\n→ Realize o pagamento\n→ Aguarde confirmação\n```',
          inline: false
        },
        {
          name: 'ETAPA 4: Confirmação',
          value: '```\n✓ Sistema detecta pagamento\n✓ Pedido aprovado automaticamente\n✓ Jogos liberados!\n```',
          inline: false
        }
      )
      .setImage('https://via.placeholder.com/800x100/f59e0b/ffffff?text=Processo+Simples+e+Rapido')

    // Embed Segurança
    const securityEmbed = new EmbedBuilder()
      .setColor('#ef4444')
      .setTitle('🔒 GARANTIAS DE SEGURANÇA')
      .setDescription('**Por que nossos pagamentos são 100% seguros?**')
      .addFields(
        {
          name: '🏆 Mercado Pago',
          value: '```\n✓ Empresa do Mercado Livre\n✓ Certificação PCI-DSS Level 1\n✓ Usado por milhões de pessoas\n✓ Líder em pagamentos na América Latina\n```',
          inline: false
        },
        {
          name: '🛡️ Proteções Ativas',
          value: '• **SSL 256-bit** - Criptografia militar\n• **Tokenização** - Dados não salvos\n• **2FA** - Autenticação dupla\n• **Anti-Fraude** - IA detectando fraudes\n• **Compliance** - LGPD e PCI compliant',
          inline: false
        },
        {
          name: '✅ Suas Garantias',
          value: '> 🔐 Seus dados bancários NUNCA nos são enviados\n> 💰 Reembolso garantido em caso de problemas\n> 🛟 Suporte disponível 24/7\n> 📜 Transações todas registradas',
          inline: false
        }
      )
      .setFooter({ 
        text: '🔒 Tecnologia de segurança bancária',
        iconURL: 'https://via.placeholder.com/32/ef4444/ffffff?text=🔒'
      })

    // Embed FAQ
    const faqEmbed = new EmbedBuilder()
      .setColor('#3b82f6')
      .setTitle('❓ DÚVIDAS SOBRE PAGAMENTO')
      .addFields(
        {
          name: '💳 Meu cartão foi recusado',
          value: '> • Verifique se tem limite disponível\n> • Confirme os dados digitados\n> • Entre em contato com seu banco\n> • Tente usar PIX como alternativa',
          inline: false
        },
        {
          name: '⏰ Quanto tempo demora?',
          value: '> **PIX:** Até 5 minutos (geralmente instantâneo)\n> **Cartão:** 2-5 minutos após aprovação\n> **Se demorar mais:** Abra um ticket',
          inline: false
        },
        {
          name: '🔄 Posso cancelar?',
          value: '> Antes da aprovação: Sim, a qualquer momento\n> Após aprovação: Solicite reembolso via ticket\n> Prazo: Até 7 dias para troca/reembolso',
          inline: false
        },
        {
          name: '💰 Há taxas escondidas?',
          value: '> **NÃO!** O valor mostrado é o valor final\n> Sem surpresas no pagamento\n> Preço justo e transparente',
          inline: false
        }
      )

    // Embed CTA
    const ctaEmbed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('✨ PRONTO PARA COMPRAR?')
      .setDescription('```ansi\n[1;32m✓[0m Pagamento Rápido e Seguro\n[1;32m✓[0m Entrega Imediata\n[1;32m✓[0m Suporte Dedicado\n[1;32m✓[0m Satisfação Garantida\n```\n\n**👇 Escolha uma opção abaixo:**')
      .setFooter({ 
        text: 'Ez Games - Pagamentos Processados pelo Mercado Pago',
        iconURL: 'https://via.placeholder.com/32/10b981/ffffff?text=MP'
      })
      .setTimestamp()

    // Botões
    const row1 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('🛒 Ir para Loja')
          .setStyle(ButtonStyle.Link)
          .setURL(config.siteUrl)
          .setEmoji('🛒'),
        new ButtonBuilder()
          .setLabel('💚 Pagar com PIX')
          .setStyle(ButtonStyle.Success)
          .setCustomId('payment_pix')
          .setEmoji('💚'),
        new ButtonBuilder()
          .setLabel('💳 Pagar com Cartão')
          .setStyle(ButtonStyle.Primary)
          .setCustomId('payment_card')
          .setEmoji('💳')
      )

    const row2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('📚 Como Comprar')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('show_tutorial')
          .setEmoji('📚'),
        new ButtonBuilder()
          .setLabel('💬 Abrir Ticket')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('ticket_create')
          .setEmoji('💬'),
        new ButtonBuilder()
          .setLabel('🎁 Ver Cupons')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('show_coupons')
          .setEmoji('🎁')
      )

    await interaction.reply({ 
      embeds: [mainEmbed, pixEmbed, cardEmbed, compareEmbed, processEmbed, securityEmbed, faqEmbed, ctaEmbed],
      components: [row1, row2]
    })
  }
}

