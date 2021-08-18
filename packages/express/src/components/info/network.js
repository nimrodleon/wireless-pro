import express, {response} from 'express'
import {checkRolAdmin, verifyToken} from '../middlewares'
import {InfoController} from './controller'

const router = express.Router()

// http://<HOST>/api/info
router.get('/', [
  verifyToken,
], getInfoCompany)

// obtener info empresa.
function getInfoCompany(req, res = response) {
  InfoController.getInfo().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/info/:id
router.patch('/:id', [
  verifyToken,
  checkRolAdmin,
], updateInfoCompany)

// actualizar info empresa.
function updateInfoCompany(req, res = response) {
  InfoController.updateInfo(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// ====================================================================================================

// http://<HOST>/api/info/application/list
router.get('/application/:id/show', [verifyToken], getApplicationId)

// obtener aplicación por id.
function getApplicationId(req, res = response) {
  InfoController.getApplicationId(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/info/application/list
router.get('/application/list', [verifyToken], getApplications)

// Lista de aplicaciones.
function getApplications(req, res = response) {
  InfoController.getApplications().then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/info/application/add
router.post('/application/add', [
  verifyToken,
  checkRolAdmin,
], createApplication)

// crear aplicación.
function createApplication(req, res = response) {
  InfoController.createApplication(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/info/application/update/:id
router.put('/application/update/:id', [
  verifyToken,
  checkRolAdmin,
], updateApplication)

function updateApplication(req, res = response) {
  InfoController.updateApplication(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/info/application/delete/:id
router.delete('/application/delete/:id', [
  verifyToken,
  checkRolAdmin,
], deleteApplication)

// borrar aplicación.
function deleteApplication(req, res = response) {
  InfoController.deleteApplication(req.params.id).then(result => {
    res.json(result)
  })
}

export const infoRouter = router
