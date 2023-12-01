const express = require("express")
const {response} = express
const {checkRolAdmin, validate, verifyToken} = require("../middlewares")
const {ServicePlanController} = require("./controller")
const {check} = require("express-validator")

const router = express.Router()

// http://<HOST>/api/service-plans
router.get("/", [
  verifyToken,
], getServicePlans)

// Lista de planes de servicio.
function getServicePlans(req, res = response) {
  let query = req.query.search || ""
  ServicePlanController.getServicePlans(query.toUpperCase()).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/service-plans/:id
router.get("/:id", [verifyToken,], getServicePlan)

// obtener plan de servicio por id.
function getServicePlan(req, res = response) {
  ServicePlanController.getServicePlan(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/service-plans
router.post("/", [
  verifyToken,
  checkRolAdmin,
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("priceMonthly", "Precio es obligatorio").not().isEmpty(),
  check("downloadSpeed", "Velocidad de descarga es obligatorio").not().isEmpty(),
  check("uploadSpeed", "Velocidad de subida es obligatorio").not().isEmpty(),
  validate
], addServicePlan)

// registrar plan de servicio.
function addServicePlan(req, res = response) {
  ServicePlanController.createServicePlan(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/service-plans/:id
router.patch("/:id", [
  verifyToken,
  checkRolAdmin,
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("priceMonthly", "Precio es obligatorio").not().isEmpty(),
  check("downloadSpeed", "Velocidad de descarga es obligatorio").not().isEmpty(),
  check("uploadSpeed", "Velocidad de subida es obligatorio").not().isEmpty(),
  validate
], updateServicePlan)

// actualizar plan de servicio.
function updateServicePlan(req, res = response) {
  ServicePlanController.updateServicePlan(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/service-plans/:id
router.delete("/:id", [
  verifyToken,
  checkRolAdmin
], deleteServicePlan)

// borrar plan de servicio.
function deleteServicePlan(req, res = response) {
  ServicePlanController.deleteServicePlan(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/service-plans/:client/active
router.get("/:client/active", [verifyToken], getActiveServicePlan)

// Lista de planes de servicio activos de un cliente especifico.
function getActiveServicePlan(req, res = response) {
  ServicePlanController.getServicePlansActive(req.params.client).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// ============================================================

// http://<HOST>/api/service-plans/:id/totalStatusServices
router.get("/:id/totalStatusServices", [
  verifyToken,
  check("id", "No es un ID válido").isMongoId(),
  validate
], totalStatusServices)

// total planes de servicio.
async function totalStatusServices(req, res = response) {
  const enabled = await ServicePlanController.totalEnabledServices(req.params.id)
  const suspended = await ServicePlanController.totalSuspendedServices(req.params.id)
  res.json({enabled, suspended})
}

// http://<HOST>/api/service-plans/:id/getServicesList
router.get("/:id/getServicesList", [
  verifyToken,
  check("id", "No es un ID válido").isMongoId(),
  validate
], getServicesList)

// total servicios por tarifa.
async function getServicesList(req, res = response) {
  ServicePlanController.getServicesList(req.params.id).then(result => {
    res.json(result)
  })
}

module.exports = {
  servicePlanRouter: router
}
