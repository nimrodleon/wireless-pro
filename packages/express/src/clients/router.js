const express = require('express')
const router = express.Router()

// Model and Token auth.
const _ = require('lodash'),
  Client = require('./clients'),
  verifyToken = require('../auth/verify')

// Devuelve un Listado de Clientes.
router.get('/', verifyToken, async (req, res) => {
  try {
    let {status, search} = req.query
    // Normalización de datos.
    if (!search) search = ''
    status = status == 'true' ? true : false
    // Cantidad de Documentos de la Consulta.
    const tquery = await Client.find({
      is_active: status, $or: [{dni: {$regex: search}}, {fullName: {$regex: search}}]
    }).countDocuments()
    // Variables de Pagínación.
    let perPage = 50
    let page = req.query.page || 0
    let nPages = parseInt(tquery / perPage, 10)
    // Consulta de Clientes.
    const clients = await Client.find({
      is_active: status, $or: [{dni: {$regex: search}}, {fullName: {$regex: search}}]
    }).populate('coverage').skip(perPage * page).limit(perPage).sort({'fullName': 1})
    res.json({data: clients, nPages: nPages, page: page})
  } catch (err) {
    res.status(500).send(err)
  }
})

// Buscador para select2.
router.get('/select2/:q?', async (req, res) => {
  const term = req.query.term || ''
  const clients = await Client.find({
    $or: [
      {dni: {$regex: term}},
      {fullName: {$regex: term}}
    ]
  }).limit(10)
  const data = {}
  data.results = []
  _.forEach(clients, (value) => {
    data.results.push({id: value._id, text: value.fullName})
  })
  res.json(data)
})

// Obtiene  un Cliente por Id.
router.get('/:id', verifyToken, async (req, res) => {
  const client = await Client.findById(req.params.id)
  try {
    res.json(client)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Crea un nuevo Cliente.
router.post('/', verifyToken, async (req, res) => {
  const client = new Client(req.body)
  try {
    await client.save()
    res.json(client)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Actualiza el registro del Cliente.
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true})
    await client.save()
    res.json(client)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Borra el registro del Cliente y dependencias.
const Service = require('../services/services')
const Payment = require('../payments/payments')
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(500).send('Unauthorized request')
    } else {
      const payments = await Payment.find({client: req.params.id})
      payments.forEach(async (item) => await Payment.findByIdAndDelete(item._id))

      const services = await Service.find({client: req.params.id})
      services.forEach(async (item) => await Service.findByIdAndDelete(item._id))

      const client = await Client.findByIdAndDelete(req.params.id)
      if (!client) res.status(404).send('No item found')
      return res.status(200).send()
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
