const express = require("express")
const {response} = express
const {checkRolAdmin, validate, verifyToken} = require("../middlewares")
const {check} = require("express-validator")
const {ServicePlanService} = require("./servicePlan.service")

const router = express.Router()
const servicePlanService = new ServicePlanService()

// http://<HOST>/api/service-plans
router.get("/", [
  verifyToken,
], getServicePlans)

// Lista de planes de servicio.
function getServicePlans(req, res = response) {
  const query = req.query.search || ""
  servicePlanService.getServicePlans(query.toUpperCase())
    .then(result => {
      res.json(result)
    }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/service-plans/:id
router.get("/:id", [verifyToken,], getServicePlan)

// obtener plan de servicio por ID.
function getServicePlan(req, res = response) {
  servicePlanService.getServicePlan(req.params.id)
    .then(result => {
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
  servicePlanService.createServicePlan(req.body)
    .then(result => {
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
  servicePlanService.updateServicePlan(req.params.id, req.body)
    .then(result => {
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
  servicePlanService.deleteServicePlan(req.params.id)
    .then(result => {
      res.json(result)
    }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/service-plans/:client/active
router.get("/:client/active", [verifyToken], getActiveServicePlan)

// Lista de planes de servicio activos de un cliente especifico.
function getActiveServicePlan(req, res = response) {
  servicePlanService.getServicePlansActive(req.params.client)
    .then(result => {
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

// Total, planes de servicio.
async function totalStatusServices(req, res = response) {
  const enabled = await servicePlanService.totalStatusServices(req.params.id, "HABILITADO")
  const suspended = await servicePlanService.totalStatusServices(req.params.id, "SUSPENDIDO")
  res.json({enabled, suspended})
}

// http://<HOST>/api/service-plans/:id/getServicesList
router.get("/:id/getServicesList", [
  verifyToken,
  check("id", "No es un ID válido").isMongoId(),
  validate
], getServicesList)

// Total, servicios por tarifa.
async function getServicesList(req, res = response) {
  servicePlanService.getServicesList(req.params.id)
    .then(result => {
      res.json(result)
    })
}

module.exports = {
  servicePlanRouter: router
}
