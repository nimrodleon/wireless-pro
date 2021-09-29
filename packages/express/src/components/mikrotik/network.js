import express, {response} from 'express'
import {check} from 'express-validator'
import {checkRolAdmin, validate, verifyToken} from '../middlewares'
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
router.post('/', [
  verifyToken,
  checkRolAdmin,
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('host', 'La dirección IP es obligatorio').not().isEmpty(),
  check('port', 'El puerto es obligatorio').not().isEmpty(),
  check('userName', 'El nombre de usuario es obligatorio').not().isEmpty(),
  validate
], createMikrotik)

// registrar mikrotik.
function createMikrotik(req, res = response) {
  MikrotikController.createMikrotik(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/:id
router.patch('/:id', [
  verifyToken,
  checkRolAdmin,
  check('id', 'No es un ID válido').isMongoId(),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('host', 'La dirección IP es obligatorio').not().isEmpty(),
  check('port', 'El puerto es obligatorio').not().isEmpty(),
  check('userName', 'El nombre de usuario es obligatorio').not().isEmpty(),
  validate
], updateMikrotik)

// actualizar mikrotik.
function updateMikrotik(req, res = response) {
  MikrotikController.updateMikrotik(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/:id
router.delete('/:id', [
  verifyToken,
  checkRolAdmin,
  check('id', 'No es un ID válido').isMongoId(),
  validate
], deleteMikrotik)

// borrar mikrotik.
function deleteMikrotik(req, res = response) {
  MikrotikController.deleteMikrotik(req.params.id).then(result => {
    res.json(result)
  })
}

// ============================================================

// http://<HOST>/api/mikrotik/:id/totalStatusServices
router.get('/:id/totalStatusServices', [
  verifyToken,
  check('id', 'No es un ID válido').isMongoId(),
  validate
], totalStatusServices)

// total servicios mikrotik.
async function totalStatusServices(req, res = response) {
  const enabled = await MikrotikController.totalEnabledServices(req.params.id)
  const suspended = await MikrotikController.totalSuspendedServices(req.params.id)
  res.json({enabled, suspended})
}

// ============================================================

// http://<HOST>/api/mikrotik/:id/interface
router.get('/:id/interface', [verifyToken], getInterfaceList)

// Lista de interfaces.
function getInterfaceList(req, res = response) {
  MikrotikController.getInterfaceList(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/show/interface/:id
router.get('/show/interface/:id', [verifyToken], getInterfaceById)

// obtener interfaz por id.
function getInterfaceById(req, res = response) {
  MikrotikController.getInterfaceById(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/add/interface
router.post('/add/interface', [
  verifyToken,
  checkRolAdmin,
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('mikrotikId', 'El ID del mikrotik es obligatorio').not().isEmpty(),
  validate
], createInterface)

// registrar interfaz.
function createInterface(req, res = response) {
  MikrotikController.createInterface(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/update/interface/:id
router.patch('/update/interface/:id', [
  verifyToken,
  checkRolAdmin,
  check('id', 'No es un ID válido').isMongoId(),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('mikrotikId', 'El ID del mikrotik es obligatorio').not().isEmpty(),
  validate
], updateInterface)

// actualizar interfaz.
function updateInterface(req, res = response) {
  MikrotikController.updateInterface(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/mikrotik/delete/interface/:id
router.delete('/delete/interface/:id', [
  verifyToken,
  checkRolAdmin,
  check('id', 'No es un ID válido').isMongoId(),
  validate
], deleteInterface)

// borrar interfaz.
function deleteInterface(req, res = response) {
  MikrotikController.deleteInterface(req.params.id).then(result => {
    res.json(result)
  })
}

export const mikrotikRouter = router
