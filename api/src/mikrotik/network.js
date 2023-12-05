const express = require("express")
const {response} = express
const {check} = require("express-validator")
const {checkRolAdmin, validate, verifyToken, checkAnyRole} = require("../middlewares")
const {MikrotikService} = require("./mikrotik.service")

const router = express.Router()
const mikrotikService = new MikrotikService()

// http://<HOST>/api/mikrotik
router.get("/", [
  verifyToken, checkAnyRole
], getMikrotikList)

// Lista de router mikrotik.
function getMikrotikList(req, res = response) {
  mikrotikService.getMikrotikList().then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/:id
router.get("/:id", [
  verifyToken, checkAnyRole
], getMikrotikById)

// Obtener mikrotik por id.
function getMikrotikById(req, res = response) {
  mikrotikService.getMikrotikById(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik
router.post("/", [
  verifyToken,
  checkRolAdmin,
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("host", "La dirección IP es obligatorio").not().isEmpty(),
  check("port", "El puerto es obligatorio").not().isEmpty(),
  check("userName", "El nombre de usuario es obligatorio").not().isEmpty(),
  validate
], createMikrotik)

// registrar mikrotik.
function createMikrotik(req, res = response) {
  mikrotikService.createMikrotik(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/:id
router.patch("/:id", [
  verifyToken,
  checkRolAdmin,
  check("id", "No es un ID válido").isMongoId(),
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("host", "La dirección IP es obligatorio").not().isEmpty(),
  check("port", "El puerto es obligatorio").not().isEmpty(),
  check("userName", "El nombre de usuario es obligatorio").not().isEmpty(),
  validate
], updateMikrotik)

// actualizar mikrotik.
function updateMikrotik(req, res = response) {
  mikrotikService.updateMikrotik(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/:id
router.delete("/:id", [
  verifyToken,
  checkRolAdmin,
  check("id", "No es un ID válido").isMongoId(),
  validate
], deleteMikrotik)

// borrar mikrotik.
function deleteMikrotik(req, res = response) {
  mikrotikService.deleteMikrotik(req.params.id).then(result => {
    res.json(result)
  })
}

// ============================================================

// http://<HOST>/api/mikrotik/:id/totalStatusServices
router.get("/:id/totalStatusServices", [
  verifyToken,
  checkAnyRole,
  check("id", "No es un ID válido").isMongoId(),
  validate
], totalStatusServices)

// total servicios mikrotik.
async function totalStatusServices(req, res = response) {
  const enabled = await mikrotikService.totalStatusServices(req.params.id, "HABILITADO")
  const suspended = await mikrotikService.totalStatusServices(req.params.id, "SUSPENDIDO")
  res.json({enabled, suspended})
}

// http://<HOST>/api/mikrotik/:id/getServicesList
router.get("/:id/getServicesList", [
  verifyToken,
  checkAnyRole,
  check("id", "No es un ID válido").isMongoId(),
  validate
], getServicesList)

// total servicios mikrotik.
async function getServicesList(req, res = response) {
  mikrotikService.getServicesList(req.params.id).then(result => {
    res.json(result)
  })
}

// ============================================================

// http://<HOST>/api/mikrotik/:id/interface
router.get("/:id/interface", [
  verifyToken, checkAnyRole,
  check("id", "No es un ID válido").isMongoId(),
], getInterfaceList)

// Lista de interfaces.
function getInterfaceList(req, res = response) {
  mikrotikService.getInterfaceList(req.params.id)
    .then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/show/interface/:id
router.get("/show/interface/:id", [
  verifyToken, checkAnyRole
], getInterfaceById)

// obtener interfaz por id.
function getInterfaceById(req, res = response) {
  mikrotikService.getInterfaceById(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/add/interface
router.post("/add/interface", [
  verifyToken,
  checkRolAdmin,
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("mikrotikId", "El ID del mikrotik es obligatorio").not().isEmpty(),
  validate
], createInterface)

// registrar interfaz.
function createInterface(req, res = response) {
  mikrotikService.createInterface(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/update/interface/:id
router.patch("/update/interface/:id", [
  verifyToken,
  checkRolAdmin,
  check("id", "No es un ID válido").isMongoId(),
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("mikrotikId", "El ID del mikrotik es obligatorio").not().isEmpty(),
  validate
], updateInterface)

// actualizar interfaz.
function updateInterface(req, res = response) {
  mikrotikService.updateInterface(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/delete/interface/:id
router.delete("/delete/interface/:id", [
  verifyToken,
  checkRolAdmin,
  check("id", "No es un ID válido").isMongoId(),
  validate
], deleteInterface)

// borrar interfaz.
function deleteInterface(req, res = response) {
  mikrotikService.deleteInterface(req.params.id)
    .then(result => {
      res.json(result)
    })
}

module.exports = {
  mikrotikRouter: router
}
