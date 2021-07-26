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


export const bitWorkerRouter = router
