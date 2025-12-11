'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useCouponStore } from '@/store/couponStore'
import { useAuth } from '@/lib/auth'
import { FiLock, FiCreditCard, FiDollarSign, FiUser } from 'react-icons/fi'
import Link from 'next/link'
import PaymentForm from '@/components/PaymentForm'
import CouponInput from '@/components/CouponInput'
import LoginModal from '@/components/LoginModal'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal } = useCartStore()
  const { getDiscount } = useCouponStore()
  const { isAuthenticated, user } = useAuth()
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  
  const subtotal = getTotal()
  const discount = getDiscount(subtotal)
  const total = subtotal - discount.amount

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true)
    }
  }, [isAuthenticated])

  // Verificar autenticação
  if (!isAuthenticated) {
    return (
      <>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center bg-bg-secondary rounded-2xl p-12 border border-primary/10">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiLock size={40} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-text">Faça Login Para Continuar</h2>
            <p className="text-text-secondary mb-8">
              Para finalizar sua compra, você precisa estar logado em uma conta.
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="btn-primary inline-block"
            >
              <FiUser className="inline mr-2" />
              Fazer Login / Cadastrar
            </button>
          </div>
        </div>
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center bg-bg-secondary rounded-2xl p-12 border border-primary/10">
          <h2 className="text-3xl font-bold mb-4 text-text">Carrinho Vazio</h2>
          <p className="text-text-secondary mb-8">
            Adicione itens ao carrinho antes de finalizar a compra.
          </p>
          <Link
            href="/"
            className="btn-primary inline-block"
          >
            Ver Catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-bg-secondary rounded-xl p-8 border border-primary/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2 text-text">
              <FiLock className="text-primary" />
              <span>Método de Pagamento</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/10'
                    : 'border-primary/20 bg-bg-tertiary hover:border-primary/40'
                }`}
              >
                <FiCreditCard size={32} className="mb-3 mx-auto text-primary" />
                <h3 className="font-semibold mb-2 text-text">Cartão de Crédito/Débito</h3>
                <p className="text-sm text-text-secondary">
                  Pagamento seguro com tokenização
                </p>
              </button>
              
              <button
                onClick={() => setPaymentMethod('pix')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  paymentMethod === 'pix'
                    ? 'border-accent bg-accent/10'
                    : 'border-primary/20 bg-bg-tertiary hover:border-accent/40'
                }`}
              >
                <FiDollarSign size={32} className="mb-3 mx-auto text-accent" />
                <h3 className="font-semibold mb-2 text-text">PIX</h3>
                <p className="text-sm text-text-secondary">
                  Verificação automática
                </p>
              </button>
            </div>
            
            {paymentMethod && (
              <PaymentForm 
                paymentMethod={paymentMethod} 
                total={total}
                items={items}
              />
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-bg-secondary rounded-xl p-6 border border-primary/10 sticky top-24 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-6 text-text">Resumo</h2>
              
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {item.name} ×{item.quantity}
                    </span>
                    <span className="text-text font-medium">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-primary/10 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="text-text font-medium">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                
                {discount.amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-accent font-semibold">Desconto</span>
                    <span className="text-accent font-semibold">
                      -R$ {discount.amount.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-3 border-t border-primary/10">
                  <span className="text-text-secondary font-semibold">Total</span>
                  <span className="text-2xl font-bold gradient-text">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-primary/10 pt-6">
              <CouponInput cartTotal={subtotal} />
            </div>
          </div>
        </div>
      </div>
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}

