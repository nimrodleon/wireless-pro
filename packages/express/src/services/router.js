const express = require('express')
const router = express.Router()
const serviceModel = require('../services/services')
const verifyToken = require('../auth/verify')

router.get('/:client/client', verifyToken, async (req, res) => {
  try {
    const services = await serviceModel.find({ client: req.params.client })
      .populate('servicePlan')
    res.json(services)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.id)
    res.json(service)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Cantidad de Pagos x Servicio.
router.get('/:id/payments/count', verifyToken, async (req, res) => {
  try {
    const Payment = require('../payments/payments')
    const count = await Payment.find({ service: req.params.id }).countDocuments()
    res.json(count)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const service = new serviceModel(req.body)
    service.user = req.userId
    await service.save()
    res.json(service)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const service = await serviceModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await service.save()
    res.json(service)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(500).send('Unauthorized request')
    } else {
      const service = await serviceModel.findByIdAndDelete(req.params.id)
      if (!service) res.status(500).send('No item found')
      return res.status(200).send()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

// Instalaciónes Diarias.
router.get('/report/daily/:date', verifyToken, async (req, res) => {
  const report = require('./daily')
  res.json(await report(req.params.date))
})

module.exports = router
