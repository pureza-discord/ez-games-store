'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'
import { SiDiscord } from 'react-icons/si'
import { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const itemCount = useCartStore((state) => state.items.length)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo size={40} showText={true} />
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-bg-tertiary transition-all font-medium"
            >
              Início
            </Link>
            <Link 
              href="/#catalogo" 
              className="px-4 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-bg-tertiary transition-all font-medium"
            >
              Catálogo
            </Link>
            <Link 
              href="/sobre" 
              className="px-4 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-bg-tertiary transition-all font-medium"
            >
              Sobre
            </Link>
            <a
              href="https://discord.gg/bX8BZEeZWy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 ml-2 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] transition-all font-medium"
            >
              <SiDiscord size={16} />
              <span>Discord</span>
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Link 
              href="/carrinho" 
              className="relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover transition-all font-semibold group"
            >
              <FiShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Carrinho</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-bg">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-bg-tertiary hover:bg-bg-secondary transition-all"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-primary/10 space-y-2 animate-fade-in">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg bg-bg-tertiary hover:bg-bg-secondary transition-all font-medium"
            >
              Início
            </Link>
            <Link 
              href="/#catalogo" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg bg-bg-tertiary hover:bg-bg-secondary transition-all font-medium"
            >
              Catálogo
            </Link>
            <Link 
              href="/sobre" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg bg-bg-tertiary hover:bg-bg-secondary transition-all font-medium"
            >
              Sobre
            </Link>
            <a
              href="https://discord.gg/bX8BZEeZWy"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] transition-all font-medium"
            >
              <SiDiscord size={18} />
              <span>Entrar no Discord</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

