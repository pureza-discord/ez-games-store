const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('limpar')
    .setDescription('Limpa mensagens do canal (apenas Staff)')
    .addIntegerOption(option =>
      option.setName('quantidade')
        .setDescription('Quantidade de mensagens para limpar (1-100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  
  async execute(interaction) {
    const quantidade = interaction.options.getInteger('quantidade')

    try {
      const messages = await interaction.channel.messages.fetch({ limit: quantidade })
      
      // Filtrar mensagens com mais de 14 dias (Discord não permite deletar)
      const recentMessages = messages.filter(msg => 
        Date.now() - msg.createdTimestamp < 14 * 24 * 60 * 60 * 1000
      )

      if (recentMessages.size === 0) {
        return await interaction.reply({
          content: '❌ Não há mensagens recentes para deletar (mensagens devem ter menos de 14 dias).',
          ephemeral: true
        })
      }

      await interaction.channel.bulkDelete(recentMessages, true)

      await interaction.reply({
        content: `✅ ${recentMessages.size} mensagens foram deletadas com sucesso!`,
        ephemeral: true
      })

      // Auto-deletar a resposta após 5 segundos
      setTimeout(async () => {
        try {
          await interaction.deleteReply()
        } catch (error) {
          // Ignora erro se já foi deletado
        }
      }, 5000)
    } catch (error) {
      console.error('Erro ao limpar mensagens:', error)
      await interaction.reply({
        content: '❌ Erro ao limpar mensagens. Verifique as permissões do bot.',
        ephemeral: true
      })
    }
  }
}

