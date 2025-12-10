const express = require('express')
const router = express.Router()

const orders = []

router.post('/', (req, res) => {
  try {
    const { items, total, paymentMethod, customerInfo } = req.body

    if (!items || !total || !paymentMethod) {
      return res.status(400).json({ error: 'Dados do pedido incompletos' })
    }

    const order = {
      id: `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      items,
      total,
      paymentMethod,
      customerInfo: customerInfo || {},
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    orders.push(order)

    res.status(201).json({
      success: true,
      order
    })
  } catch (error) {
    console.error('Erro ao criar pedido:', error)
    res.status(500).json({ error: 'Erro ao criar pedido' })
  }
})

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id)
  
  if (!order) {
    return res.status(404).json({ error: 'Pedido não encontrado' })
  }

  res.json(order)
})

router.get('/', (req, res) => {
  res.json(orders)
})

module.exports = router

