'use client'

import Link from 'next/link'
import { FiPlay, FiShield, FiZap, FiUsers } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-bg-secondary border border-primary/20 mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-text-secondary">Mais de 100 jogos disponíveis</span>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Jogos Steam com
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mt-2">
              Preços Imbatíveis
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 animate-slide-up" style={{animationDelay: '0.1s'}}>
            Pacotes completos a partir de <span className="text-accent font-semibold">R$ 30</span> e jogos individuais por <span className="text-accent font-semibold">R$ 10</span>. 
            Entrega instantânea e suporte 24/7.
          </p>

          {/* Botão CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-scale-in" style={{animationDelay: '0.2s'}}>
            <Link
              href="/#catalogo"
              className="group px-8 py-4 bg-primary hover:bg-primary-hover rounded-lg font-semibold transition-all flex items-center space-x-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105"
            >
              <FiPlay className="group-hover:translate-x-1 transition-transform" />
              <span>Ver Catálogo</span>
            </Link>
            <a
              href="https://discord.gg/bX8BZEeZWy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-bg-tertiary hover:bg-bg-secondary rounded-lg font-semibold transition-all border border-primary/10 hover:border-primary/30"
            >
              Suporte Discord
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="p-6 rounded-xl bg-bg-secondary border border-primary/10 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-center mb-2">
                <FiUsers className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-text mb-1">50+</div>
              <div className="text-sm text-text-muted">Clientes Satisfeitos</div>
            </div>
            <div className="p-6 rounded-xl bg-bg-secondary border border-primary/10 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-center mb-2">
                <FiZap className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-text mb-1">100+</div>
              <div className="text-sm text-text-muted">Jogos Disponíveis</div>
            </div>
            <div className="p-6 rounded-xl bg-bg-secondary border border-primary/10 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-center mb-2">
                <FiShield className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-text mb-1">24/7</div>
              <div className="text-sm text-text-muted">Suporte Online</div>
            </div>
          </div>

          {/* Aviso importante sobre jogos offline/online */}
          <div className="mt-12 p-6 rounded-xl bg-warning/10 border border-warning/30 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-warning mb-1">Sobre Jogos Online</h3>
                <p className="text-sm text-text-secondary">
                  A maioria dos jogos são <strong>offline</strong>. Alguns jogos como Forza funcionam online. 
                  Jogos com verificação de licença (ex: GTA Online, COD) funcionam apenas no modo história.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

