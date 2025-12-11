'use client'

import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FiUser, FiMail, FiCalendar, FiShoppingBag, FiCreditCard } from 'react-icons/fi'

export default function PerfilPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <p className="text-text-secondary">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Meu Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informações do Usuário */}
        <div className="lg:col-span-1">
          <div className="bg-bg-secondary rounded-xl p-6 border border-primary/10">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <FiUser size={48} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text mb-1">{user.name}</h2>
              <p className="text-sm text-text-secondary">{user.email}</p>
              <span className={`mt-3 px-3 py-1 rounded-lg text-xs font-bold ${
                user.role === 'admin' 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-accent/20 text-accent'
              }`}>
                {user.role === 'admin' ? '👑 ADMIN' : '✨ CLIENTE'}
              </span>
            </div>

            <div className="space-y-3 border-t border-primary/10 pt-6">
              <div className="flex items-center space-x-3 text-sm">
                <FiCalendar className="text-text-secondary" />
                <div>
                  <p className="text-text-secondary">Membro desde</p>
                  <p className="text-text font-medium">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <FiShoppingBag className="text-text-secondary" />
                <div>
                  <p className="text-text-secondary">Total de Compras</p>
                  <p className="text-text font-medium">{user.purchases.length} pedidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Histórico de Compras */}
        <div className="lg:col-span-2">
          <div className="bg-bg-secondary rounded-xl p-6 border border-primary/10">
            <h3 className="text-xl font-bold mb-6 text-text flex items-center space-x-2">
              <FiShoppingBag className="text-primary" />
              <span>Histórico de Compras</span>
            </h3>

            {user.purchases.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShoppingBag size={40} className="text-primary/50" />
                </div>
                <p className="text-text-secondary mb-4">Você ainda não fez nenhuma compra</p>
                <a href="/" className="btn-primary inline-block">
                  Ver Catálogo
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {user.purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="bg-bg-tertiary rounded-lg p-4 border border-primary/5 hover:border-primary/20 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-text">Pedido #{purchase.orderId}</p>
                        <p className="text-xs text-text-secondary mt-1">
                          {new Date(purchase.createdAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        purchase.status === 'approved' 
                          ? 'bg-accent/20 text-accent' 
                          : purchase.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {purchase.status === 'approved' ? '✅ APROVADO' : 
                         purchase.status === 'pending' ? '⏳ PENDENTE' : '❌ CANCELADO'}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      {purchase.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-text-secondary">{item.name} x{item.quantity}</span>
                          <span className="text-text font-medium">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-primary/10">
                      <div className="flex items-center space-x-2">
                        <FiCreditCard className="text-text-secondary" size={16} />
                        <span className="text-sm text-text-secondary">
                          {purchase.paymentMethod === 'pix' ? 'PIX' : 'Cartão'}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        R$ {purchase.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {user.role === 'admin' && (
            <div className="mt-6 bg-primary/10 border-2 border-primary rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-primary flex items-center space-x-2">
                <span>👑</span>
                <span>Painel Administrativo</span>
              </h3>
              <p className="text-text-secondary mb-4">
                Você tem acesso ao painel administrativo.
              </p>
              <a href="/admin" className="btn-primary inline-block">
                Acessar Painel Admin
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

