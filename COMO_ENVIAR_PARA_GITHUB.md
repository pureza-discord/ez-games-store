# 📤 Como Enviar o Projeto para o GitHub

## ✅ Passo 1: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name**: `ez-games-store` (ou o nome que preferir)
   - **Description**: "Loja premium de jogos com sistema de pagamento PIX e Cartão"
   - **Visibility**: 
     - ✅ **Private** (recomendado - só você e quem você convidar vê)
     - ❌ Public (qualquer um pode ver o código)
   - **NÃO marque** "Initialize this repository with a README"
3. Clique em **"Create repository"**

## ✅ Passo 2: Enviar o Código

Depois de criar o repositório, o GitHub mostrará instruções. Use estas:

### No PowerShell (na pasta do projeto):

```powershell
# Adicionar o repositório remoto (SUBSTITUA pelo SEU link do GitHub)
git remote add origin https://github.com/SEU_USUARIO/ez-games-store.git

# Renomear a branch para main (padrão do GitHub)
git branch -M main

# Enviar o código
git push -u origin main
```

**⚠️ IMPORTANTE**: Substitua `SEU_USUARIO/ez-games-store` pelo link do seu repositório!

## ✅ Passo 3: Convidar Seu Amigo

1. No GitHub, vá no seu repositório
2. Clique em **"Settings"** (Configurações)
3. No menu lateral, clique em **"Collaborators"** (Colaboradores)
4. Clique em **"Add people"** (Adicionar pessoas)
5. Digite o **nome de usuário** ou **email** do seu amigo no GitHub
6. Clique em **"Add [nome] to this repository"**

Seu amigo receberá um email de convite!

## ✅ Passo 4: Seu Amigo Clonar o Projeto

Seu amigo deve fazer:

```bash
# Clonar o repositório
git clone https://github.com/SEU_USUARIO/ez-games-store.git
cd ez-games-store

# Instalar dependências
npm install

# Copiar o template de configuração
copy .env.example .env

# Editar o .env com as credenciais dele
# (Pode usar notepad, VS Code, etc)
notepad .env

# Iniciar o projeto
npm run dev
```

## 🔑 Configurações Necessárias no .env

Seu amigo precisará configurar o arquivo `.env` com:

1. **Credenciais do Mercado Pago**
   - Criar conta em: https://www.mercadopago.com.br/developers
   - Ir em "Suas aplicações" → "Criar aplicação"
   - Copiar **Access Token** e **Public Key**

2. **Chave PIX**
   - Usar a chave PIX dele (UUID, CPF, email, etc)

Exemplo de `.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
SITE_URL=http://localhost:3000
API_URL=http://localhost:3001

MERCADOPAGO_ACCESS_TOKEN=APP_USR-123456...
MERCADOPAGO_PUBLIC_KEY=APP_USR-123456...

PIX_KEY=sua-chave-pix-aqui

PORT=3001
```

## 📝 Comandos Úteis

### Atualizar o código no GitHub (depois de fazer mudanças):
```powershell
git add .
git commit -m "Descrição da mudança"
git push
```

### Seu amigo puxar as últimas mudanças:
```bash
git pull
npm install  # Se houver novas dependências
```

## 🚀 Deploy (Hospedar Online)

### Opção 1: Vercel (Mais Fácil - Grátis)
1. Seu amigo cria conta em: https://vercel.com
2. Conecta o repositório do GitHub
3. Configura as variáveis de ambiente no painel da Vercel
4. Deploy automático! ✨

### Opção 2: Railway (Backend + Frontend)
1. Conta em: https://railway.app
2. "New Project" → Conectar GitHub
3. Adicionar variáveis de ambiente
4. Deploy automático

### Opção 3: VPS (Avançado)
- DigitalOcean, Linode, AWS EC2
- Instalar Node.js, configurar Nginx, SSL, etc.

## ⚠️ Importante para Produção

1. **HTTPS é obrigatório** (webhooks do Mercado Pago não funcionam com HTTP)
2. **Configurar webhook** no Mercado Pago:
   - URL: `https://seu-dominio.com/api/payment/mercadopago/webhook`
   - Evento: "Payments"
3. **Usar credenciais de produção** do Mercado Pago
4. **Nunca commitar o arquivo .env** (já está no .gitignore ✅)

## 🆘 Problemas Comuns

### Erro: "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/ez-games-store.git
```

### Erro: "Permission denied (publickey)"
Use HTTPS em vez de SSH:
```
https://github.com/usuario/repo.git  ✅
git@github.com:usuario/repo.git      ❌ (requer configurar SSH)
```

### QR Code PIX não aparece
1. Verificar se o `.env` está configurado corretamente
2. Reiniciar o servidor: `Ctrl+C` e depois `npm run dev`
3. Verificar se as credenciais do Mercado Pago estão válidas

## 📞 Suporte

- **GitHub**: https://docs.github.com
- **Mercado Pago**: https://www.mercadopago.com.br/developers
- **Vercel**: https://vercel.com/docs

---

Boa sorte! 🚀

