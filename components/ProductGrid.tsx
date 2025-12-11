'use client'

import { useState } from 'react'
import { Product, categories } from '@/data/products'
import ProductCard from './ProductCard'
import LoginModal from './LoginModal'
import { FiPackage, FiZap, FiStar } from 'react-icons/fi'
import SearchIcon from './icons/SearchIcon'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedTab, setSelectedTab] = useState<'popular' | 'pack' | 'individual'>('pack')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [showLoginModal, setShowLoginModal] = useState(false)

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Todos' || product.category === selectedCategory
    
    if (selectedTab === 'popular') {
      return categoryMatch && product.popular === true
    } else if (selectedTab === 'pack') {
      return categoryMatch && product.type === 'pack'
    } else {
      return categoryMatch && product.type === 'individual'
    }
  })

  const popularCount = products.filter(p => p.popular === true).length
  const packCount = products.filter(p => p.type === 'pack').length
  const individualCount = products.filter(p => p.type === 'individual').length

  const handleTabChange = (tab: 'popular' | 'pack' | 'individual') => {
    console.log('Tab clicada:', tab)
    setSelectedTab(tab)
    setSelectedCategory('Todos')
  }

  const handleCategoryChange = (category: string) => {
    console.log('Categoria clicada:', category)
    setSelectedCategory(category)
  }

  return (
    <div id="catalogo" className="space-y-6">
      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 p-1.5 bg-bg-secondary rounded-2xl border border-primary/10">
          <button
            type="button"
            onClick={() => handleTabChange('popular')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedTab === 'popular'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-bg-tertiary hover:text-text'
            }`}
          >
            <FiStar size={16} />
            <span>Popular</span>
            <span className="text-xs opacity-75">({popularCount})</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('pack')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedTab === 'pack'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-bg-tertiary hover:text-text'
            }`}
          >
            <FiPackage size={16} />
            <span>Pacotes</span>
            <span className="text-xs opacity-75">({packCount})</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('individual')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedTab === 'individual'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-bg-tertiary hover:text-text'
            }`}
          >
            <FiZap size={16} />
            <span>Individual</span>
            <span className="text-xs opacity-75">({individualCount})</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary hover:text-text'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="text-center text-sm text-text-muted mb-4">
        <span className="text-text-secondary">{filteredProducts.length} jogos encontrados</span>
        {selectedCategory !== 'Todos' && (
          <span className="ml-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            {selectedCategory}
          </span>
        )}
      </div>

      {/* Results */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onLoginRequired={() => setShowLoginModal(true)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-bg-secondary rounded-2xl p-12 max-w-md mx-auto border border-primary/10">
            <div className="w-20 h-20 mx-auto mb-4 opacity-50">
              <SearchIcon className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-text">Nenhum jogo encontrado</h3>
            <p className="text-text-secondary mb-6">
              Tente selecionar outra categoria
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos')
                setSelectedTab('pack')
              }}
              className="btn-primary"
            >
              Ver Todos os Pacotes
            </button>
          </div>
        </div>
      )}
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}
