import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {OutageController} from './controller'

const router = express.Router()

// http://<HOST>/api/services/outages/:id/service
router.get('/:id/service', [verifyToken], getOutages)

// Lista de cortes.
function getOutages(req, res = response) {
  OutageController.getOutages(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/services/outages/:id
router.get('/:id', [verifyToken], getOutage)

// obtener corte por id.
function getOutage(req, res = response) {
  OutageController.getOutage(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/services/outages
router.post('/', [verifyToken], addOutage)

// registrar corte.
function addOutage(req, res = response) {
  OutageController.createOutage(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const outageRouter = router
