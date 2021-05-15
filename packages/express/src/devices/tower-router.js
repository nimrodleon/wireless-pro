const express = require('express'),
  router = express.Router()
// Local Imports.
const verifyToken = require('../auth/verify'),
  Tower = require('./tower'),
  Coverage = require('../coverages/coverages'),
  Device = require('./device')

router.get('/', verifyToken, async (req, res) => {
  try {
    const search = req.query.search || ''
    const towers = await Tower.find({
      tower: {
        $regex: search
      }
    }).populate('coverage')
    res.json(towers)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const tower = await Tower.findById(req.params.id)
    res.json(tower)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Areas covertura.
router.get('/coverages/all', verifyToken, async (req, res) => {
  try {
    const ids = await Tower.find().distinct('coverage')
    const coverages = await Coverage.find({ _id: { $in: ids } })
    res.json(coverages)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Todas las Torres.
router.get('/v1/all', verifyToken, async (req, res) => {
  try {
    const towers = await Tower.find({})
    res.json(towers)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Total de equipos para la torre {id}.
router.get('/:id/count', verifyToken, async (req, res) => {
  try {
    const count = await Device.find({ tower: req.params.id }).countDocuments()
    res.json(count)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const tower = new Tower(req.body)
    await tower.save();
    res.json(tower)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const tower = await Tower.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await tower.save()
    res.json(tower)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const tower = await Tower.findByIdAndDelete(req.params.id)
    if (!tower) res.status(500).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
