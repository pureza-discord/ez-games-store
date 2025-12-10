import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface TokenizeCardRequest {
  cardData: {
    number: string
    name: string
    expiry: string
    cvv: string
  }
}

export interface TokenizeCardResponse {
  success: boolean
  token: {
    token: string
    last4: string
    brand: string
    expiresAt: string
  }
  message: string
}

export interface ProcessPaymentRequest {
  token: string
  amount: number
  items: any[]
  paymentMethod: 'card' | 'pix'
}

export interface ProcessPaymentResponse {
  success: boolean
  orderId: string
  paymentMethod: string
  amount: number
  status: string
  transactionId?: string
  qrCode?: string
  pixKey?: string
  timestamp: string
}

export interface PixKeyResponse {
  key: string
}

export interface PixStatusResponse {
  orderId: string
  status: string
  paid: boolean
  authorizationId?: string
}

export const paymentApi = {
  tokenizeCard: async (data: TokenizeCardRequest): Promise<TokenizeCardResponse> => {
    const response = await api.post('/payment/tokenize', data)
    return response.data
  },

  processPayment: async (data: ProcessPaymentRequest): Promise<ProcessPaymentResponse> => {
    const response = await api.post('/payment/process', data)
    return response.data
  },

  getPixKey: async (): Promise<PixKeyResponse> => {
    const response = await api.get('/payment/pix/key')
    return response.data
  },

  checkPixStatus: async (orderId: string): Promise<PixStatusResponse> => {
    const response = await api.get(`/payment/pix/status/${orderId}`)
    return response.data
  },

  cancelPixPayment: async (orderId: string): Promise<{ success: boolean; orderId: string; status: string }> => {
    const response = await api.post(`/payment/pix/cancel/${orderId}`)
    return response.data
  },
}

export default api

