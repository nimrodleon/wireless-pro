import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {WorkerController} from './controller'

const router = express.Router()

// http://<HOST>/api/bitWorker/:id/mikrotik/add
router.get('/:id/mikrotik/add', [verifyToken], addMikrotik)

// agregar mikrotik.
function addMikrotik(req, res = response) {
  WorkerController.addMikrotik(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/getArpListByIpAddress/:ipAddress
router.get('/:id/getArpListByIpAddress/:ipAddress', [verifyToken], getArpListByIpAddress)

// cargar lista de arp por <ip-address>.
function getArpListByIpAddress(req, res = response) {
  let {id, ipAddress} = req.params
  WorkerController.getArpListByIpAddress(id, ipAddress).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/getSimpleQueueByName/:name
router.get('/:id/getSimpleQueueByName/:name', [verifyToken], getSimpleQueueByName)

// cargar lista cola simple por nombre.
function getSimpleQueueByName(req, res = response) {
  let {id, name} = req.params
  WorkerController.getSimpleQueueByName(id, name).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/getExportDataMikrotik
router.get('/:id/getExportDataMikrotik', [verifyToken], getExportDataMikrotik)

// exportar datos del mikrotik a excel.
function getExportDataMikrotik(req, res = response) {
  WorkerController.getExportDataMikrotik(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// ====================================================================================================

// http://<HOST>/api/bitWorker/:id/getArpList
router.get('/:id/getArpList', [verifyToken], getArpList)

// Lista arp.
function getArpList(req, res = response) {
  WorkerController.getArpList(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/getArpListById/:serviceId
router.get('/:id/getArpListById/:serviceId', [verifyToken], getArpListById)

// Obtener arp por Id.
function getArpListById(req, res = response) {
  let {id, serviceId} = req.params
  WorkerController.getArpListById(serviceId, id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/getArpListByDisabled/:value
router.get('/:id/getArpListByDisabled/:value', [verifyToken], getArpListByDisabled)

// cargar lista arp por campo [disabled]
function getArpListByDisabled(req, res = response) {
  let {id, value} = req.params
  WorkerController.getArpListByDisabled(value, id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/createArpList
router.post('/createArpList', [verifyToken], createArpList)

// registrar arp item.
function createArpList(req, res = response) {
  WorkerController.createArpList(req.body).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/updateArpList/:id
router.put('/updateArpList/:id', [verifyToken], updateArpList)

// actualizar arp item.
function updateArpList(req, res = response) {
  WorkerController.updateArpList(req.params.id, req.body).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/deleteArpList/:serviceId
router.delete('/:id/deleteArpList/:serviceId', [verifyToken], deleteArpList)

// borrar arp item.
function deleteArpList(req, res = response) {
  let {id, serviceId} = req.params
  WorkerController.deleteArpList(serviceId, id).then(({data}) => {
    res.json(data)
  })
}

// ====================================================================================================

// http://<HOST>/api/bitWorker/:id/getSimpleQueueList
router.get('/:id/getSimpleQueueList', [verifyToken], getSimpleQueueList)

// Lista de Colas Simple.
function getSimpleQueueList(req, res = response) {
  WorkerController.getSimpleQueueList(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/createSimpleQueue
router.post('/createSimpleQueue', [verifyToken], createSimpleQueue)

// registrar cola simple.
function createSimpleQueue(req, res = response) {
  WorkerController.createSimpleQueue(req.body).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/getSimpleQueueById/:serviceId
router.get('/:id/getSimpleQueueById/:serviceId', [verifyToken], getSimpleQueueById)

// Obtener cola simple por id.
function getSimpleQueueById(req, res = response) {
  let {id, serviceId} = req.params
  WorkerController.getSimpleQueueById(serviceId, id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/updateSimpleQueue
router.put('/updateSimpleQueue/:id', [verifyToken], updateSimpleQueue)

// actualizar cola simple.
function updateSimpleQueue(req, res = response) {
  WorkerController.updateSimpleQueue(req.params.id, req.body).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/deleteSimpleQueue/:serviceId
router.delete('/:id/deleteSimpleQueue/:serviceId', [verifyToken], deleteSimpleQueue)

// borrar cola simple.
function deleteSimpleQueue(req, res = response) {
  let {id, serviceId} = req.params
  WorkerController.deleteSimpleQueue(serviceId, id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/getSimpleQueueByDisabled/:value
router.get('/:id/getSimpleQueueByDisabled/:value', [verifyToken], getSimpleQueueByDisabled)

// cargar lista cola simple por campo disabled.
function getSimpleQueueByDisabled(req, res = response) {
  let {id, value} = req.params
  WorkerController.getSimpleQueueByDisabled(value, id).then(({data}) => {
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
