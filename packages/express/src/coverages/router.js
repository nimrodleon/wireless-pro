const express = require('express')
const router = express.Router()
const Coverage = require('./coverages')
const verifyToken = require('../auth/verify')

// Listar las Areas de Covertura.
router.get('/', verifyToken, async (req, res) => {
  try {
    let { search } = req.query
    if (!search) search = ''
    const coverageList = await Coverage.find({
      $or: [{ name: { $regex: search } }]
    }).sort({ 'name': 1 })
    res.json(coverageList)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Optener la Area de Covertura por Id.
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const coverage = await Coverage.findById(req.params.id)
    res.json(coverage)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Cantidad de Clientes del area Cobertura.
router.get('/:id/count/client', verifyToken, async (req, res) => {
  try {
    const Client = require('../clients/clients')
    const count = await Client.find({ coverage: req.params.id }).countDocuments()
    res.json({ count })
  } catch (err) {
    res.status(500).send(err)
  }
})

// Crear Nueva Area de Covertura.
router.post('/', verifyToken, async (req, res) => {
  try {
    const coverage = new Coverage(req.body)
    await coverage.save()
    res.json(coverage)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Actualizar Area de Covertura por Id.
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const coverage = await Coverage.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await coverage.save()
    res.json(coverage)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Eliminar Area de Covertura por Id.
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(500).send('Unauthorized request')
    } else {
      const coverage = await Coverage.findByIdAndDelete(req.params.id)
      if (!coverage) return res.status(500).send('No item found')
      return res.status(200).send()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
