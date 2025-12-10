'use client'

import { products } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import Link from 'next/link'
import { FiShoppingCart, FiArrowLeft, FiPackage, FiStar, FiCheck } from 'react-icons/fi'
import { useState } from 'react'

interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const product = products.find(p => p.id === id)
  const addToCart = useCartStore((state) => state.addItem)
  const addToast = useToastStore((state) => state.addToast)
  const [isAdding, setIsAdding] = useState(false)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gray-400">
              <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Produto não encontrado</h1>
          <p className="text-gray-400 mb-8">
            O produto que você está procurando não existe ou foi removido.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 btn-primary px-6 py-3 rounded-xl font-semibold"
          >
            <FiArrowLeft />
            <span>Voltar ao Catálogo</span>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product)
    addToast(product.name)
    setTimeout(() => setIsAdding(false), 600)
  }

  const isPack = product.type === 'pack'
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-primary-pink transition-colors">Início</Link>
        <span>/</span>
        <Link href="/#catalogo" className="hover:text-primary-pink transition-colors">Catálogo</Link>
        <span>/</span>
        <span className="text-white">{product.name}</span>
      </div>

      {/* Produto Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Imagem / Visual */}
        <div className="glass-effect rounded-3xl p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-pink/20 via-primary-purple/20 to-primary-blue/20 blur-3xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary-pink">
                <path d="M14.5 2H9.5L3 8.5V15.5L9.5 22H14.5L21 15.5V8.5L14.5 2Z" fill="currentColor" opacity="0.2"/>
                <path d="M12 7v5m0 3.5v.5m-4.5-4h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="flex justify-center space-x-3">
              {product.popular && (
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary-pink to-primary-purple font-bold text-sm flex items-center space-x-2">
                  <FiStar />
                  <span>POPULAR</span>
                </span>
              )}
              <span className={`px-4 py-2 rounded-full font-bold text-sm ${
                isPack 
                  ? 'bg-primary-blue/20 border-2 border-primary-blue text-primary-blue' 
                  : 'bg-primary-purple/20 border-2 border-primary-purple text-primary-purple'
              }`}>
                {isPack ? 'PACOTE' : 'INDIVIDUAL'}
              </span>
            </div>
          </div>
        </div>

        {/* Informações */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <span className="inline-block px-4 py-2 rounded-lg text-sm font-bold bg-primary-pink/20 text-primary-pink border border-primary-pink/50 mb-4">
              {product.category}
            </span>
            <h1 className="text-5xl font-black mb-4 gradient-text">
              {product.name}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Jogos Inclusos */}
          {product.games && product.games.length > 0 && (
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <FiPackage className="text-primary-blue" />
                <span>Jogos Inclusos</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.games.map((game, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <FiCheck className="text-green-400 flex-shrink-0" />
                    <span className="text-sm">{game}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preço e Compra */}
          <div className="glass-effect rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-gray-400 mb-2">Preço Especial</div>
                <div className="text-5xl font-black gradient-text">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-2">Economia</div>
                <div className="text-2xl font-bold text-green-400">
                  {isPack ? 'Até 70%' : 'Até 50%'}
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all ${
                isAdding
                  ? 'bg-green-500 scale-105'
                  : 'btn-primary hover:scale-105'
              }`}
            >
              <FiShoppingCart size={24} />
              <span>{isAdding ? '✓ Adicionado ao Carrinho!' : 'Adicionar ao Carrinho'}</span>
            </button>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <FiCheck className="text-green-400" />
                <span>Instalação instantânea via Steam</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheck className="text-green-400" />
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheck className="text-green-400" />
                <span>Pagamento seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos Relacionados */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-8 gradient-text text-center">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/produto/${relatedProduct.id}`}
                className="glass-effect rounded-2xl p-6 card-hover"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">🎮</div>
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-primary-pink/10 text-primary-pink border border-primary-pink/30">
                    {relatedProduct.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{relatedProduct.name}</h3>
                <p className="text-2xl font-black gradient-text">
                  R$ {relatedProduct.price.toFixed(2).replace('.', ',')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

