'use client'

import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import { products } from '@/data/products'
import GuideIcon from '@/components/icons/GuideIcon'
import SupportIcon from '@/components/icons/SupportIcon'

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        <ProductGrid products={products} />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-bg-secondary rounded-xl p-8 border border-primary/10 hover:border-primary/20 transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GuideIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text">Como Funciona?</h3>
            </div>
            <div className="space-y-4">
              {[
                'Escolha seus jogos no catálogo',
                'Adicione ao carrinho e finalize',
                'Pague via PIX (confirmação automática)',
                'Receba as instruções de instalação'
              ].map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-text-secondary">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg-secondary rounded-xl p-8 border border-primary/10 hover:border-primary/20 transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <SupportIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-text">Suporte Personalizado</h3>
            </div>
            <p className="text-text-secondary mb-6">
              Precisa de uma <strong className="text-text">combinação específica</strong> ou um jogo que não está listado? 
              Nossa equipe está pronta para ajudar!
            </p>
            <a 
              href="https://discord.gg/bX8BZEeZWy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center block"
            >
              Abrir Ticket no Discord
            </a>
            <p className="text-xs text-text-muted text-center mt-4">
              Resposta em minutos • Suporte 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

