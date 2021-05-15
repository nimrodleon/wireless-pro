const express = require('express'),
  router = express.Router()
// Variables locales.
const _ = require('lodash')
const verifyToken = require('../auth/verify')
const Device = require('./device')

router.get('/:id/:type', verifyToken, async (req, res) => {
  try {
    let devices = new Object()
    if (req.params.type == 'T0') {
      devices = await Device.find({ tramo: req.params.id })
    } else {
      devices = await Device.find({ tower: req.params.id })
    }
    res.json(devices)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const device = await Device.findById(req.params.id)
    res.json(device)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Buscador para select2.
router.get('/v1/select2/:q?', async (req, res) => {
  try {
    const term = req.query.term || ''
    const devices = await Device.find({
      mode: 'P', $or: [
        { ipAddress: { $regex: term } },
        { name: { $regex: term } }
      ]
    }).limit(10)
    const data = new Object()
    data.results = []
    _.forEach(devices, (value) => {
      data.results.push({ id: value._id, text: value.name + ' - ' + value.ipAddress })
    })
    res.json(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const device = new Device(req.body)
    await device.save()
    res.json(device)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await device.save()
    res.json(device)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id)
    if (!device) res.status(500).send("No item found")
    res.status(200).send()
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
