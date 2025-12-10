'use client'

import Link from 'next/link'
import PackageIcon from '@/components/icons/PackageIcon'
import ZapIcon from '@/components/icons/ZapIcon'
import Shield24Icon from '@/components/icons/Shield24Icon'
import Support24Icon from '@/components/icons/Support24Icon'
import DollarIcon from '@/components/icons/DollarIcon'
import StarIcon from '@/components/icons/StarIcon'
import CreditCardIconWhite from '@/components/icons/CreditCardIconWhite'
import PixIconWhite from '@/components/icons/PixIconWhite'

export default function AboutPage() {
  const features = [
    {
      icon: <PackageIcon className="w-8 h-8 text-primary" />,
      title: 'Pacotes Completos',
      description: 'Pacotes de jogos a partir de R$ 30,00 com até 70% de economia'
    },
    {
      icon: <ZapIcon className="w-8 h-8 text-primary" />,
      title: 'Instalação Rápida',
      description: 'Instalação instantânea via Steam, sem complicações'
    },
    {
      icon: <Shield24Icon className="w-8 h-8 text-primary" />,
      title: 'Pagamento Seguro',
      description: 'PIX e cartão com tokenização segura'
    },
    {
      icon: <Support24Icon className="w-8 h-8 text-primary" />,
      title: 'Suporte 24/7',
      description: 'Atendimento personalizado sempre que precisar'
    },
    {
      icon: <DollarIcon className="w-8 h-8 text-primary" />,
      title: 'Melhores Preços',
      description: 'Jogos individuais de R$ 10,00 a R$ 15,00'
    },
    {
      icon: <StarIcon className="w-8 h-8 text-primary" />,
      title: 'Qualidade Premium',
      description: 'Mais de 100 jogos selecionados'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        
        <h1 className="text-6xl font-black mb-8">
          <span className="gradient-text block mb-2">Ez Games</span>
          <span className="text-3xl text-gray-300">Sua Loja Premium de Jogos</span>
        </h1>
        
        <p className="text-xl text-gray-300 leading-relaxed">
          A <strong className="gradient-text">Ez Games</strong> é uma loja especializada em oferecer os melhores jogos 
          com os melhores preços do mercado. Nossa missão é proporcionar uma experiência 
          de compra simples, segura e acessível para todos os gamers.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-effect rounded-2xl p-8 card-hover"
          >
            <div className="text-primary-pink mb-4 glow-effect">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* O Que Oferecemos */}
      <div className="glass-effect rounded-3xl p-12 mb-16">
        <h2 className="text-4xl font-bold mb-8 gradient-text text-center">
          O Que Oferecemos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-pink to-primary-purple flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Pacotes Completos</h3>
                <p className="text-gray-400">
                  Coleções completas de suas franquias favoritas por <strong className="text-white">R$ 60,00</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-pink to-primary-purple flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Pacotes Menores</h3>
                <p className="text-gray-400">
                  Combos com 2-4 jogos por apenas <strong className="text-white">R$ 30,00</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-pink to-primary-purple flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Jogos Individuais</h3>
                <p className="text-gray-400">
                  Títulos avulsos de <strong className="text-white">R$ 10,00 a R$ 15,00</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-blue to-secondary-cyan flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Seleções Personalizadas</h3>
                <p className="text-gray-400">
                  Monte seu próprio pacote sob medida via suporte
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-blue to-secondary-cyan flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Instalação Rápida</h3>
                <p className="text-gray-400">
                  Instalação instantânea via Steam após a compra
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-blue to-secondary-cyan flex items-center justify-center font-bold">
                6
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Suporte Dedicado</h3>
                <p className="text-gray-400">
                  Atendimento especializado 24/7 via Discord
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formas de Pagamento */}
      <div className="glass-effect rounded-3xl p-12 mb-16">
        <h2 className="text-4xl font-bold mb-8 gradient-text text-center">
          Formas de Pagamento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-effect-pink rounded-2xl p-8">
            <div className="w-16 h-16 mb-4 flex items-center justify-center">
              <CreditCardIconWhite className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Cartão de Crédito/Débito</h3>
            <p className="text-gray-300 leading-relaxed">
              Aceitamos os principais cartões com <strong>tokenização segura</strong>. 
              Seus dados nunca são armazenados em nossos servidores.
            </p>
          </div>
          <div className="glass-effect-pink rounded-2xl p-8">
            <div className="w-16 h-16 mb-4 flex items-center justify-center">
              <PixIconWhite className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">PIX</h3>
            <p className="text-gray-300 leading-relaxed">
              Pagamento instantâneo via PIX para <strong>aprovação imediata</strong>. 
              Receba seus jogos em minutos!
            </p>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="text-center glass-effect rounded-3xl p-12">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Explore nosso catálogo com mais de 100 jogos e encontre suas franquias favoritas 
          com os melhores preços do mercado!
        </p>
        <Link
          href="/"
          className="inline-block btn-primary px-8 py-4 rounded-xl font-bold text-lg"
        >
          Ver Catálogo Completo
        </Link>
      </div>
    </div>
  )
}
