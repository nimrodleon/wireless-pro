import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {MikrotikController} from './controller'

const router = express.Router()

// http://<HOST>/api/mikrotik
router.get('/', [verifyToken], getMikrotikList)

// Lista de router mikrotik.
function getMikrotikList(req, res = response) {
  MikrotikController.getMikrotikList().then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/:id
router.get('/:id', [verifyToken], getMikrotikById)

// Obtener mikrotik por id.
function getMikrotikById(req, res = response) {
  MikrotikController.getMikrotikById(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik
router.post('/', [verifyToken], createMikrotik)

// registrar mikrotik.
function createMikrotik(req, res = response) {
  MikrotikController.createMikrotik(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/:id
router.patch('/:id', [verifyToken], updateMikrotik)

// actualizar mikrotik.
function updateMikrotik(req, res = response) {
  MikrotikController.updateMikrotik(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/:id
router.delete('/:id', [verifyToken], deleteMikrotik)

// borrar mikrotik.
function deleteMikrotik(req, res = response) {
  MikrotikController.deleteMikrotik(req.params.id).then(result => {
    res.json(result)
  })
}

// ============================================================

// http://<HOST>/api/mikrotik/:id/ethernet
router.get('/:id/ethernet', [verifyToken], getEthernetList)

// Lista de interfaces.
function getEthernetList(req, res = response) {
  MikrotikController.getEthernetList(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/show/ethernet/:id
router.get('/show/ethernet/:id', [verifyToken], getEthernetById)

// obtener interfaz por id.
function getEthernetById(req, res = response) {
  MikrotikController.getEthernetById(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/add/ethernet
router.post('/add/ethernet', [verifyToken], createEthernet)

// registrar interfaz.
function createEthernet(req, res = response) {
  MikrotikController.createEthernet(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/update/ethernet/:id
router.patch('/update/ethernet/:id', [verifyToken], updateEthernet)

// actualizar interfaz.
function updateEthernet(req, res = response) {
  MikrotikController.updateEthernet(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/delete/ethernet/:id
router.delete('/delete/ethernet/:id', [verifyToken], deleteEthernet)

// borrar interfaz.
function deleteEthernet(req, res = response) {
  MikrotikController.deleteEthernet(req.params.id).then(result => {
    res.json(result)
  })
}

export const mikrotikRouter = router
