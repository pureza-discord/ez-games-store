'use client'

import { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { useAnalytics } from '@/lib/analytics'

interface SearchBarProps {
  onSearch: (term: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { trackSearch } = useAnalytics()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim())
      trackSearch(searchTerm.trim(), 0)
    }
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative group">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar jogos... (ex: GTA, Souls, Terror)"
          className="w-full pl-12 pr-12 py-4 rounded-xl bg-bg-secondary border-2 border-primary/10 focus:border-primary focus:outline-none text-text transition-all text-lg"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FiX size={20} className="text-text-secondary" />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="mt-2 text-center">
          <p className="text-sm text-text-secondary">
            Pressione Enter para buscar ou clique no X para limpar
          </p>
        </div>
      )}
    </form>
  )
}

