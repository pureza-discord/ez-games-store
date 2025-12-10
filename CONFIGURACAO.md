# Configuração Ez Games

## 📋 Passos para Configurar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
SITE_URL=http://localhost:3000
API_URL=http://localhost:3001

MERCADOPAGO_ACCESS_TOKEN=APP_USR-5090252301768565-121007-6447b330276ee50ab7a2ffc2108d7a8a-3054811276
MERCADOPAGO_PUBLIC_KEY=APP_USR-57ecf6da-94a5-4d76-8e90-83262affcbd8

PIX_KEY=40929ee0-db7e-407f-b7e7-c02f065630db

PORT=3001
```

### 3. Iniciar o Projeto

```bash
npm run dev
```

Isso iniciará:
- Frontend Next.js em `http://localhost:3000`
- Backend Express em `http://localhost:3001`

## 🎯 Funcionalidades Implementadas

✅ **Pagamentos**
- PIX via Mercado Pago com QR Code
- Cartão de crédito/débito com tokenização
- Verificação automática de status

✅ **Catálogo de Jogos**
- Mais de 100 jogos individuais
- Pacotes completos
- Filtros por categoria
- Sistema de carrinho

✅ **Logs de Pagamento**
Quando um PIX é aprovado, você verá no console do backend:

```
================================================================================
✅ PIX APROVADO - PAGAMENTO CONFIRMADO
⏰ 10/12/2025 15:30:45
📊 Dados:
   ID do Pedido: ORD_1702234245_a3f2
   ID do Pagamento: 123456789
   Valor Pago: R$ 60,00
   Status: ✅ APROVADO
   Ação: Liberar acesso aos jogos
================================================================================
```

## 📝 Observações Importantes

- O Mercado Pago está configurado com suas credenciais
- Os logs de pagamento ficam salvos em `server/logs/payments.log`
- Todos os jogos dos pacotes também estão disponíveis individualmente
- O sistema detecta automaticamente quando um PIX é pago

## 🚀 Próximos Passos

Para colocar em produção:
1. Configure um domínio HTTPS
2. Atualize as URLs no `.env` para produção
3. Configure o webhook do Mercado Pago: `https://seu-dominio.com/api/payment/mercadopago/webhook`

