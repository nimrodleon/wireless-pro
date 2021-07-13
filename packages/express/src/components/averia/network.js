import express, {response} from 'express'
import {checkRolAdmin, validate, verifyToken} from '../middlewares'
import {AveriaController} from './controller'
import {check} from 'express-validator'

const router = express.Router()

// http://<HOST>/api/averias
router.get('/', [verifyToken], getAverias)

// Lista de averias.
function getAverias(req, res = response) {
  let {archived, search} = req.query
  if (!search) {
    search = ''
  }
  archived = archived === 'true'
  AveriaController.getAverias(search, archived).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/averias/:id/service
router.get('/:id/service', [verifyToken], getAveriasByServiceId)

// Lista de averias por servicios.
function getAveriasByServiceId(req, res = response) {
  AveriaController.getAveriasByServiceId(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/averias/:id
router.get('/:id', [
  verifyToken,
  check('id', 'No es un ID válido').isMongoId(),
  validate,
], getAveria)

// devolver averia por id.
function getAveria(req, res = response) {
  AveriaController.getAveria(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/averias
router.post('/', [
  verifyToken,
  check('client', 'El cliente es obligatorio').not().isEmpty(),
  validate,
], addAveria)

// registrar averia.
function addAveria(req, res = response) {
  AveriaController.createAveria(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/averias/:id
router.patch('/:id', [
  verifyToken,
  check('id', 'No es un ID válido').isMongoId(),
  check('client', 'El cliente es obligatorio').not().isEmpty(),
  validate,
], updateAveria)

// actualizar averia.
function updateAveria(req, res = response) {
  AveriaController.updateAveria(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/averias
router.delete('/:id', [
  verifyToken,
  checkRolAdmin,
  check('id', 'No es un ID válido').isMongoId(),
  validate,
], deleteAveria)

// borrar averia.
function deleteAveria(req, res = response) {
  AveriaController.deleteAveria(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const averiaRouter = router
