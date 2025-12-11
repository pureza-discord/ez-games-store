const express = require('express')
const router = express.Router()

// Importar produtos (em produção viria do banco de dados)
// Como não temos acesso direto ao TypeScript aqui, vamos criar uma versão simplificada
const products = [
  {
    id: 'souls-complete',
    name: 'SoulsLike Complete',
    price: 60.00,
    type: 'pack',
    category: 'RPG',
    description: 'Coleção completa de SoulsLike: Dark Souls I, II, III, Elden Ring e Sekiro',
    popular: true
  },
  {
    id: 'resident-evil',
    name: 'Resident Evil Complete',
    price: 30.00,
    type: 'pack',
    category: 'Terror',
    description: 'Saga completa: RE 0, 1, 2, 3, 4, 5, 6, 7, 8 + Remakes',
    popular: true
  },
  {
    id: 'gta-collection',
    name: 'GTA Collection',
    price: 30.00,
    type: 'pack',
    category: 'Ação',
    description: 'Saga Grand Theft Auto: III, Vice City, San Andreas, IV, V (Modo história)',
    popular: true
  },
  {
    id: 'witcher',
    name: 'The Witcher Complete',
    price: 30.00,
    type: 'pack',
    category: 'RPG',
    description: 'Trilogia completa: The Witcher 1, 2 e 3',
    popular: true
  },
  {
    id: 'god-of-war',
    name: 'God of War Saga',
    price: 30.00,
    type: 'pack',
    category: 'Ação',
    description: 'GOW 1, 2, 3, Ascension, GOW 2018, Ragnarök',
    popular: true
  },
  {
    id: 'indie-pack',
    name: 'Mega Pack Indie',
    price: 50.00,
    type: 'pack',
    category: 'Indie',
    description: 'Os melhores indies: Celeste, Dead Cells, Disco Elysium, Hades I e II, Hollow Knight, Ori',
    popular: true
  },
  {
    id: 'final-fantasy',
    name: 'Final Fantasy Ultimate',
    price: 40.00,
    type: 'pack',
    category: 'RPG',
    description: 'FF VII Remake, VIII, IX, X/X-2, XII, XIII, XV'
  },
  {
    id: 'spider-man',
    name: 'Spider-Man Bundle',
    price: 30.00,
    type: 'pack',
    category: 'Ação',
    description: 'Spider-Man Remastered + Miles Morales Ultimate',
    popular: true
  }
]

router.get('/', (req, res) => {
  const { type, category } = req.query
  
  let filteredProducts = products
  
  if (type) {
    filteredProducts = filteredProducts.filter(p => p.type === type)
  }
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }
  
  res.json(filteredProducts)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(p => p.id === id)
  
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' })
  }
  
  res.json(product)
})

module.exports = router

