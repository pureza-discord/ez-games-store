# 🤖 Instalação do Discord Bot - Ez Games

## 📋 Pré-requisitos

- Node.js 18+
- Conta Discord
- Bot criado no Discord Developer Portal

## 🚀 Instalação Rápida

### 1. Instalar Dependências

```bash
cd discord-bot
npm install
```

### 2. Configurar Token

Crie um arquivo `.env` dentro da pasta `discord-bot`:

```env
DISCORD_BOT_TOKEN=SEU_TOKEN_AQUI
DISCORD_CLIENT_ID=SEU_CLIENT_ID_AQUI

# IDs do Servidor (opcional)
DISCORD_GUILD_ID=
CATALOG_CHANNEL_ID=
TICKETS_CHANNEL_ID=
SALES_CHANNEL_ID=
CLIENTE_ROLE_ID=
STAFF_ROLE_ID=

# URLs
SITE_URL=http://localhost:3000
API_URL=http://localhost:3001
```

**⚠️ IMPORTANTE:**

Cole o token do Discord Bot que você recebeu. Nunca compartilhe publicamente!

### 3. Registrar Comandos

```bash
npm run deploy
```

✅ Isso registrará os 6 comandos no Discord

### 4. Iniciar Bot

```bash
npm start
```

✅ Bot deve aparecer online no Discord!

## 📝 Comandos Disponíveis

- `/catalogo` - Catálogo completo com containers
- `/como-comprar` - Tutorial profissional
- `/ticket` - Sistema de tickets
- `/pagamento` - Info de pagamentos
- `/suporte` - Central de ajuda
- `/limpar` - Limpar mensagens (staff)

## 🔧 Configuração Avançada

### Obter IDs de Canais/Roles

1. Ative o Modo Desenvolvedor no Discord
2. Clique com botão direito no canal/role
3. Copiar ID
4. Cole no `.env`

### Permissões Necessárias

O bot precisa de:
- ✅ Ler Mensagens
- ✅ Enviar Mensagens  
- ✅ Gerenciar Mensagens
- ✅ Gerenciar Canais
- ✅ Usar Comandos de Barra
- ✅ Ver Histórico

### Link de Convite

```
https://discord.com/api/oauth2/authorize?client_id=1447942036199313420&permissions=8&scope=bot%20applications.commands
```

## 🧪 Testar

1. No Discord, digite `/catalogo`
2. Deve aparecer um embed profissional com botões
3. Teste todos os 6 comandos

## 🆘 Problemas?

### Bot não responde
- Verifique se o token está correto no `.env`
- Execute `npm run deploy` novamente
- Reinicie o bot

### Comandos não aparecem
- Execute `npm run deploy`
- Aguarde 5 minutos (cache do Discord)
- Reinicie o Discord

### Erro de permissões
- Convide o bot novamente com permissões corretas
- Verifique se ele tem role administrativa

---

**✅ Pronto! Bot funcionando perfeitamente!**

