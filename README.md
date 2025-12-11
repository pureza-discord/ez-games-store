# 🎮 Ez Games - Loja Premium de Jogos

Plataforma completa de e-commerce para jogos com sistema avançado de pagamentos, Discord Bot integrado, painel administrativo e muito mais!

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![Discord.js](https://img.shields.io/badge/Discord.js-14-5865F2?style=flat-square&logo=discord)

## ⚡ Funcionalidades Principais

### 💳 Sistema de Pagamentos Avançado
- ✅ **PIX via Mercado Pago** com QR Code visual
- ✅ **Cartão de Crédito/Débito** com tokenização PCI-DSS
- ✅ **Verificação automática** de pagamento em tempo real
- ✅ **Webhooks** para confirmação instantânea
- ✅ **Notificações Discord** automáticas
- ✅ **Sistema de cupons** com desconto percentual e fixo
- ✅ **Validações inteligentes** de carrinho

### 🤖 Discord Bot Integrado
- ✅ **6 comandos profissionais** com embeds elaborados
- ✅ **Sistema de tickets** automático
- ✅ **Catálogo interativo** com botões e menus
- ✅ **Notificações** de vendas em tempo real
- ✅ **FAQ integrado** e suporte 24/7
- ✅ **Entrega automática** de jogos

### 🔐 Sistema de Autenticação
- ✅ **Login/Registro** com validação
- ✅ **Perfil de usuário** completo
- ✅ **Histórico de compras**
- ✅ **Proteção de rotas** (admin/user)
- ✅ **Sessões persistentes**

### 📊 Painel Administrativo
- ✅ **Dashboard** com métricas em tempo real
- ✅ **Gestão de pedidos** e clientes
- ✅ **Estatísticas** de vendas
- ✅ **Analytics integrado**
- ✅ **Relatórios** detalhados

### 🎯 Catálogo de Jogos
- ✅ **100+ jogos** individuais e pacotes
- ✅ **Validação de duplicatas** no carrinho
- ✅ **Detecção de jogos em pacotes**
- ✅ **Sistema de busca** e filtros
- ✅ **Indicadores** de online/offline

### 📧 Sistema de Emails
- ✅ **Templates HTML** profissionais
- ✅ **Email de boas-vindas**
- ✅ **Confirmação de pagamento**
- ✅ **Pedidos pendentes**
- ✅ Pronto para Resend/SendGrid

### 🎨 Interface Premium
- ✅ Design moderno com gradientes
- ✅ **Toast notifications** empilhadas
- ✅ **Dialogs de confirmação** inteligentes
- ✅ Totalmente responsivo
- ✅ Animações suaves
- ✅ Tema escuro otimizado

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no [Mercado Pago](https://www.mercadopago.com.br/developers) (para pagamentos PIX)
- Git instalado

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/ez-games.git
cd ez-games
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
SITE_URL=http://localhost:3000
API_URL=http://localhost:3001

# Credenciais do Mercado Pago
# Obtenha em: https://www.mercadopago.com.br/developers/panel/app
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_aqui
MERCADOPAGO_PUBLIC_KEY=sua_public_key_aqui

# Chave PIX (UUID ou chave aleatória)
PIX_KEY=sua_chave_pix_aqui

PORT=3001
```

### 4. Inicie o projeto

```bash
npm run dev
```

Isso iniciará:
- **Frontend (Next.js)**: http://localhost:3000
- **Backend (Express)**: http://localhost:3001

## 🏗️ Estrutura do Projeto

```
ez-games/
├── app/                      # Páginas Next.js (App Router)
│   ├── page.tsx             # Página inicial
│   ├── checkout/            # Checkout e pagamento
│   ├── carrinho/            # Página do carrinho
│   └── produto/[id]/        # Detalhes do produto
├── components/              # Componentes React
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PaymentForm.tsx      # Formulário de pagamento
│   └── ProductCard.tsx
├── server/                  # Backend Express
│   ├── index.js            # Servidor principal
│   ├── routes/
│   │   └── payment.js      # Rotas de pagamento
│   └── services/
│       ├── mercadopagoService.js  # Integração MP
│       ├── paymentService.js      # Lógica de pagamento
│       └── paymentLogger.js       # Sistema de logs
├── store/                   # Gerenciamento de estado (Zustand)
│   ├── cartStore.ts        # Estado do carrinho
│   └── toastStore.ts       # Toast notifications
├── data/
│   └── products.ts         # Catálogo de produtos
└── lib/
    └── api.ts              # Cliente API

```

## 🔑 Configuração do Mercado Pago

### 1. Criar conta no Mercado Pago

1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
2. Crie uma conta ou faça login
3. Vá em **"Suas aplicações"** → **"Criar aplicação"**

### 2. Obter as credenciais

1. Dentro da sua aplicação, vá em **"Credenciais de produção"** (ou "Credenciais de teste" para testes)
2. Copie o **Access Token** e a **Public Key**
3. Cole no arquivo `.env`

### 3. Configurar Webhook (Produção)

Para receber notificações automáticas de pagamento:

1. No painel do Mercado Pago, vá em **"Webhooks"**
2. Configure a URL: `https://seu-dominio.com/api/payment/mercadopago/webhook`
3. Selecione os eventos: **"Payments"**

## 🚀 Deploy

### Vercel (Recomendado para Frontend + Backend)

```bash
npm install -g vercel
vercel
```

Configure as variáveis de ambiente no painel da Vercel.

### Outras opções

- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: Railway, Render, Heroku, VPS (DigitalOcean, Linode)

### Importante para Produção

1. Use **HTTPS** (obrigatório para webhooks do Mercado Pago)
2. Configure as URLs no `.env` para produção
3. Use credenciais de **produção** do Mercado Pago
4. Configure o webhook com a URL pública

## 📊 Sistema de Logs

Os logs de pagamento são salvos em `server/logs/payments.log`.

Exemplo de log de pagamento aprovado:

```
================================================================================
✅ PIX APROVADO - PAGAMENTO CONFIRMADO
⏰ 10/12/2025 15:30:45
📊 Dados:
   ID do Pedido: ORD_1702234245_a3f2
   ID do Pagamento: 123456789
   Valor Pago: R$ 60,00
   Status: ✅ APROVADO
================================================================================
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Inicia frontend + backend em modo desenvolvimento
npm run dev:client   # Inicia apenas o frontend (Next.js)
npm run dev:server   # Inicia apenas o backend (Express)
npm run build        # Build de produção
npm start            # Inicia em modo produção
```

## 🔐 Segurança

- ✅ Tokenização de cartões (dados não são armazenados)
- ✅ Validação de webhooks do Mercado Pago
- ✅ HTTPS obrigatório em produção
- ✅ Variáveis de ambiente para credenciais
- ✅ Logs detalhados de todas as transações

## 📝 Personalização

### Adicionar novos produtos

Edite o arquivo `data/products.ts`:

```typescript
{
  id: 999,
  name: "Novo Jogo",
  price: 29.90,
  category: "aventura",
  image: "/assets/images/novo-jogo.png",
  description: "Descrição do jogo",
  features: ["Feature 1", "Feature 2"],
  requirements: {
    os: "Windows 10/11",
    processor: "Intel i5",
    memory: "8GB RAM",
    graphics: "GTX 1050",
    storage: "50GB"
  }
}
```

### Alterar cores/tema

Edite `tailwind.config.js`:

```javascript
colors: {
  primary: '#7c3aed',    // Roxo principal
  secondary: '#2dd4bf',  // Verde água
  accent: '#10b981',     // Verde destaque
  // ...
}
```

## 🤝 Suporte

Para dúvidas sobre:
- **Mercado Pago**: [Documentação oficial](https://www.mercadopago.com.br/developers)
- **Next.js**: [Documentação Next.js](https://nextjs.org/docs)
- **Problemas técnicos**: Abra uma issue neste repositório

## 📄 Licença

Este projeto é privado. Entre em contato para informações sobre licenciamento.

## ✅ Funcionalidades Implementadas (100%)

- [x] Sistema de cupons de desconto (5 cupons ativos)
- [x] Painel administrativo completo
- [x] Sistema de usuários/login com perfis
- [x] Email de confirmação (templates prontos)
- [x] Integração Discord Bot (6 comandos + tickets)
- [x] Analytics e relatórios em tempo real
- [x] Validações inteligentes de carrinho
- [x] Notificações Discord automáticas
- [x] Sistema de permissões (user/admin)
- [x] Toast notifications profissionais

## 🚀 Melhorias Futuras

- [ ] Banco de dados real (MongoDB/PostgreSQL)
- [ ] Emails reais (Resend/SendGrid)
- [ ] Sistema de reviews
- [ ] Wishlist (lista de desejos)
- [ ] Programa de afiliados
- [ ] Parcelamento no cartão

---

Desenvolvido com ❤️ por Ez Games

