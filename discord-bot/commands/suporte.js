const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suporte')
    .setDescription('🆘 Central de ajuda completa - tire todas as suas dúvidas'),
  
  async execute(interaction) {
    // Embed Principal - Banner
    const bannerEmbed = new EmbedBuilder()
      .setColor('#f59e0b')
      .setAuthor({ 
        name: 'Ez Games - Central de Suporte',
        iconURL: 'https://via.placeholder.com/32/f59e0b/ffffff?text=!'
      })
      .setTitle('🆘 CENTRAL DE SUPORTE 24/7')
      .setDescription('```ansi\n[1;33m╔═══════════════════════════════════╗[0m\n[1;37m║  Estamos Aqui Para Ajudar Você!  ║[0m\n[1;33m╚═══════════════════════════════════╝[0m```\n\n**📞 Suporte Ativo:** Online agora\n**⏱️ Tempo Médio de Resposta:** 5-15 minutos\n**⭐ Avaliação:** 4.9/5 (1.200+ atendimentos)')
      .setThumbnail('https://via.placeholder.com/150/f59e0b/ffffff?text=!')
      .setImage('https://via.placeholder.com/800x150/f59e0b/ffffff?text=Suporte+Sempre+Disponivel')

    // Embed Horários
    const horarioEmbed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('🕐 HORÁRIOS DE ATENDIMENTO')
      .setDescription('**Nossa equipe está disponível para você:**')
      .addFields(
        {
          name: '📅 Segunda a Sexta',
          value: '```yaml\nHorário:   09:00 - 22:00\nResposta:  Imediata\nEquipe:    5 atendentes\n```',
          inline: true
        },
        {
          name: '📅 Sábados',
          value: '```yaml\nHorário:   10:00 - 20:00\nResposta:  Até 15 minutos\nEquipe:    3 atendentes\n```',
          inline: true
        },
        {
          name: '📅 Domingos e Feriados',
          value: '```yaml\nHorário:   10:00 - 18:00\nResposta:  Até 30 minutos\nEquipe:    2 atendentes\n```',
          inline: true
        },
        {
          name: '🌙 Fora do Horário',
          value: '> ✓ Sistema automático ativo 24/7\n> ✓ Respostas automáticas para dúvidas comuns\n> ✓ Ticket fica na fila para próximo atendente\n> ✓ Resposta garantida em até 12 horas',
          inline: false
        }
      )

    // Embed FAQ
    const faqEmbed = new EmbedBuilder()
      .setColor('#3b82f6')
      .setTitle('❓ PERGUNTAS MAIS FREQUENTES')
      .setDescription('**Respostas Rápidas para Dúvidas Comuns**')
      .addFields(
        {
          name: '💳 Como faço para comprar?',
          value: '```\n1. Use /catalogo para ver os jogos\n2. Adicione ao carrinho no site\n3. Escolha PIX ou Cartão\n4. Receba instantaneamente!\n```\n> Use `/como-comprar` para tutorial completo',
          inline: false
        },
        {
          name: '⏰ Quanto tempo demora a entrega?',
          value: '```diff\n+ PIX:    Instantâneo (até 5 min)\n+ Cartão: 2-5 minutos\n```\n> A entrega é 100% automática!',
          inline: false
        },
        {
          name: '🎮 O jogo não está funcionando',
          value: '> **Passo 1:** Verifique os requisitos mínimos\n> **Passo 2:** Desative antivírus temporariamente\n> **Passo 3:** Execute como administrador\n> **Passo 4:** Abra um ticket se persistir',
          inline: false
        },
        {
          name: '💰 Posso pedir reembolso?',
          value: '```yaml\nPrazo:        Até 7 dias após compra\nCondição:     Jogo com defeito técnico\nProcesso:     Abra ticket com detalhes\nTempo:        Reembolso em 3-5 dias úteis\n```',
          inline: false
        },
        {
          name: '🔄 Posso trocar de jogo?',
          value: '> ✓ Sim! Trocas aceitas em até 7 dias\n> ✓ Jogo não pode ter sido jogado\n> ✓ Solicite via ticket\n> ✓ Escolha outro jogo do mesmo valor',
          inline: false
        },
        {
          name: '🎁 Como usar cupons?',
          value: '```\n1. Adicione jogos ao carrinho\n2. Vá para o checkout\n3. Digite o cupom (ex: PRIMEIRACOMPRA)\n4. Clique em Aplicar\n5. Desconto aplicado automaticamente!\n```',
          inline: false
        }
      )

    // Embed Problemas Técnicos
    const techEmbed = new EmbedBuilder()
      .setColor('#ef4444')
      .setTitle('🔧 SOLUÇÕES PARA PROBLEMAS TÉCNICOS')
      .addFields(
        {
          name: '❌ Download muito lento',
          value: '```fix\n✓ Pause e retome o download\n✓ Tente em outro horário\n✓ Use gerenciador de download (IDM)\n✓ Verifique sua internet\n```',
          inline: false
        },
        {
          name: '❌ Erro ao instalar',
          value: '```fix\n✓ Execute instalador como admin\n✓ Desative antivírus temporariamente\n✓ Verifique espaço em disco\n✓ Instale dependências (DirectX, VCRedist)\n```',
          inline: false
        },
        {
          name: '❌ Jogo não inicia',
          value: '```fix\n✓ Atualize drivers da placa de vídeo\n✓ Execute como administrador\n✓ Verifique compatibilidade Windows\n✓ Reinstale o jogo\n```',
          inline: false
        },
        {
          name: '❌ Erro de DLL faltando',
          value: '```fix\n✓ Instale Visual C++ Redistributable\n✓ Instale DirectX\n✓ Baixe a DLL específica (enviamos link)\n✓ Reinstale o jogo\n```',
          inline: false
        }
      )
      .setFooter({ text: '💡 Se nada funcionar, abra um ticket!' })

    // Embed Contatos
    const contatoEmbed = new EmbedBuilder()
      .setColor('#8b5cf6')
      .setTitle('📞 CANAIS DE ATENDIMENTO')
      .setDescription('**Escolha a melhor forma de entrar em contato:**')
      .addFields(
        {
          name: '🎫 Tickets (Recomendado)',
          value: '```yaml\nResposta:       5-15 minutos\nDisponibilidade: 24/7\nPrioridade:     Alta\nHistórico:      Salvo\n```\n> Use `/ticket` para abrir',
          inline: true
        },
        {
          name: '💬 Discord Chat',
          value: '```yaml\nResposta:       Imediata\nDisponibilidade: Horário comercial\nPrioridade:     Normal\nHistórico:      Temporário\n```\n> Mencione @Staff',
          inline: true
        },
        {
          name: '📧 Email (Em breve)',
          value: '```yaml\nResposta:       12-24 horas\nDisponibilidade: 24/7\nPrioridade:     Normal\nHistórico:      Salvo\n```\n> suporte@ezgames.com',
          inline: true
        }
      )

    // Embed Garantias
    const garantiaEmbed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('✅ NOSSAS GARANTIAS')
      .addFields(
        {
          name: '🎯 Garantia de Funcionamento',
          value: '```diff\n+ Todos os jogos são testados\n+ Suporte até o jogo funcionar\n+ Reinstalação gratuita\n+ Troca em caso de defeito\n```',
          inline: false
        },
        {
          name: '💰 Garantia de Satisfação',
          value: '```diff\n+ Reembolso em até 7 dias\n+ Sem perguntas desnecessárias\n+ Processo rápido e simples\n+ Crédito para próxima compra\n```',
          inline: false
        },
        {
          name: '🔒 Garantia de Segurança',
          value: '```diff\n+ Pagamentos 100% seguros\n+ Dados protegidos\n+ Sem vírus ou malware\n+ Privacidade respeitada\n```',
          inline: false
        }
      )
      .setImage('https://via.placeholder.com/800x100/10b981/ffffff?text=Sua+Satisfacao+é+Nossa+Prioridade')

    // Embed CTA
    const ctaEmbed = new EmbedBuilder()
      .setColor('#ec4899')
      .setTitle('💬 PRECISA DE AJUDA AGORA?')
      .setDescription('```ansi\n[1;35m╔═══════════════════════════════╗[0m\n[1;37m║  Atendimento Rápido e Eficaz  ║[0m\n[1;35m╚═══════════════════════════════╝[0m```\n\n**👇 Clique no botão abaixo para abrir um ticket**\n\n*Resposta garantida em minutos!*')
      .setFooter({ 
        text: 'Ez Games © 2025 | Suporte de Qualidade',
        iconURL: 'https://via.placeholder.com/32/ec4899/ffffff?text=EZ'
      })
      .setTimestamp()

    // Select Menu - Tipo de Ajuda
    const selectMenu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('support_category')
          .setPlaceholder('🔍 Escolha o tipo de ajuda que precisa')
          .addOptions([
            {
              label: 'Dúvidas sobre Compra',
              description: 'Como comprar, formas de pagamento, cupons',
              value: 'purchase',
              emoji: '💳'
            },
            {
              label: 'Problemas Técnicos',
              description: 'Instalação, erro ao iniciar, performance',
              value: 'technical',
              emoji: '🔧'
            },
            {
              label: 'Entrega de Jogos',
              description: 'Não recebi, links inválidos, chaves',
              value: 'delivery',
              emoji: '📦'
            },
            {
              label: 'Reembolso/Troca',
              description: 'Solicitar reembolso ou trocar jogo',
              value: 'refund',
              emoji: '🔄'
            },
            {
              label: 'Outros Assuntos',
              description: 'Outros tipos de dúvidas',
              value: 'other',
              emoji: '📝'
            }
          ])
      )

    // Botões Principais
    const row1 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('🎫 Abrir Ticket Agora')
          .setStyle(ButtonStyle.Danger)
          .setCustomId('ticket_create')
          .setEmoji('🎫'),
        new ButtonBuilder()
          .setLabel('📚 Ver Tutoriais')
          .setStyle(ButtonStyle.Primary)
          .setCustomId('show_tutorials')
          .setEmoji('📚'),
        new ButtonBuilder()
          .setLabel('💬 Chat ao Vivo')
          .setStyle(ButtonStyle.Success)
          .setCustomId('live_chat')
          .setEmoji('💬')
      )

    // Botões Secundários
    const row2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('📖 Como Comprar')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('show_tutorial')
          .setEmoji('📖'),
        new ButtonBuilder()
          .setLabel('💳 Pagamentos')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('payment_info')
          .setEmoji('💳'),
        new ButtonBuilder()
          .setLabel('🛒 Ir para Loja')
          .setStyle(ButtonStyle.Link)
          .setURL('http://localhost:3000')
          .setEmoji('🛒')
      )

    await interaction.reply({
      embeds: [bannerEmbed, horarioEmbed, faqEmbed, techEmbed, contatoEmbed, garantiaEmbed, ctaEmbed],
      components: [selectMenu, row1, row2]
    })
  }
}

