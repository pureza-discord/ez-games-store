'use client'

import { Product } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import { useConfirmStore } from '@/store/confirmStore'
import { FiShoppingCart, FiStar, FiPackage, FiWifi, FiWifiOff } from 'react-icons/fi'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem)
  const addToast = useToastStore((state) => state.addToast)
  const showConfirm = useConfirmStore((state) => state.showConfirm)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    const result = addToCart(product, false)
    
    if (result.needsConfirm && result.message) {
      showConfirm(
        'Confirmar Adição',
        result.message,
        product,
        () => {
          addToCart(product, true)
          setIsAdding(true)
          addToast(`${product.name} adicionado ao carrinho!`, 'success')
          setTimeout(() => setIsAdding(false), 600)
        }
      )
    } else {
      setIsAdding(true)
      addToast(`${product.name} adicionado ao carrinho!`, 'success')
      setTimeout(() => setIsAdding(false), 600)
    }
  }

  const isPack = product.type === 'pack'
  const isPopular = product.popular
  const isOnline = product.online

  return (
    <div className="group relative bg-bg-secondary hover:bg-bg-tertiary rounded-xl p-5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      {/* Badges no topo */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {isPack ? (
            <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-bold flex items-center space-x-1">
              <FiPackage size={12} />
              <span>PACOTE</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-lg bg-accent/20 text-accent text-xs font-bold">
              INDIVIDUAL
            </span>
          )}
        </div>
        
        {isPopular && (
          <span className="px-3 py-1 rounded-lg bg-accent text-bg text-xs font-bold flex items-center space-x-1">
            <FiStar size={12} />
            <span>POPULAR</span>
          </span>
        )}
      </div>

      {/* Categoria */}
      <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-bg-tertiary text-text-secondary border border-primary/10 mb-3">
        {product.category}
      </span>

      {/* Nome e Descrição */}
      <h3 className="text-lg font-bold mb-2 text-text group-hover:text-primary transition-colors line-clamp-1">
        {product.name}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2 min-h-[40px]">
        {product.description}
      </p>

      {/* Jogos inclusos (apenas para pacotes) */}
      {product.games && product.games.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-bg/50 border border-primary/5">
          <div className="text-xs text-text-muted mb-2 font-semibold">Inclui:</div>
          <div className="flex flex-wrap gap-1">
            {product.games.slice(0, 2).map((game, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded bg-bg-tertiary text-text-secondary"
              >
                {game}
              </span>
            ))}
            {product.games.length > 2 && (
              <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary font-semibold">
                +{product.games.length - 2}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Badge Online/Offline */}
      {isOnline !== undefined && (
        <div className="mb-4">
          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${
            isOnline 
              ? 'bg-accent/10 text-accent' 
              : 'bg-text-muted/10 text-text-muted'
          }`}>
            {isOnline ? <FiWifi size={12} /> : <FiWifiOff size={12} />}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </span>
        </div>
      )}
      
      {/* Preço e Botão */}
      <div className="flex items-center justify-between pt-4 border-t border-primary/10">
        <div>
          <div className="text-xs text-text-muted mb-1">Preço</div>
          <div className="text-2xl font-bold text-primary">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center space-x-2 ${
            isAdding
              ? 'bg-accent scale-105'
              : 'bg-primary hover:bg-primary-hover hover:scale-105'
          }`}
        >
          <FiShoppingCart size={18} />
          <span className="hidden sm:inline">{isAdding ? 'Adicionado!' : 'Comprar'}</span>
        </button>
      </div>
    </div>
  )
}

