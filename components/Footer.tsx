import { SiDiscord } from 'react-icons/si'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-primary/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo size={40} showText={false} />
              <h3 className="text-2xl font-bold gradient-text mt-2">Ez Games</h3>
            </div>
            <p className="text-text-secondary max-w-md leading-relaxed text-sm mb-6">
              Jogos premium Steam com os melhores preços. Mais de 100 jogos disponíveis com entrega instantânea e suporte 24/7.
            </p>
            <a 
              href="https://discord.gg/bX8BZEeZWy" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] transition-all font-semibold shadow-lg"
            >
              <SiDiscord size={20} />
              <span>Entrar no Discord</span>
            </a>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 text-text">Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Início
                </a>
              </li>
              <li>
                <a href="/#catalogo" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/sobre" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/carrinho" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Carrinho
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 text-text">Suporte</h4>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Atendimento 24/7 via Discord
            </p>
            <a 
              href="https://discord.gg/bX8BZEeZWy" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-bg-tertiary hover:bg-primary/10 border border-primary/10 hover:border-primary/30 transition-all text-sm font-medium"
            >
              <SiDiscord size={16} />
              <span>Abrir Ticket</span>
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-muted text-sm">
              &copy; {new Date().getFullYear()} <span className="text-text font-semibold">Ez Games</span>. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-text-muted hover:text-primary transition-colors">Privacidade</a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors">Termos</a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
