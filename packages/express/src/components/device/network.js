import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {DeviceController} from './controller'

const router = express.Router()

// http://<HOST>/api/devices/:id/:type
router.get('/:id/:type', [verifyToken], getDevices)

// Listar equipos.
function getDevices(req, res = response) {
  DeviceController.getDevices(req.params.id, req.params.type).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/devices/:id
router.get('/:id', [verifyToken], getDevice)

// obtener equipo por id.
function getDevice(req, res = response) {
  DeviceController.getDevice(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/devices/v1/select2/:q?
router.get('/v1/select2/:q?', [verifyToken], getDevicesS2)

// buscador select2.
function getDevicesS2(req, res = response) {
  const {term = ''} = req.query
  DeviceController.getDevicesS2(term).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/devices
router.post('/', [verifyToken], addDevice)

// registrar equipo.
function addDevice(req, res = response) {
  DeviceController.createDevice(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/devices/:id
router.patch('/:id', [verifyToken], updateDevice)

// actualizar equipo.
function updateDevice(req, res = response) {
  DeviceController.updateDevice(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/devices/:id
router.delete('/:id', [verifyToken], deleteDevice)

// borrar equipo.
function deleteDevice(req, res = response) {
  DeviceController.deleteDevice(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const deviceRouter = router
