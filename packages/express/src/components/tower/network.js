import express, {response} from 'express'
import verifyToken from '../middlewares/verifyToken'
import {TowerController} from './controller'

const router = express.Router()

// http://<HOST>/api/tower
router.get('/', [verifyToken], getTowers)

// Lista de torres.
function getTowers(req, res = response) {
  let query = req.query.search || ''
  TowerController.getTowers(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/tower/:id
router.get('/:id', [verifyToken], getTower)

// devolver torre por id.
function getTower(req, res = response) {
  TowerController.getTower(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/tower/coverages/all
router.get('/coverages/all', [verifyToken], getCoveragesByTower)

// areas cobertura por torre.
function getCoveragesByTower(req, res = response) {
  TowerController.getCoveragesByTowers().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/tower/v1/all
router.get('/v1/all', [verifyToken], getAllTowers)

// Todas las torres.
function getAllTowers(req, res = response) {
  TowerController.getTowers().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/tower
router.post('/', [verifyToken], addTower)

// registrar torre.
function addTower(req, res = response) {
  TowerController.createTower(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/tower/:id
router.patch('/:id', [verifyToken], updateTower)

// actualizar torre.
function updateTower(req, res = response) {
  TowerController.updateTower(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/tower/:id
router.delete('/:id', [verifyToken], deleteTower)

// borrar torre.
function deleteTower(req, res = response) {
  TowerController.deleteTower(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const towerRouter = router
