const express = require("express")
const {response} = express
const {verifyToken} = require("../middlewares")
const {WorkerController, MikrotikApiService} = require("./mikrotikApi.service")
const {WorkerActivityService} = require("./workerActivity.service")

const router = express.Router()
const mikrotikApiService = new MikrotikApiService()
const workerActivityService = new WorkerActivityService()

// http://<HOST>/api/bitWorker/:id/changeStatusService/:status
router.get("/:id/changeStatusService/:status", [verifyToken], changeStatusService)

// Cambiar plan de servicio.
function changeStatusService(req, res = response) {
  mikrotikApiService.changeStatusService(req.params.id, req.params.status)
    .then(({data}) => {
      res.json(data)
    })
}

// http://<HOST>/api/bitWorker/:id/changeServicePlan/:servicePlanId
router.get("/:id/changeServicePlan/:servicePlanId", [verifyToken], changeServicePlan)

// Cambiar plan de servicio.
function changeServicePlan(req, res = response) {
  mikrotikApiService.changeServicePlan(req.params.id, req.params.servicePlanId)
    .then(({data}) => {
      res.json(data)
    })
}

// http://<HOST>/api/bitWorker/:id/addService
router.get("/:id/addService", [verifyToken], addService)

// registrar servicio.
function addService(req, res = response) {
  mikrotikApiService.addService(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/updateService
router.get("/:id/updateService", [verifyToken], updateService)

// actualizar servicio.
function updateService(req, res = response) {
  mikrotikApiService.updateService(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/deleteService
router.get("/:id/deleteService", [verifyToken], deleteService)

// borrar servicio.
function deleteService(req, res = response) {
  mikrotikApiService.deleteService(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// ====================================================================================================

// http://<HOST>/api/bitWorker/:id/getWorkerActivities/:year
router.get("/:id/getWorkerActivities/:year", [verifyToken], getWorkerActivities)

// cargar lista de estado de cambios.
function getWorkerActivities(req, res = response) {
  const {id, year} = req.params
  workerActivityService.getWorkerActivities(id, year).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/bitWorker/createWorkerActivity
router.post("/createWorkerActivity", [verifyToken], createWorkerActivity)

// registrar estado de cambio.
function createWorkerActivity(req, res = response) {
  const user = req.currentUser.fullName
  workerActivityService.createWorkerActivity(req.body, user).then(result => {
    res.json(result)
  })
}

module.exports = {
  bitWorkerRouter: router
}
