import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {CoverageController} from './controller'

const router = express.Router()

// http://<HOST>/api/coverages
router.get('/', [verifyToken], getCoverages)

// Lista areas de cobertura.
function getCoverages(req, res = response) {
  let query = req.query.search || ''
  CoverageController.getCoverages(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/coverages
router.post('/', [verifyToken], addCoverage)

// registrar area cobertura.
function addCoverage(req, res = response) {
  CoverageController.createCoverage(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/coverages/:id
router.patch('/:id', [verifyToken], updateCoverage)

// actualizar area cobertura.
function updateCoverage(req, res = response) {
  CoverageController.updateCoverage(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/coverages/:id
router.delete('/:id', [verifyToken], deleteCoverage)

// borrar area cobertura.
function deleteCoverage(req, res = response) {
  CoverageController.deleteCoverage(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const coverageRouter = router
