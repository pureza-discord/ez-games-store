module.exports = {
  token: process.env.DISCORD_BOT_TOKEN || '',
  clientId: process.env.DISCORD_CLIENT_ID || '1447942036199313420',
  guildId: process.env.DISCORD_GUILD_ID || '', // ID do servidor
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  apiUrl: process.env.API_URL || 'http://localhost:3001',
  
  // Canais
  channels: {
    catalog: process.env.CATALOG_CHANNEL_ID || '', // Canal #catálogo
    tickets: process.env.TICKETS_CHANNEL_ID || '', // Categoria de tickets
    sales: process.env.SALES_CHANNEL_ID || '', // Canal #vendas (privado)
  },
  
  // Roles
  roles: {
    cliente: process.env.CLIENTE_ROLE_ID || '', // Role @Cliente
    staff: process.env.STAFF_ROLE_ID || '', // Role @Staff
  }
}

