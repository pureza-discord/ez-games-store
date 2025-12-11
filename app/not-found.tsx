import Link from 'next/link'
import { FiHome, FiShoppingBag } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-3xl font-bold text-text mb-4">Página Não Encontrada</h2>
          <p className="text-text-secondary text-lg mb-8">
            Ops! A página que você procura não existe ou foi removida.
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            href="/"
            className="btn-primary flex items-center space-x-2"
          >
            <FiHome size={20} />
            <span>Voltar ao Início</span>
          </Link>
          <Link 
            href="/#catalogo"
            className="btn-secondary flex items-center space-x-2"
          >
            <FiShoppingBag size={20} />
            <span>Ver Catálogo</span>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-bg-secondary rounded-xl border border-primary/10">
          <h3 className="font-bold text-text mb-3">Sugestões:</h3>
          <ul className="text-text-secondary text-sm space-y-2 text-left max-w-md mx-auto">
            <li>• Verifique se o endereço está correto</li>
            <li>• Use a busca para encontrar o que procura</li>
            <li>• Navegue pelo catálogo completo</li>
            <li>• Entre em contato conosco se precisar de ajuda</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

