require('dotenv').config()
const express = require('express')
const cors = require('cors')
const paymentRoutes = require('./routes/payment')
const orderRoutes = require('./routes/order')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/payment', paymentRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Ez Games API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

