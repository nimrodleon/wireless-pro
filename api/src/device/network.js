const express = require("express")
const {response} = express
const {checkRolAdmin, verifyToken, checkRolRedes} = require("../middlewares")
const {DeviceService} = require("./device.service")

const router = express.Router()
const deviceService = new DeviceService()

// http://<HOST>/api/devices/:id/:type
// router.get('/:id/:type', [verifyToken], getDevices)

// Listar equipos.
// function getDevices(req, res = response) {
//   DeviceController.getDevices(req.params.id, req.params.type).then(result => {
//     res.json(result)
//   }).catch(err => {
//     res.status(500).json(err)
//   })
// }

// http://<HOST>/api/devices/tramo/:id
router.get("/tramo/:id", [verifyToken], getDevicesByTramo)

// Obtener equipos por tramos de red.
function getDevicesByTramo(req, res = response) {
  deviceService.getDevicesByTramo(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/devices/:id
router.get("/:id", [verifyToken], getDevice)

// obtener equipo por ID.
function getDevice(req, res = response) {
  deviceService.getDevice(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/devices/v1/select2/:q?
router.get("/v1/select2/:q?", [verifyToken], getDevicesS2)

// buscador select2.
function getDevicesS2(req, res = response) {
  const {term = ""} = req.query
  deviceService.getDevicesS2(term).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/devices
router.post("/", [
  verifyToken,
  checkRolRedes,
], addDevice)

// registrar equipo.
function addDevice(req, res = response) {
  deviceService.createDevice(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/devices/:id
router.patch("/:id", [
  verifyToken,
  checkRolRedes,
], updateDevice)

// actualizar equipo.
function updateDevice(req, res = response) {
  deviceService.updateDevice(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/devices/:id
router.delete("/:id", [
  verifyToken,
  checkRolAdmin,
], deleteDevice)

// borrar equipo.
function deleteDevice(req, res = response) {
  deviceService.deleteDevice(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
  })
}

module.exports = {
  deviceRouter: router
}
