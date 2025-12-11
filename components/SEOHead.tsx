import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export default function SEOHead({ 
  title = 'Ez Games - Sua Loja Premium de Jogos',
  description = 'Compre os melhores jogos com os melhores preços. Mais de 100 jogos disponíveis. PIX e Cartão. Entrega imediata.',
  image = '/og-image.png',
  url = 'https://ezgames.com'
}: SEOHeadProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Ez Games" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#7c3aed" />
    </Head>
  )
}

