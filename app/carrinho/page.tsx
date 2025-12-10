'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import { FiShoppingBag, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore()
  const total = getTotal()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center bg-bg-secondary rounded-2xl p-12 border border-primary/10">
          <FiShoppingBag size={64} className="mx-auto mb-6 text-text-muted" />
          <h2 className="text-3xl font-bold mb-4 text-text">Carrinho Vazio</h2>
          <p className="text-text-secondary mb-8">
            Adicione alguns jogos ao carrinho para começar suas aventuras!
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
      <h1 className="text-4xl font-bold mb-8 gradient-text">Carrinho de Compras</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-bg-secondary rounded-xl p-6 border border-primary/10 hover:border-primary/20 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-text">{item.name}</h3>
                  <p className="text-text-secondary text-sm mb-3 line-clamp-2">{item.description}</p>
                  <p className="text-xl font-bold text-primary">
                    R$ {typeof item.price === 'number' ? item.price.toFixed(2).replace('.', ',') : '0,00'}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Quantidade */}
                  <div className="flex items-center space-x-2 bg-bg-tertiary rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-bg-secondary rounded transition-colors"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-bg-secondary rounded transition-colors"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                  
                  {/* Remover */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-3 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger transition-all"
                    title="Remover item"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Resumo */}
        <div className="lg:col-span-1">
          <div className="bg-bg-secondary rounded-xl p-6 border border-primary/10 sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-text">Resumo do Pedido</h2>
            
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
            
            <div className="border-t border-primary/10 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Total</span>
                <span className="text-2xl font-bold gradient-text">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
            
            <Link
              href="/checkout"
              className="btn-primary w-full text-center block mb-3"
            >
              Finalizar Compra
            </Link>
            
            <button
              onClick={clearCart}
              className="w-full btn-secondary"
            >
              Limpar Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
