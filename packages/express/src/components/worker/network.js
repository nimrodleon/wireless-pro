import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {WorkerController} from './controller'

const router = express.Router()

// http://<HOST>/api/bitWorker/:id/enableService
router.get('/:id/enableService', [verifyToken], enableService)

// Habilitar servicio.
function enableService(req, res = response) {
  WorkerController.enableService(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/suspendService
router.get('/:id/suspendService', [verifyToken], suspendService)

// Suspender servicio.
function suspendService(req, res = response) {
  WorkerController.suspendService(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/changeServicePlan/:servicePlanId
router.get('/:id/changeServicePlan/:servicePlanId', [verifyToken], changeServicePlan)

// Cambiar plan de servicio.
function changeServicePlan(req, res = response) {
  WorkerController.changeServicePlan(req.params.id, req.params.servicePlanId)
    .then(({data}) => {
      res.json(data)
    })
}

// http://<HOST>/api/bitWorker/:id/addService
router.get('/:id/addService', [verifyToken], addService)

// registrar servicio.
function addService(req, res = response) {
  WorkerController.addService(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/updateService
router.get('/:id/updateService', [verifyToken], updateService)

// actualizar servicio.
function updateService(req, res = response) {
  WorkerController.updateService(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/deleteService
router.get('/:id/deleteService', [verifyToken], deleteService)

// borrar servicio.
function deleteService(req, res = response) {
  WorkerController.deleteService(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// ====================================================================================================

// http://<HOST>/api/bitWorker/:id/getWorkerActivities/:year
router.get('/:id/getWorkerActivities/:year', [verifyToken], getWorkerActivities)

// cargar lista de estado de cambios.
function getWorkerActivities(req, res = response) {
  let {id, year} = req.params
  WorkerController.getWorkerActivities(id, year).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/bitWorker/createWorkerActivity
router.post('/createWorkerActivity', [verifyToken], createWorkerActivity)

// registrar estado de cambio.
function createWorkerActivity(req, res = response) {
  let user = req.currentUser.fullName
  WorkerController.createWorkerActivity(req.body, user).then(result => {
    res.json(result)
  })
}

export const bitWorkerRouter = router
