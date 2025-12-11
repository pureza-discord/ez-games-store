# 🚀 Roadmap Ez Games - Próximas Funcionalidades

## ✅ Implementado

- [x] Sistema de pagamento PIX com QR Code (Mercado Pago)
- [x] Sistema de pagamento com Cartão de Crédito
- [x] Catálogo completo de jogos (100+ jogos)
- [x] Sistema de carrinho
- [x] Logs de pagamento
- [x] Verificação automática de pagamento PIX
- [x] Webhooks do Mercado Pago

---

## 🎯 Próximas Implementações

### 1. 🎟️ Sistema de Cupons de Desconto

**Descrição**: Sistema completo de cupons promocionais com diferentes tipos de descontos.

**Funcionalidades**:
- Cupons de desconto percentual (ex: 10%, 15%, 20%)
- Cupons de desconto fixo (ex: R$ 5,00 OFF)
- Cupons de frete grátis (para implementação futura)
- Cupons com data de expiração
- Cupons com limite de uso (ex: usar apenas 1x, 10x, ilimitado)
- Cupons específicos para produtos/categorias
- Cupons para primeira compra
- Sistema de geração de códigos únicos

**Estrutura de Dados**:
```typescript
interface Coupon {
  id: string
  code: string // Ex: "PRIMEIRACOMPRA", "BLACKFRIDAY20"
  type: 'percentage' | 'fixed' | 'free_shipping'
  value: number // 20 para 20% ou 10.00 para R$10
  minPurchase?: number // Valor mínimo da compra
  maxDiscount?: number // Desconto máximo (para %)
  usageLimit?: number // Quantas vezes pode ser usado
  usedCount: number // Quantas vezes foi usado
  validFrom: Date
  validUntil: Date
  active: boolean
  applicableProducts?: string[] // IDs dos produtos
  applicableCategories?: string[] // Categorias válidas
  firstPurchaseOnly?: boolean
}
```

**Implementação**:
- Nova rota `/api/coupon/validate` no backend
- Componente `CouponInput` no checkout
- Validação em tempo real
- Aplicação automática do desconto no carrinho
- Histórico de cupons usados por usuário (futuro)

---

### 2. 🔐 Sistema de Usuários e Autenticação

**Descrição**: Sistema completo de registro, login e gerenciamento de usuários.

**Funcionalidades**:
- Registro de usuário (email + senha)
- Login / Logout
- Recuperação de senha
- Perfil do usuário
- Histórico de compras
- Lista de desejos (wishlist)
- Endereços salvos (para futuro)

**Tecnologias Sugeridas**:
- **NextAuth.js**: Autenticação para Next.js
- **JWT**: Tokens de sessão
- **bcrypt**: Hash de senhas
- **Banco de Dados**: MongoDB ou PostgreSQL

**Estrutura de Dados**:
```typescript
interface User {
  id: string
  email: string
  password: string // Hash
  name: string
  discordId?: string // Para integração
  createdAt: Date
  purchases: Purchase[]
  wishlist: string[] // IDs dos produtos
  couponsUsed: string[] // IDs dos cupons
  role: 'user' | 'admin'
}

interface Purchase {
  id: string
  orderId: string
  amount: number
  items: CartItem[]
  paymentMethod: 'pix' | 'card'
  status: 'pending' | 'approved' | 'cancelled'
  createdAt: Date
  paidAt?: Date
}
```

---

### 3. 📧 Sistema de Email de Confirmação

**Descrição**: Envio automático de emails em eventos importantes.

**Eventos para Enviar Email**:
- ✅ Confirmação de cadastro
- ✅ Recuperação de senha
- ✅ Pagamento aprovado
- ✅ Pedido em processamento
- ✅ Pedido entregue (com instruções de instalação)
- ✅ Cupom de desconto especial
- ✅ Promoções e novos jogos

**Serviços Sugeridos**:
- **Resend**: Moderno, fácil de usar (recomendado)
- **SendGrid**: Até 100 emails/dia grátis
- **Mailgun**: Boa opção
- **Nodemailer**: Com SMTP próprio

**Templates de Email**:
```
1. Confirmação de Pedido
   - Número do pedido
   - Valor pago
   - Jogos comprados
   - Próximos passos

2. Pagamento Aprovado
   - Confirmação de pagamento
   - Link para Discord
   - Instruções de instalação

3. Entrega Realizada
   - Links de download
   - Chaves de ativação (se aplicável)
   - Tutorial de instalação
```

---

### 4. 🤖 Integração com Discord Bot

**Descrição**: Automação completa entre a loja e o Discord para entrega de jogos e suporte.

**Funcionalidades**:

#### A) Entrega Automática de Jogos
- Quando pagamento aprovado → Bot envia DM para o cliente
- Mensagem contém:
  - Links de download dos jogos
  - Chaves de ativação (se tiver)
  - Instruções de instalação
  - Suporte técnico

#### B) Sistema de Tickets
- Comando `/ticket` para abrir suporte
- Categorias: Pagamento, Instalação, Dúvidas
- Sistema de claims (staff pode pegar o ticket)
- Log de tickets

#### C) Verificação de Compra
- Comando `/minhas-compras` mostra histórico
- Vinculação automática Discord ↔ Compra
- Role automática para clientes (ex: @Cliente)

#### D) Notificações para Staff
- Canal privado #vendas
- Notificação quando há nova compra
- Embed com informações do pedido
- Botões de ação rápida

**Comandos do Bot**:
```
/ticket - Abrir ticket de suporte
/minhas-compras - Ver histórico de compras
/vincular <email> - Vincular Discord com conta
/status <id_pedido> - Ver status do pedido
/reenviar <id_pedido> - Reenviar jogos (staff)
/cupom <codigo> - Gerar cupom (admin)
```

**Estrutura do Bot**:
```javascript
// Exemplo de integração
webhook.on('payment.approved', async (data) => {
  const user = await getDiscordUser(data.customerEmail)
  
  if (user) {
    const dm = await user.createDM()
    await dm.send({
      embeds: [{
        title: '🎮 Pagamento Aprovado!',
        description: 'Seus jogos estão prontos para download',
        fields: [
          { name: 'Pedido', value: data.orderId },
          { name: 'Jogos', value: data.items.join('\n') }
        ],
        color: 0x10b981
      }],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: 'Baixar Jogos',
              style: 5,
              url: `https://ezgames.com/download/${data.orderId}`
            }
          ]
        }
      ]
    })
  }
})
```

---

### 5. 📊 Painel Administrativo

**Descrição**: Dashboard completo para gerenciar a loja.

**Funcionalidades**:

#### A) Dashboard Principal
- Total de vendas (hoje, semana, mês)
- Gráfico de vendas
- Produtos mais vendidos
- Pagamentos pendentes
- Tickets abertos

#### B) Gerenciamento de Produtos
- Adicionar/Editar/Remover jogos
- Upload de imagens
- Gerenciar categorias
- Definir promoções

#### C) Gerenciamento de Pedidos
- Lista de todos os pedidos
- Filtros (status, data, valor)
- Detalhes do pedido
- Reenviar confirmação
- Cancelar pedido

#### D) Gerenciamento de Cupons
- Criar novos cupons
- Editar cupons existentes
- Ver estatísticas de uso
- Desativar cupons

#### E) Gerenciamento de Usuários
- Lista de usuários
- Histórico de compras por usuário
- Banir/Desbanir
- Promover a admin

#### F) Relatórios e Analytics
- Faturamento total
- Produtos mais vendidos
- Métodos de pagamento mais usados
- Taxa de conversão
- Cupons mais usados
- Exportar relatórios (CSV, PDF)

**Tecnologia**:
- Rota protegida `/admin`
- Middleware de autenticação
- Gráficos com Recharts ou Chart.js
- Tabelas com @tanstack/react-table

---

### 6. 📈 Analytics e Relatórios

**Descrição**: Sistema de métricas e análise de dados.

**Métricas a Acompanhar**:
- Visitantes únicos
- Taxa de conversão
- Valor médio do pedido
- Produtos no carrinho abandonado
- Origem do tráfego
- Tempo de permanência
- Páginas mais visitadas

**Ferramentas**:
- Google Analytics 4
- Vercel Analytics
- Dashboard customizado

---

## 📅 Cronograma Sugerido

### Fase 1 (2-3 dias)
- ✅ Sistema de Cupons de Desconto
- ✅ Ajustes de preços

### Fase 2 (4-5 dias)
- 🔐 Sistema de Usuários e Login
- 📧 Emails de Confirmação

### Fase 3 (5-7 dias)
- 🤖 Integração com Discord Bot
- 🎫 Sistema de Tickets

### Fase 4 (7-10 dias)
- 📊 Painel Administrativo
- 📈 Analytics e Relatórios

---

## 🛠️ Tecnologias Recomendadas

### Backend
- **Banco de Dados**: MongoDB (Mongoose) ou PostgreSQL (Prisma)
- **Autenticação**: NextAuth.js + JWT
- **Emails**: Resend ou SendGrid
- **Discord**: discord.js v14

### Frontend
- **UI Components**: shadcn/ui ou Radix UI
- **Formulários**: React Hook Form + Zod
- **Gráficos**: Recharts
- **Tabelas**: @tanstack/react-table

### DevOps
- **Deploy**: Vercel (frontend + backend)
- **Banco**: MongoDB Atlas ou Supabase
- **Storage**: AWS S3 ou Cloudflare R2 (para arquivos)

---

## 💡 Ideias Futuras

- 🎁 Sistema de pontos e recompensas
- 🌟 Sistema de reviews/avaliações
- 🔔 Notificações push
- 📱 App móvel
- 🌐 Multi-idioma (EN, ES)
- 💬 Chat ao vivo
- 🎮 Sistema de aluguel de jogos
- 🏆 Programa de afiliados
- 📦 Assinatura mensal (game pass style)

---

**Última atualização**: 10/12/2025

