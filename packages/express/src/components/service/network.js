import express from 'express'
import * as controller from './controller'
import verifyToken from '../auth/verifyToken'

const router = express.Router()

// Lista de servicio.
router.get('/:client/client', verifyToken, async (req, res) => {
  controller.getServices(req.params.client).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// obtener servicio por id.
router.get('/:id', verifyToken, async (req, res) => {
  controller.getService(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// cantidad de pagos x servicio.
router.get('/:id/payments/count', verifyToken, async (req, res) => {
  res.json(0)
})

// registrar servicio.
router.post('/', verifyToken, async (req, res) => {
  controller.createService(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar servicio.
router.patch('/:id', verifyToken, async (req, res) => {
  controller.updateService(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar servicio.
router.delete('/:id', verifyToken, async (req, res) => {
  controller.deleteService(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// instalaciones diarias.
router.get('/report/daily/:date', verifyToken, async (req, res) => {
  controller.reportDailyInstallations(req.params.date).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
