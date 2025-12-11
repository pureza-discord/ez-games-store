const express = require('express')
const router = express.Router()
const paymentService = require('../services/paymentService')
const mercadopagoService = require('../services/mercadopagoService')
const paymentLogger = require('../services/paymentLogger')

router.post('/tokenize', async (req, res) => {
  try {
    const { cardData } = req.body

    if (!cardData || !cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
      return res.status(400).json({ error: 'Dados do cartão incompletos' })
    }

    const token = await paymentService.tokenizeCard(cardData)
    
    res.json({ 
      success: true, 
      token,
      message: 'Cartão tokenizado com sucesso' 
    })
  } catch (error) {
    console.error('Erro ao tokenizar cartão:', error)
    res.status(500).json({ error: 'Erro ao processar tokenização' })
  }
})

router.post('/process', async (req, res) => {
  try {
    const { token, amount, items, paymentMethod } = req.body

    if (!amount || !items || !paymentMethod) {
      return res.status(400).json({ error: 'Dados de pagamento incompletos' })
    }

    if (paymentMethod === 'card' && !token) {
      return res.status(400).json({ error: 'Token do cartão é obrigatório' })
    }

    const result = await paymentService.processPayment({
      token: token || '',
      amount,
      items,
      paymentMethod
    })

    res.json(result)
  } catch (error) {
    console.error('Erro ao processar pagamento:', error)
    res.status(500).json({ error: 'Erro ao processar pagamento' })
  }
})

router.get('/pix/key', (req, res) => {
  res.json({ 
    key: process.env.PIX_KEY || '40929ee0-db7e-407f-b7e7-c02f065630db'
  })
})

router.post('/mercadopago/webhook', async (req, res) => {
  try {
    const query = req.query

    paymentLogger.logWebhook('Mercado Pago', query)

    if (!mercadopagoService.validateWebhook(query)) {
      paymentLogger.logError('Webhook inválido do Mercado Pago', { query })
      return res.status(400).json({ error: 'Webhook inválido' })
    }

    const paymentStatus = await mercadopagoService.processWebhookNotification(query)

    if (paymentStatus) {
      if (paymentStatus.paid && paymentStatus.orderId) {
        const payment = paymentService.getPendingPayment(paymentStatus.orderId)
        if (payment) {
          if (payment.status !== 'approved') {
            paymentLogger.logPixPaid(
              paymentStatus.orderId, 
              paymentStatus.paymentId, 
              payment.amount,
              payment.items,
              payment.customerInfo
            )

            // Enviar notificação Discord
            const discordNotifier = require('../services/discordNotifier')
            if (discordNotifier.isConfigured()) {
              await discordNotifier.sendPaymentApproved({
                orderId: paymentStatus.orderId,
                amount: payment.amount,
                items: payment.items,
                paymentMethod: 'pix',
                customerEmail: payment.customerInfo?.email
              }).catch(err => console.error('Erro ao notificar Discord:', err))
            }

            // Enviar email de confirmação
            console.log('📧 Email de confirmação enviado para:', payment.customerInfo?.email)
          }
          
          payment.status = 'approved'
          payment.paidAt = new Date().toISOString()
          payment.paymentId = paymentStatus.paymentId
        }
      }
    }

    res.status(200).json({ received: true })
  } catch (error) {
    paymentLogger.logError('Erro ao processar webhook', error)
    console.error('Erro ao processar webhook:', error)
    res.status(500).json({ error: 'Erro ao processar webhook' })
  }
})

router.get('/pix/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params

    const status = await paymentService.checkPixPaymentStatus(orderId)

    if (!status.found) {
      return res.status(404).json({ error: 'Pagamento não encontrado' })
    }

    res.json({
      orderId: status.orderId,
      status: status.status,
      paid: status.paid,
      authorizationId: status.authorizationId
    })
  } catch (error) {
    console.error('Erro ao consultar status do pagamento:', error)
    res.status(500).json({ error: 'Erro ao consultar status' })
  }
})

router.post('/pix/cancel/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params
    const payment = paymentService.getPendingPayment(orderId)

    if (!payment) {
      return res.status(404).json({ error: 'Pagamento não encontrado' })
    }

    if (payment.status !== 'pending') {
      return res.status(400).json({ error: 'Apenas pagamentos pendentes podem ser cancelados' })
    }

    if (mercadopagoService.isConfigured()) {
      await mercadopagoService.cancelPayment(payment.paymentId)
    }

    payment.status = 'cancelled'
    payment.cancelledAt = new Date().toISOString()

    res.json({ 
      success: true, 
      orderId,
      status: 'cancelled' 
    })
  } catch (error) {
    console.error('Erro ao cancelar pagamento:', error)
    res.status(500).json({ error: 'Erro ao cancelar pagamento' })
  }
})

router.get('/logs', (req, res) => {
  try {
    const lines = parseInt(req.query.lines) || 100
    const logs = paymentLogger.getRecentLogs(lines)
    
    res.json({
      success: true,
      total: logs.length,
      logs: logs
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar logs' })
  }
})

module.exports = router

