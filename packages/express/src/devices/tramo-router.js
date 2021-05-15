const express = require('express'),
  router = express.Router()
// Local imports.
const verifyToken = require('../auth/verify'),
  Tramo = require('./tramo'),
  Coverage = require('../coverages/coverages'),
  Device = require('./device')

router.get('/', verifyToken, async (req, res) => {
  try {
    const search = req.query.search || ''
    const tramos = await Tramo.find({ tramo: { $regex: search } })
      .populate('coverage')
    res.json(tramos)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const tramo = await Tramo.findById(req.params.id)
    res.json(tramo)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Todos los Tramos.
router.get('/v1/all', verifyToken, async (req, res) => {
  try {
    const tramos = await Tramo.find({})
    res.json(tramos)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Total de equipos para el tramo {id}.
router.get('/:id/count', verifyToken, async (req, res) => {
  try {
    const count = await Device.find({ tramo: req.params.id }).countDocuments()
    res.json(count)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Test Coverages uniq.
router.get('/coverages/uniq', verifyToken, async (req, res) => {
  try {
    const coverages = await Tramo.find().distinct('coverage')
    res.json(coverages)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Areas coverturas.
router.get('/coverages/all', verifyToken, async (req, res) => {
  try {
    const ids = await Tramo.find().distinct('coverage')
    const coverages = await Coverage.find({ _id: { $in: ids } })
    res.json(coverages)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const tramo = new Tramo(req.body)
    await tramo.save()
    res.json(tramo)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const tramo = await Tramo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await tramo.save()
    res.json(tramo)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const tramo = await Tramo.findByIdAndDelete(req.params.id)
    if (!tramo) res.status(500).send("No item found")
    res.status(200).send()
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
