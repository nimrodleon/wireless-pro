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

// http://<HOST>/api/bitWorker/:id/arp/cache
router.get('/:id/arp/cache', [verifyToken], arpCache)

// cargar arp a la cache.
function arpCache(req, res = response) {
  WorkerController.migrationArpCache(req.params.id).then(({data}) => {
    res.json(data)
  })
}

// http://<HOST>/api/bitWorker/:id/simple-queue/cache
router.get('/:id/simple-queue/cache', [verifyToken], simpleQueueCache)

// cargar cola simple a la cache.
function simpleQueueCache(req, res = response) {
  WorkerController.migrationSimpleQueueCache(req.params.id).then(({data}) => {
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

// http://<HOST>/api/bitWorker/:id/getSimpleQueueByIpAddress/:ipAddress
router.get('/:id/getSimpleQueueByIpAddress/:ipAddress', [verifyToken], getSimpleQueueByIpAddress)

// cargar lista cola simple por ipAddress.
function getSimpleQueueByIpAddress(req, res = response) {
  let {id, ipAddress} = req.params
  WorkerController.getSimpleQueueByIpAddress(id, ipAddress).then(({data}) => {
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

// http://<HOST>/api/bitWorker/:id/getArpListById/:arpId
router.get('/:id/getArpListById/:arpId', [verifyToken], getArpListById)

// Obtener arp por Id.
function getArpListById(req, res = response) {
  let {id, arpId} = req.params
  WorkerController.getArpListById(arpId, id).then(({data}) => {
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

// http://<HOST>/api/bitWorker/:id/deleteArpList/:arpId
router.delete('/:id/deleteArpList/:arpId', [verifyToken], deleteArpList)

// borrar arp item.
function deleteArpList(req, res = response) {
  let {id, arpId} = req.params
  WorkerController.deleteArpList(arpId, id).then(({data}) => {
    res.json(data)
  })
}

export const bitWorkerRouter = router
