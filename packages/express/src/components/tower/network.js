import express, {response} from 'express'
import {checkRolAdmin, checkRolNetwork, validate, verifyToken} from '../middlewares'
import {TowerController} from './controller'
import {check} from 'express-validator'

const router = express.Router()

// http://<HOST>/api/tower
router.get('/', [verifyToken], getTowers)

// Lista de torres.
function getTowers(req, res = response) {
  let query = req.query.search || ''
  TowerController.getTowers(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower/:id
router.get('/:id', [verifyToken], getTower)

// devolver torre por id.
function getTower(req, res = response) {
  TowerController.getTower(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower/coverages/all
router.get('/coverages/all', [verifyToken], getCoveragesByTower)

// areas cobertura por torre.
function getCoveragesByTower(req, res = response) {
  TowerController.getCoveragesByTowers().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower/v1/all
router.get('/v1/all', [verifyToken], getAllTowers)

// Todas las torres.
function getAllTowers(req, res = response) {
  TowerController.getTowers().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower
router.post('/', [
  verifyToken,
  checkRolNetwork,
  check('tower', 'La torre es obligatorio').not().isEmpty(),
  check('coverage', 'La area cobertura es obligatorio').not().isEmpty(),
  validate
], addTower)

// registrar torre.
function addTower(req, res = response) {
  TowerController.createTower(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower/:id
router.patch('/:id', [
  verifyToken,
  checkRolNetwork,
  check('tower', 'La torre es obligatorio').not().isEmpty(),
  check('coverage', 'La area cobertura es obligatorio').not().isEmpty(),
  validate
], updateTower)

// actualizar torre.
function updateTower(req, res = response) {
  TowerController.updateTower(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower/:id
router.delete('/:id', [
  verifyToken,
  checkRolAdmin,
], deleteTower)

// borrar torre.
function deleteTower(req, res = response) {
  TowerController.deleteTower(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(400).json(err)
  })
}

export const towerRouter = router
