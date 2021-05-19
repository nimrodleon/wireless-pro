import express from 'express'
import verifyToken from '../auth/verifyToken'
import * as controller from './controller'

const router = express.Router()

// Lista de tramos.
router.get('/', verifyToken, async (req, res) => {
  const query = req.query.search || ''
  controller.getTramos(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// devolver un tramo por id.
router.get('/:id', verifyToken, async (req, res) => {
  controller.getTramo(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// devolver todos los tramos. (DEPRECADO)
router.get('/v1/all', verifyToken, async (req, res) => {
  controller.getTramos().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(50).json(err)
  })
})

// Total de equipos para el tramo {id}.
router.get('/:id/count', verifyToken, async (req, res) => {
  controller.countDevices(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// Test Coverages uniq.
router.get('/coverages/uniq', verifyToken, async (req, res) => {
  controller.tramosByDistinctCoverage().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// Lista de areas cobertura.
router.get('/coverages/all', verifyToken, async (req, res) => {
  controller.getCoveragesByTramos().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// registrar tramo.
router.post('/', verifyToken, async (req, res) => {
  controller.createTramo(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar tramo.
router.patch('/:id', verifyToken, async (req, res) => {
  controller.updateTramo(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar tramo.
router.delete('/:id', verifyToken, async (req, res) => {
  controller.deleteTramo(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
