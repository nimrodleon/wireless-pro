const express = require('express')
const router = express.Router()
const servicePlanModel = require('./serviceplans')
const serviceModel = require('../services/services')
const verifyToken = require('../auth/verify')

router.get('/', verifyToken, async (req, res) => {
  try {
    let { search } = req.query
    if (!search) search = ''
    const servicePlans = await servicePlanModel.find({
      $or: [{ name: { $regex: search } }]
    }).sort({ 'name': 1 })
    res.json(servicePlans)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const servicePlan = await servicePlanModel.findById(req.params.id)
    res.json(servicePlan)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Cantidad de Servicios de la Tarifa.
router.get('/:id/count/services', verifyToken, async (req, res) => {
  try {
    const count = await serviceModel.find({ servicePlan: req.params.id }).countDocuments()
    res.json({ count })
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const servicePlan = new servicePlanModel(req.body)
    await servicePlan.save()
    res.json(servicePlan)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const servicePlan = await servicePlanModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await servicePlan.save()
    res.json(servicePlan)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(500).send('Unauthorized request')
    } else {
      const servicePlan = await servicePlanModel.findByIdAndDelete(req.params.id)
      if (!servicePlan) res.status(500).send("No item found")
      return res.status(200).send()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

//# Lista de Planes de servicios activos de un cliente en especifico.
router.get('/:client/active', verifyToken, async (req, res) => {
  try {
    const services = await serviceModel.find({ client: req.params.client })
    let servicePlanIds = []
    for (let i = 0; i < services.length; i++) {
      servicePlanIds.push(services[i].servicePlan)
    }
    const servicePlans = await servicePlanModel.find({ _id: { $in: servicePlanIds } })
    res.json(servicePlans)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
