// Sistema de email simulado
// Em produção, use Resend, SendGrid, ou Nodemailer

export interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
}

class EmailService {
  private from = 'Ez Games <noreply@ezgames.com>'

  async send(data: EmailData) {
    // Em produção, integrar com serviço real
    console.log('📧 Email simulado enviado:')
    console.log('Para:', data.to)
    console.log('Assunto:', data.subject)
    console.log('De:', data.from || this.from)
    console.log('---')
    console.log(data.html)
    console.log('---\n')

    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return {
      success: true,
      messageId: `msg_${Date.now()}`
    }
  }

  async sendWelcomeEmail(email: string, name: string) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #7c3aed 0%, #2dd4bf 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; }
            .button { display: inline-block; padding: 15px 30px; background: #7c3aed; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎮 Bem-vindo à Ez Games!</h1>
            </div>
            <div class="content">
              <p>Olá <strong>${name}</strong>,</p>
              <p>É um prazer ter você conosco! Sua conta foi criada com sucesso.</p>
              <p><strong>Benefícios de ter uma conta:</strong></p>
              <ul>
                <li>✅ Histórico completo de compras</li>
                <li>✅ Cupons exclusivos</li>
                <li>✅ Acesso prioritário a promoções</li>
                <li>✅ Suporte personalizado</li>
              </ul>
              <a href="http://localhost:3000" class="button">Explorar Catálogo</a>
              <p>Aproveite nossos cupons de boas-vindas:</p>
              <p><code style="background: #e5e7eb; padding: 5px 10px; border-radius: 4px; font-weight: bold;">PRIMEIRACOMPRA</code> - 15% de desconto</p>
            </div>
            <div class="footer">
              <p>Ez Games - Sua Loja Premium de Jogos</p>
              <p>Este é um email automático, não responda.</p>
            </div>
          </div>
        </body>
      </html>
    `

    return await this.send({
      to: email,
      subject: '🎮 Bem-vindo à Ez Games!',
      html
    })
  }

  async sendPaymentConfirmation(email: string, orderData: {
    orderId: string
    items: Array<{name: string; price: number; quantity: number}>
    total: number
    paymentMethod: string
  }) {
    const itemsList = orderData.items.map(item => 
      `<li>${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}</li>`
    ).join('')

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; }
            .order-box { background: white; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .total { font-size: 24px; font-weight: bold; color: #7c3aed; text-align: right; }
            .button { display: inline-block; padding: 15px 30px; background: #7c3aed; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Pagamento Aprovado!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Seu pedido foi confirmado</p>
            </div>
            <div class="content">
              <p>Ótima notícia! Seu pagamento foi aprovado com sucesso.</p>
              
              <div class="order-box">
                <h3 style="margin-top: 0; color: #7c3aed;">📦 Detalhes do Pedido</h3>
                <p><strong>Número do Pedido:</strong> #${orderData.orderId}</p>
                <p><strong>Método de Pagamento:</strong> ${orderData.paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito'}</p>
                
                <h4>Itens Comprados:</h4>
                <ul>${itemsList}</ul>
                
                <div class="total">Total: R$ ${orderData.total.toFixed(2)}</div>
              </div>

              <h3>📥 Próximos Passos:</h3>
              <ol>
                <li>Acesse nosso Discord</li>
                <li>Abra um ticket informando seu pedido: #${orderData.orderId}</li>
                <li>Receba os links de download e instruções</li>
              </ol>

              <a href="https://discord.gg/bX8BZEeZWy" class="button">Acessar Discord</a>

              <p style="margin-top: 30px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                <strong>💡 Dica:</strong> Guarde este email para referência futura!
              </p>
            </div>
            <div class="footer">
              <p>Ez Games - Obrigado pela sua compra!</p>
              <p>Precisa de ajuda? Entre em contato pelo Discord.</p>
            </div>
          </div>
        </body>
      </html>
    `

    return await this.send({
      to: email,
      subject: `✅ Pedido #${orderData.orderId} Aprovado - Ez Games`,
      html
    })
  }

  async sendOrderPendingEmail(email: string, orderId: string) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⏳ Pedido Aguardando Pagamento</h1>
            </div>
            <div class="content">
              <p>Seu pedido <strong>#${orderId}</strong> foi criado e está aguardando confirmação de pagamento.</p>
              <p>Se você pagou via PIX, a confirmação geralmente é instantânea (até 5 minutos).</p>
              <p><strong>Problemas com o pagamento?</strong> Entre em contato conosco pelo Discord.</p>
            </div>
            <div class="footer">
              <p>Ez Games</p>
            </div>
          </div>
        </body>
      </html>
    `

    return await this.send({
      to: email,
      subject: `⏳ Pedido #${orderId} Aguardando Pagamento`,
      html
    })
  }
}

export const emailService = new EmailService()

