const axios = require('axios')
const crypto = require('crypto')

class MercadoPagoService {
  constructor() {
    this.baseURL = 'https://api.mercadopago.com'
    this.accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      }
    })
  }

  async createPixPayment({ orderId, amount, description, payer }) {
    try {
      const payload = {
        transaction_amount: parseFloat(amount),
        description: description || 'Compra Ez Games',
        payment_method_id: 'pix',
        external_reference: orderId,
        notification_url: `${process.env.API_URL || 'http://localhost:3001'}/api/payment/mercadopago/webhook`,
        payer: {
          email: payer?.email || 'cliente@ezgames.com',
          first_name: payer?.firstName || 'Cliente',
          last_name: payer?.lastName || 'Ez Games',
          identification: {
            type: 'CPF',
            number: payer?.document || '00000000000'
          }
        }
      }

      const response = await this.api.post('/v1/payments', payload)
      
      const payment = response.data
      
      const qrCodeData = payment.point_of_interaction?.transaction_data
      
      return {
        success: true,
        paymentId: payment.id,
        orderId: orderId,
        status: payment.status,
        qrCode: qrCodeData?.qr_code || null,
        qrCodeBase64: qrCodeData?.qr_code_base64 || null,
        pixCopiaECola: qrCodeData?.qr_code || null,
        expiresAt: payment.date_of_expiration || this.getExpirationDate(),
        amount: payment.transaction_amount
      }
    } catch (error) {
      console.error('Erro ao criar pagamento Mercado Pago:', error.response?.data || error.message)
      throw new Error('Falha ao criar pagamento PIX no Mercado Pago')
    }
  }

  async getPaymentStatus(paymentId) {
    try {
      const response = await this.api.get(`/v1/payments/${paymentId}`)
      const payment = response.data
      
      return {
        paymentId: payment.id,
        orderId: payment.external_reference,
        status: payment.status,
        statusDetail: payment.status_detail,
        paid: payment.status === 'approved',
        amount: payment.transaction_amount,
        createdAt: payment.date_created,
        approvedAt: payment.date_approved
      }
    } catch (error) {
      if (error.response?.status === 404) {
        return {
          paymentId,
          status: 'not_found',
          paid: false
        }
      }
      
      console.error('Erro ao consultar status:', error.response?.data || error.message)
      throw new Error('Falha ao consultar status do pagamento')
    }
  }

  async cancelPayment(paymentId) {
    try {
      const response = await this.api.put(`/v1/payments/${paymentId}`, {
        status: 'cancelled'
      })
      
      return {
        success: true,
        paymentId: response.data.id,
        status: response.data.status
      }
    } catch (error) {
      console.error('Erro ao cancelar pagamento:', error.response?.data || error.message)
      throw new Error('Falha ao cancelar pagamento')
    }
  }

  validateWebhook(query) {
    return query.id && query.topic
  }

  async processWebhookNotification(query) {
    try {
      const { id, topic } = query
      
      if (topic === 'payment' || topic === 'merchant_order') {
        const paymentId = query['data.id'] || id
        return await this.getPaymentStatus(paymentId)
      }
      
      return null
    } catch (error) {
      console.error('Erro ao processar notificação webhook:', error)
      throw error
    }
  }

  getExpirationDate() {
    const date = new Date()
    date.setMinutes(date.getMinutes() + 30)
    return date.toISOString()
  }

  isConfigured() {
    return Boolean(this.accessToken)
  }
}

module.exports = new MercadoPagoService()



