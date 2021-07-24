import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {WorkerController} from './controller'

const router = express.Router()

// http://<HOST>/api/bitWorker/:id/migration/arp/cache
router.get('/:id/migration/arp/cache', [verifyToken], migrationArpCache)

// cargar cache arp.
function migrationArpCache(req, res = response) {
  WorkerController.migrationArpCache(req.params.id).then(result => {
    res.json(result)
  })
}

export const bitWorkerRouter = router
