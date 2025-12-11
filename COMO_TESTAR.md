# 🧪 COMO TESTAR TODAS AS FUNCIONALIDADES

## 🚀 Iniciando o Projeto

### 1. Frontend + Backend
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### 2. Discord Bot (opcional)
```bash
cd discord-bot
npm install
npm run deploy  # Registra comandos (apenas 1x)
npm start
```

---

## ✅ TESTES PASSO A PASSO

### 1. Testar Notificações (Toasts)

**Teste: Adicionar múltiplos produtos rapidamente**
1. Acesse http://localhost:3000
2. Clique em "Comprar" em 5 produtos diferentes rapidamente
3. ✅ **Resultado Esperado:** Toasts empilham um abaixo do outro, com cores diferentes

**Teste: Tipos de toast**
- Success (verde): Adicionar ao carrinho
- Warning (amarelo): Cupom inválido
- Error (vermelho): Login com senha errada
- Info (azul): Remover cupom

---

### 2. Testar Validações do Carrinho

**Teste A: Item Duplicado**
1. Adicione "GTA Collection" ao carrinho
2. Tente adicionar novamente
3. ✅ **Dialog aparece:** "GTA Collection já está no carrinho. Deseja adicionar mais uma unidade?"
4. Clique em "Adicionar Mesmo Assim" → Item incrementa quantidade

**Teste B: Item em Pacote**
1. Adicione o pacote "SoulsLike Complete" ao carrinho
2. Tente adicionar "Elden Ring" (individual)
3. ✅ **Dialog aparece:** "O pacote SoulsLike Complete já contém Elden Ring..."
4. Teste "Cancelar" e "Adicionar Mesmo Assim"

**Teste C: Pacote com Individuais**
1. Adicione "Elden Ring" e "Dark Souls III" individualmente
2. Tente adicionar o pacote "SoulsLike Complete"
3. ✅ **Dialog avisa:** "Você já tem Elden Ring, Dark Souls III no carrinho..."

---

### 3. Testar Sistema de Cupons

1. Adicione produtos no valor de R$ 50+
2. Vá para `/checkout`
3. No campo de cupom, digite: **BLACKFRIDAY**
4. Clique em "Aplicar"
5. ✅ **Resultado:** 
   - Toast verde: "Cupom aplicado! Desconto de 20%"
   - Subtotal e Total aparecem
   - Desconto é mostrado em verde
   - Total recalcula automaticamente

**Cupons para testar:**
- `PRIMEIRACOMPRA` → 15% OFF (mín: R$ 30)
- `BLACKFRIDAY` → 20% OFF (mín: R$ 50)
- `DESCONTO10` → R$ 10 OFF (mín: R$ 40)
- `VIP20` → 25% OFF (mín: R$ 100)
- `BEMVINDO` → R$ 5 OFF (mín: R$ 20)

**Teste: Valor Mínimo**
1. Adicione produtos de R$ 20
2. Tente aplicar `BLACKFRIDAY` (requer R$ 50)
3. ✅ **Toast vermelho:** "Valor mínimo de compra: R$ 50,00"

---

### 4. Testar Autenticação

**Teste A: Registro**
1. Clique em "Entrar" no header
2. Clique em "Não tem conta? Cadastre-se"
3. Preencha:
   - Nome: Seu Nome
   - Email: teste@email.com
   - Senha: senha123
4. Clique em "Criar Conta"
5. ✅ **Resultado:** 
   - Toast verde: "Cadastro realizado!"
   - Modal fecha
   - Header mostra seu nome e botão de logout

**Teste B: Login Admin**
1. Clique em "Entrar"
2. Use:
   - Email: **admin@ezgames.com**
   - Senha: **admin123**
3. ✅ **Resultado:** Login bem-sucedido + acesso ao admin

**Teste C: Perfil**
1. Após login, clique no seu nome no header
2. Acesse `/perfil`
3. ✅ **Visualize:** 
   - Suas informações
   - Histórico de compras (vazio)
   - Se for admin, botão para painel

**Teste D: Logout**
1. Clique no ícone de logout (vermelho) no header
2. ✅ Deslogado, botão "Entrar" volta

---

### 5. Testar Painel Admin

1. Faça login com: **admin@ezgames.com / admin123**
2. Acesse: http://localhost:3000/admin
3. ✅ **Visualize:**
   - 4 cards de estatísticas
   - Vendas recentes
   - Ações rápidas
   - Analytics

**Teste: Proteção de Rota**
1. Faça logout
2. Tente acessar /admin
3. ✅ Redirecionado para home

---

### 6. Testar Sistema de Emails

**Nota:** Emails são simulados no console do servidor

1. Abra o terminal onde o backend está rodando
2. Registre um novo usuário
3. ✅ **No console do backend:** Email de boas-vindas HTML

**Para testar email de compra:**
1. Simule um pagamento aprovado
2. ✅ Console mostra email de confirmação com:
   - Número do pedido
   - Itens comprados
   - Total pago
   - Link para Discord

---

### 7. Testar Discord Bot

**Pré-requisito:** Bot deve estar online no seu servidor

**Comando 1: /catalogo**
```
/catalogo
```
✅ **Mostra:** Embed com pacotes e jogos + botões

**Comando 2: /como-comprar**
```
/como-comprar
```
✅ **Mostra:** Tutorial completo com 4 passos + cupons

**Comando 3: /ticket**
```
/ticket motivo:compra
```
✅ **Cria:** Canal privado "ticket-seunome"

**Comando 4: /pagamento**
```
/pagamento
```
✅ **Mostra:** Formas de pagamento aceitas

**Comando 5: /suporte**
```
/suporte
```
✅ **Mostra:** Central de ajuda + FAQ

**Comando 6: /limpar** (apenas Staff)
```
/limpar quantidade:10
```
✅ **Deleta:** 10 mensagens do canal

---

### 8. Testar Analytics

**Console do Browser:**
1. Abra DevTools (F12)
2. Vá para Console
3. Navegue pelo site
4. ✅ **Veja logs:** "📊 Analytics Event: page_view..."

**Eventos para testar:**
- Visualizar produto
- Adicionar ao carrinho
- Remover do carrinho
- Iniciar checkout
- Fazer login
- Buscar (se implementar)

---

### 9. Testar Pagamento PIX (QR Code)

1. Adicione produtos ao carrinho
2. Vá para `/checkout`
3. Selecione **PIX**
4. Clique em "Gerar QR Code PIX"
5. ✅ **Resultado:**
   - QR Code aparece na tela
   - Chave PIX disponível
   - Botão "Copiar"
   - Instruções claras
   - Polling automático (verifica a cada 5s)

**Nota:** Como é teste, o PIX não será realmente pago. Em produção, o webhook do Mercado Pago confirmaria.

---

## 🐛 POSSÍVEIS PROBLEMAS E SOLUÇÕES

### Problema: "Cannot find module"
**Solução:**
```bash
npm install
```

### Problema: Discord Bot não responde
**Soluções:**
1. Verifique se o token está no `.env`
2. Execute `npm run deploy` antes de `npm start`
3. Verifique permissões do bot no servidor

### Problema: QR Code PIX não aparece
**Soluções:**
1. Verifique se o arquivo `.env` existe na raiz
2. Confirme credenciais do Mercado Pago
3. Reinicie o servidor (Ctrl+C e `npm run dev`)

### Problema: Toasts não empilham
**Solução:**
- Recarregue a página (Ctrl+F5)
- Verifique se há erros no console

---

## 📊 CHECKLIST COMPLETO

### Funcionalidades Básicas
- [ ] Site carrega corretamente
- [ ] Navegação funciona
- [ ] Produtos são exibidos
- [ ] Carrinho adiciona items
- [ ] Checkout abre

### Notificações
- [ ] Toasts empilham corretamente
- [ ] 4 tipos de toast funcionam
- [ ] Auto-fecham após 5s

### Validações
- [ ] Dialog de item duplicado
- [ ] Dialog de item em pacote
- [ ] Dialog de pacote com individuais
- [ ] Botões funcionam corretamente

### Cupons
- [ ] Todos os 5 cupons funcionam
- [ ] Validação de valor mínimo
- [ ] Desconto calculado corretamente
- [ ] Remover cupom funciona

### Autenticação
- [ ] Registro funciona
- [ ] Login funciona
- [ ] Logout funciona
- [ ] Página de perfil acessível
- [ ] Proteção de rotas admin

### Discord Bot
- [ ] 6 comandos funcionam
- [ ] Sistema de tickets cria canais
- [ ] Botões interativos respondem
- [ ] Embeds são exibidos corretamente

### Admin
- [ ] Dashboard carrega
- [ ] Estatísticas aparecem
- [ ] Apenas admin acessa
- [ ] Analytics é exibido

### Emails
- [ ] Logs aparecem no console
- [ ] HTML está formatado
- [ ] Todos os 3 tipos funcionam

### Analytics
- [ ] Eventos são logados
- [ ] Session tracking funciona
- [ ] Stats são calculadas

---

## 🎉 SUCESSO!

Se todos os testes passarem, você tem um sistema **COMPLETO** e **PROFISSIONAL**!

**Próximos Passos:**
1. Configurar banco de dados real (MongoDB/PostgreSQL)
2. Ativar emails reais (Resend/SendGrid)
3. Deploy em produção (Vercel/Railway)
4. Configurar Google Analytics real
5. Testar em produção com pagamentos reais

---

**Qualquer dúvida, consulte SETUP_COMPLETO.md**

