const express = require('express')
const router = express.Router()
const paymentModel = require('./payments')
const verifyToken = require('../auth/verify')

// Lista los pagos.
router.get('/:client/client', verifyToken, async (req, res) => {
  try {
    const payments = await paymentModel
      .find({ client: req.params.client })
      .populate('service')
      .populate({ path: 'user', select: 'userName' })
    res.json(payments)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Optiene un pago en especifico.
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const payment = await paymentModel.findById(req.params.id)
    res.json(payment)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Crear Nuevo pago.
router.post('/', verifyToken, async (req, res) => {
  const create = require('./create')
  const payment = await create(req.body, req.userId)
  res.json(payment)
})

// Eliminar pago Existente.
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(500).send('Unauthorized request')
    } else {
      const payment = await paymentModel.findByIdAndDelete(req.params.id)
      if (!payment) res.status(500).send('No item found')
      return res.status(200).send()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

// Reporte de pagos diarios.
router.get('/report/payment-journal/:date', verifyToken, async (req, res) => {
  const report = require('./payment-journal')
  res.json(await report(req.params.date))
})

module.exports = router
