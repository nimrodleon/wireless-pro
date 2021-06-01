import express, {response} from 'express'
import verifyToken from '../middlewares/verifyToken'
import {ServicePlanController} from './controller'

const router = express.Router()

// http://<HOST>/api/service-plans
router.get('/', [verifyToken], getServicePlans)

// Lista de planes de servicio.
function getServicePlans(req, res = response) {
  let query = req.query.search || ''
  ServicePlanController.getServicePlans(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/service-plans/:id
router.get('/:id', [verifyToken], getServicePlan)

// obtener plan de servicio por id.
function getServicePlan(req, res = response) {
  ServicePlanController.getServicePlan(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/service-plans
router.post('/', [verifyToken], addServicePlan)

// registrar plan de servicio.
function addServicePlan(req, res = response) {
  ServicePlanController.createServicePlan(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/service-plans/:id
router.patch('/:id', [verifyToken], updateServicePlan)

// actualizar plan de servicio.
function updateServicePlan(req, res = response) {
  ServicePlanController.updateServicePlan(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/service-plans/:id
router.delete('/:id', verifyToken, deleteServicePlan)

// borrar plan de servicio.
function deleteServicePlan(req, res = response) {
  ServicePlanController.deleteServicePlan(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/service-plans/:client/active
router.get('/:client/active', [verifyToken], getActiveServicePlan)

// Lista de planes de servicio activos de un cliente especifico.
function getActiveServicePlan(req, res = response) {
  ServicePlanController.getServicePlansActive(req.params.client).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const servicePlanRouter = router
