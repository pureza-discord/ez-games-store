import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ToastContainer from '@/components/ToastContainer'

export const metadata: Metadata = {
  title: 'Ez Games - Sua Loja de Jogos Premium',
  description: 'Compre os melhores jogos com os melhores preços. Pacotes e jogos individuais disponíveis.',
  keywords: 'jogos, games, comprar jogos, pacotes de jogos, ez games',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  )
}

