import express from 'express'
import verifyToken from '../auth/verifyToken'
import * as controller from './controller'

const router = express.Router()

// Lista de torres.
router.get('/', verifyToken, async (req, res) => {
  let query = req.query.search || ''
  controller.getTowers(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// devolver torre por id.
router.get('/:id', verifyToken, async (req, res) => {
  controller.getTower(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// areas cobertura por torre.
router.get('/coverages/all', verifyToken, async (req, res) => {
  controller.getCoveragesByTowers().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// Todas las torres.
router.get('/v1/all', verifyToken, async (req, res) => {
  controller.getTowers().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// total de equipos para la torre.
router.get('/:id/count', verifyToken, async (req, res) => {
  controller.countDevices(req.params.id).catch(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// registrar torre.
router.post('/', verifyToken, async (req, res) => {
  controller.createTower(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar torre.
router.patch('/:id', verifyToken, async (req, res) => {
  controller.updateTower(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar torre.
router.delete('/:id', verifyToken, async (req, res) => {
  controller.deleteTower(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
