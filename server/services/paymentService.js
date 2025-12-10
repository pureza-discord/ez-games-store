const crypto = require('crypto')
const mercadopagoService = require('./mercadopagoService')
const paymentLogger = require('./paymentLogger')

const pendingPayments = new Map()

class PaymentService {
  async tokenizeCard(cardData) {
    const cardNumber = cardData.number.replace(/\s/g, '')
    
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      throw new Error('Número de cartão inválido')
    }

    const last4 = cardNumber.slice(-4)
    const hash = crypto.createHash('sha256')
    hash.update(cardNumber + cardData.cvv + Date.now())
    const tokenHash = hash.digest('hex').substring(0, 16)
    
    const token = `tok_${Date.now()}_${last4}_${tokenHash}`
    
    return {
      token,
      last4,
      brand: this.detectCardBrand(cardNumber),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  }

  detectCardBrand(cardNumber) {
    const firstDigit = cardNumber[0]
    const firstTwo = cardNumber.substring(0, 2)
    
    if (firstDigit === '4') return 'visa'
    if (firstTwo >= '51' && firstTwo <= '55') return 'mastercard'
    if (firstTwo === '34' || firstTwo === '37') return 'amex'
    if (firstTwo >= '60' && firstTwo <= '65') return 'discover'
    
    return 'unknown'
  }

  async processPayment({ token, amount, items, paymentMethod }) {
    if (paymentMethod === 'card') {
      if (!token) {
        throw new Error('Token do cartão é obrigatório')
      }

      const orderId = `ORD_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`
      
      return {
        success: true,
        orderId,
        paymentMethod: 'card',
        amount,
        status: 'approved',
        transactionId: `TXN_${Date.now()}_${crypto.randomBytes(6).toString('hex')}`,
        timestamp: new Date().toISOString()
      }
    }

    if (paymentMethod === 'pix') {
      const orderId = `ORD_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`
      
      if (!mercadopagoService.isConfigured()) {
        console.warn('Mercado Pago não configurado, usando modo fallback')
        const qrCode = this.generatePixQRCode(amount)
        
        return {
          success: true,
          orderId,
          paymentMethod: 'pix',
          amount,
          status: 'pending',
          qrCode,
          pixKey: process.env.PIX_KEY || '40929ee0-db7e-407f-b7e7-c02f065630db',
          timestamp: new Date().toISOString()
        }
      }

      try {
        const mpPayment = await mercadopagoService.createPixPayment({
          orderId,
          amount,
          description: `Compra Ez Games - ${items.length} item(s)`,
          payer: {
            email: 'cliente@ezgames.com',
            firstName: 'Cliente',
            lastName: 'Ez Games',
            document: '00000000000'
          }
        })

        pendingPayments.set(orderId, {
          orderId,
          paymentId: mpPayment.paymentId,
          amount,
          items,
          status: 'pending',
          createdAt: new Date().toISOString(),
          customerInfo: {
            email: payer?.email || 'cliente@ezgames.com',
            name: `${payer?.firstName || 'Cliente'} ${payer?.lastName || 'Ez Games'}`
          }
        })

        paymentLogger.logPixCreated(orderId, amount, items)

        return {
          success: true,
          orderId,
          paymentMethod: 'pix',
          amount,
          status: 'pending',
          qrCode: mpPayment.pixCopiaECola,
          qrCodeBase64: mpPayment.qrCodeBase64,
          expiresAt: mpPayment.expiresAt,
          timestamp: new Date().toISOString()
        }
      } catch (error) {
        paymentLogger.logError('Falha ao criar pagamento PIX', error)
        console.error('Erro ao criar pagamento Mercado Pago:', error)
        throw new Error('Falha ao criar pagamento PIX')
      }
    }

    throw new Error('Método de pagamento inválido')
  }

  generatePixQRCode(amount) {
    const pixKey = process.env.PIX_KEY || '40929ee0-db7e-407f-b7e7-c02f065630db'
    const amountFormatted = amount.toFixed(2).replace('.', '')
    const merchantName = 'EZ GAMES'
    const city = 'SAO PAULO'
    
    return `00020126580014BR.GOV.BCB.PIX0136${pixKey}52040000530398654${amountFormatted}5802BR59${merchantName.length}${merchantName}60${city.length}${city}62070503***6304`
  }

  async checkPixPaymentStatus(orderId) {
    const payment = pendingPayments.get(orderId)
    
    if (!payment) {
      return {
        found: false,
        status: 'not_found'
      }
    }

    if (!mercadopagoService.isConfigured()) {
      return {
        found: true,
        orderId,
        status: payment.status,
        paid: false
      }
    }

    try {
      const status = await mercadopagoService.getPaymentStatus(payment.paymentId)
      
      if (status.paid && payment.status !== 'approved') {
        payment.status = 'approved'
        payment.paidAt = new Date().toISOString()
        payment.paymentId = status.paymentId
        
        paymentLogger.logPixPaid(
          orderId, 
          status.paymentId, 
          payment.amount,
          payment.items,
          payment.customerInfo
        )
      }

      return {
        found: true,
        orderId,
        status: status.status,
        paid: status.paid,
        paymentId: status.paymentId
      }
    } catch (error) {
      paymentLogger.logError('Erro ao verificar status do pagamento', error)
      console.error('Erro ao verificar status:', error)
      return {
        found: true,
        orderId,
        status: 'error',
        paid: false
      }
    }
  }

  getPendingPayment(orderId) {
    return pendingPayments.get(orderId)
  }
}

const serviceInstance = new PaymentService()
module.exports = serviceInstance
module.exports.pendingPayments = pendingPayments

