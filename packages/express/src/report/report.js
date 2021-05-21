const express = require('express')
const router = express.Router()
const verifyToken = require('../auth/verify')

// Using Models.
const ClientModel = require('../clients/clients')
const ServiceModel = require('../services/services')

// tools.
const _ = require('lodash')

// Lista de Clientes Activos.
router.get('/active-clients', verifyToken, async (req, res) => {
  try {
    const clientsActive = await ClientModel.find({is_active: true})
    res.json(clientsActive)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Lista de Clientes Archivados.
router.get('/clients-disconnected', verifyToken, async (req, res) => {
  try {
    const clientsDisconnected = await ClientModel.find({is_active: false})
    res.json(clientsDisconnected)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Numero de Clientes Activos.
router.get('/number-of-active-clients', verifyToken, async (req, res) => {
  try {
    const numClientsActive = await ClientModel.find({is_active: true}).countDocuments()
    res.json({quantity: numClientsActive})
  } catch (err) {
    res.status(500).send(err)
  }
})

// Numero de Clientes Archivados.
router.get('/number-of-clients-disconnected', verifyToken, async (req, res) => {
  try {
    const numClientsActive = await ClientModel.find({is_active: false}).countDocuments()
    res.json({quantity: numClientsActive})
  } catch (err) {
    res.status(500).send(err)
  }
})

// Lista de servicios sin registro de pago.
router.get('/services-without-payment', verifyToken, async (req, res) => {
  try {
    const services = await ServiceModel.find({isActive: true, payment: {$exists: false}})
      .populate({path: 'client', select: 'fullName is_active', match: {'is_active': true}})
    res.json(services)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Lista de Servicios Suspendidos.
router.get('/disconnected-services', verifyToken, async (req, res) => {
  try {
    const disconnectedServices = await ServiceModel.find({isActive: false})
      .populate({path: 'client', select: 'fullName'})
      .populate({path: 'servicePlan', select: 'name priceMonthly'})
    res.json(disconnectedServices)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Lista de Servicios según Tarifa.
router.get('/customers-by-service-plan/:id', verifyToken, async (req, res) => {
  try {
    const services = await ServiceModel.find({isActive: true, servicePlan: req.params.id})
      .populate({path: 'client', select: 'fullName'}).populate('servicePlan')
    res.json(services)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Lista de Clientes por Cobrar.
router.get('/receivables/:date', verifyToken, async (req, res) => {
  try {
    const services = await ServiceModel.find({
      isActive: true, payment: {$exists: true}
    }).select('ipAddress isActive')
      .populate({
        path: 'payment', select: 'payUp',
        match: {payUp: {$lt: req.params.date}}
      }).populate({path: 'client', select: 'fullName'})
    let servicesArr = []
    _.forEach(services, data => {
      if (data.payment) servicesArr.push(data)
    })
    res.json(servicesArr)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
