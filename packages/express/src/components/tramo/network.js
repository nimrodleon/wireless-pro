import express, {response} from 'express'
import {checkRolAdmin, checkRolNetwork, validate, verifyToken} from '../middlewares'
import {TramoController} from './controller'
import {check} from 'express-validator'

const router = express.Router()

// http://<HOST>/api/tramo
router.get('/', [verifyToken], getTramos)

// Lista de tramos.
function getTramos(req, res = response) {
  const query = req.query.search || ''
  TramoController.getTramos(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tramo/:id
router.get('/:id', [verifyToken], getTramo)

// devolver un tramo por id.
function getTramo(req, res = response) {
  TramoController.getTramo(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tramo/coverages/uniq
router.get('/coverages/uniq', [verifyToken], getTramosByCoverages)

// Test Coverages uniq.
function getTramosByCoverages(req, res = response) {
  TramoController.tramosByDistinctCoverage().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tramo/coverages/all
router.get('/coverages/all', [verifyToken], getCoveragesByTramos)

// Lista de areas cobertura.
function getCoveragesByTramos(req, res = response) {
  TramoController.getCoveragesByTramos().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tramo
router.post('/', [
  verifyToken,
  checkRolNetwork,
  check('tramo', 'El nombre es obligatorio').not().isEmpty(),
  check('coverage', 'La area cobertura es obligatorio').not().isEmpty(),
  validate
], addTramo)

// registrar tramo.
function addTramo(req, res = response) {
  TramoController.createTramo(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tramo/:id
router.patch('/:id', [
  verifyToken,
  checkRolNetwork,
  check('tramo', 'El nombre es obligatorio').not().isEmpty(),
  check('coverage', 'La area cobertura es obligatorio').not().isEmpty(),
  validate
], updateTramo)

// actualizar tramo.
function updateTramo(req, res = response) {
  TramoController.updateTramo(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tramo/:id
router.delete('/:id', [
  verifyToken,
  checkRolAdmin,
], deleteTramo)

// borrar tramo.
function deleteTramo(req, res = response) {
  TramoController.deleteTramo(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(400).json(err)
  })
}

export const tramoRouter = router
