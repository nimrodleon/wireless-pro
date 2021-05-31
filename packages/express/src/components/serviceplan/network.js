import express from 'express'
import * as controller from './controller'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

// Lista de planes de servicio.
router.get('/', verifyToken, async (req, res) => {
  let query = req.query.search || ''
  controller.getServicePlans(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// obtener plan de servicio por id.
router.get('/:id', verifyToken, async (req, res) => {
  controller.getServicePlan(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// cantidad de planes de servicio.
router.get('/:id/count/services', verifyToken, async (req, res) => {
  res.json(0)
})

// registrar plan de servicio.
router.post('/', verifyToken, async (req, res) => {
  controller.createServicePlan(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar plan de servicio.
router.patch('/:id', verifyToken, async (req, res) => {
  controller.updateServicePlan(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar plan de servicio.
router.delete('/:id', verifyToken, async (req, res) => {
  controller.deleteServicePlan(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// Lista de planes de servicio activos de un cliente especifico.
router.get('/:client/active', verifyToken, async (req, res) => {
  controller.getServicePlansActive(req.params.client).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
