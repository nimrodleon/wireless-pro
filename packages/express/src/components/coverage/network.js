import express from 'express'
import * as controller from './controller'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

// Lista areas de cobertura.
router.get('/', verifyToken, async (req, res) => {
  let query = req.query.search || ''
  controller.getCoverages(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// Cantidad de clientes por area cobertura. (DEPRECADO)
router.get('/:id/count/client', verifyToken, async (req, res) => {
  res.json(0)
})

// registrar area cobertura.
router.post('/', verifyToken, async (req, res) => {
  controller.createCoverage(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar area cobertura.
router.patch('/:id', verifyToken, async (req, res) => {
  controller.updateCoverage(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar area cobertura.
router.delete('/:id', verifyToken, async (req, res) => {
  controller.deleteCoverage(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
