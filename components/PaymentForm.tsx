'use client'

import { useState, useEffect } from 'react'
import { CartItem } from '@/store/cartStore'
import { FiCopy, FiCheck } from 'react-icons/fi'
import Link from 'next/link'
import { paymentApi } from '@/lib/api'

interface PaymentFormProps {
  paymentMethod: 'card' | 'pix'
  total: number
  items: CartItem[]
}

export default function PaymentForm({ paymentMethod, total, items }: PaymentFormProps) {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  })
  const [pixKey, setPixKey] = useState('')
  const [copied, setCopied] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [orderId, setOrderId] = useState<string | null>(null)
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null)
  const [checkingPayment, setCheckingPayment] = useState(false)

  useEffect(() => {
    if (paymentMethod === 'pix') {
      paymentApi.getPixKey().then((data) => {
        setPixKey(data.key)
      }).catch(() => {
        setPixKey('40929ee0-db7e-407f-b7e7-c02f065630db')
      })
    }

    // Cleanup: para o polling quando o componente é desmontado
    return () => {
      setCheckingPayment(false)
    }
  }, [paymentMethod])

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19)
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/')
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5)
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4)
    }

    setCardData((prev) => ({ ...prev, [name]: formattedValue }))
  }

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    setError('')

    try {
      const tokenizeResponse = await paymentApi.tokenizeCard({ cardData })
      const token = tokenizeResponse.token.token

      const paymentResponse = await paymentApi.processPayment({
        token,
        amount: total,
        items,
        paymentMethod: 'card'
      })

      if (paymentResponse.success) {
        setSuccess(true)
      } else {
        throw new Error('Falha ao processar pagamento')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao processar pagamento. Tente novamente.')
    } finally {
      setProcessing(false)
    }
  }

  const handlePixSubmit = async () => {
    setProcessing(true)
    setError('')

    try {
      const paymentResponse = await paymentApi.processPayment({
        token: '',
        amount: total,
        items,
        paymentMethod: 'pix'
      })

      if (paymentResponse.success) {
        setOrderId(paymentResponse.orderId)
        
        // Se tiver QR Code base64 da API PicPay
        if (paymentResponse.qrCodeBase64) {
          setQrCodeBase64(paymentResponse.qrCodeBase64)
        }
        
        // Inicia polling para verificar status
        startPaymentPolling(paymentResponse.orderId)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao processar pagamento PIX.')
    } finally {
      setProcessing(false)
    }
  }

  const startPaymentPolling = (paymentOrderId: string) => {
    setCheckingPayment(true)
    
    const checkInterval = setInterval(async () => {
      try {
        const statusResponse = await paymentApi.checkPixStatus(paymentOrderId)
        
        if (statusResponse.paid) {
          clearInterval(checkInterval)
          setCheckingPayment(false)
          setSuccess(true)
        }
      } catch (err) {
        console.error('Erro ao verificar status:', err)
      }
    }, 5000) // Verifica a cada 5 segundos

    // Para o polling após 30 minutos (tempo de expiração do PIX)
    setTimeout(() => {
      clearInterval(checkInterval)
      setCheckingPayment(false)
    }, 30 * 60 * 1000)
  }

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (success) {
    return (
      <div className="text-center py-12 bg-accent/10 rounded-xl border border-accent/30">
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
          <FiCheck size={40} className="text-white" />
        </div>
        <h3 className="text-3xl font-bold mb-2 text-text">Pagamento Aprovado!</h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Seu pedido foi confirmado. Verifique o Discord para receber as instruções de instalação.
        </p>
        <Link
          href="/"
          className="btn-primary inline-block"
        >
          Voltar ao Início
        </Link>
      </div>
    )
  }

  if (paymentMethod === 'pix') {
    return (
      <div className="space-y-6">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="font-bold mb-4 text-text">Instruções para Pagamento PIX</h3>
          <ol className="list-decimal list-inside space-y-3 text-sm text-text-secondary">
            <li>Clique em "Gerar PIX" abaixo</li>
            <li>Escaneie o QR Code ou copie a chave PIX</li>
            <li>Confirme o valor de <strong className="text-accent">R$ {total.toFixed(2).replace('.', ',')}</strong></li>
            <li>O pagamento será <strong className="text-accent">confirmado automaticamente</strong></li>
          </ol>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-text">
              Beneficiário
            </label>
            <input
              type="text"
              value="Renzo Torezani Alves"
              readOnly
              className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-primary/10 text-text font-semibold"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-text">
              Chave PIX
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={pixKey}
                readOnly
                className="flex-1 px-4 py-3 rounded-lg bg-bg-tertiary border border-primary/10 text-text font-mono text-sm"
              />
              <button
                onClick={copyPixKey}
                className="px-4 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold flex items-center space-x-2 transition-all"
              >
                {copied ? <FiCheck /> : <FiCopy />}
                <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-danger/10 border border-danger/30 rounded-xl p-4">
            <p className="text-sm text-danger font-medium">{error}</p>
          </div>
        )}

        {!orderId && (
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <p className="text-sm text-text font-medium">
              Clique no botão abaixo para gerar o QR Code PIX. O pagamento será confirmado automaticamente.
            </p>
          </div>
        )}

        {orderId && qrCodeBase64 && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white p-6 rounded-xl flex flex-col items-center border-2 border-accent shadow-xl">
              <h4 className="text-gray-900 font-bold mb-4 text-lg text-center">Escaneie o QR Code</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <img 
                  src={`data:image/png;base64,${qrCodeBase64}`} 
                  alt="QR Code PIX" 
                  className="w-64 h-64"
                />
              </div>
              <p className="text-gray-700 text-sm mt-4 text-center font-medium">Use o app do seu banco para escanear</p>
              <p className="text-gray-500 text-xs mt-2 text-center">Valor: R$ {total.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
        )}

        {orderId && !qrCodeBase64 && (
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 text-center">
            <div className="mb-3">
              <svg className="w-12 h-12 text-accent mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-text font-bold mb-2">PIX Gerado com Sucesso</p>
            <p className="text-sm text-text-secondary">
              Copie a chave PIX acima e faça o pagamento no app do seu banco.
            </p>
          </div>
        )}

        {checkingPayment && (
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              <div>
                <p className="text-sm text-text font-semibold">
                  Aguardando confirmação...
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  Verificação automática a cada 5 segundos
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handlePixSubmit}
          disabled={processing || !pixKey || orderId !== null}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg font-bold py-4"
        >
          {processing ? (
            <span className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Gerando QR Code...</span>
            </span>
          ) : orderId ? 'PIX Gerado com Sucesso' : 'Gerar QR Code PIX'}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleCardSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2 text-text">
          Número do Cartão
        </label>
        <input
          type="text"
          name="number"
          value={cardData.number}
          onChange={handleCardInput}
          placeholder="0000 0000 0000 0000"
          required
          className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-primary/10 focus:border-primary focus:outline-none text-text transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-text">
          Nome no Cartão
        </label>
        <input
          type="text"
          name="name"
          value={cardData.name}
          onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
          placeholder="NOME COMPLETO"
          required
          className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-primary/10 focus:border-primary focus:outline-none text-text transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-text">
            Validade
          </label>
          <input
            type="text"
            name="expiry"
            value={cardData.expiry}
            onChange={handleCardInput}
            placeholder="MM/AA"
            required
            className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-primary/10 focus:border-primary focus:outline-none text-text transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-text">
            CVV
          </label>
          <input
            type="text"
            name="cvv"
            value={cardData.cvv}
            onChange={handleCardInput}
            placeholder="123"
            required
            className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-primary/10 focus:border-primary focus:outline-none text-text transition-all"
          />
        </div>
      </div>

      {error && (
        <div className="bg-danger/10 border border-danger/30 rounded-xl p-4">
          <p className="text-sm text-danger font-medium">{error}</p>
        </div>
      )}

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        <p className="text-xs text-text-secondary">
          🔒 Seus dados são tokenizados e nunca armazenados. Processamento 100% seguro.
        </p>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processando...' : `Pagar R$ ${total.toFixed(2).replace('.', ',')}`}
      </button>
    </form>
  )
}

