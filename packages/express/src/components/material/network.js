import express from 'express'
import * as controller from './controller'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

// Listar materiales.
router.get('/', verifyToken, async (req, res) => {
  let query = req.query.search || ''
  controller.getMaterials(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// obtener material por id.
router.get('/:id', verifyToken, async (req, res) => {
  controller.getMaterial(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// cantidad de material en tarea.
router.get('/:id/count/material', verifyToken, async (req, res) => {
  res.json(0)
})

// registrar material.
router.post('/', verifyToken, async (req, res) => {
  controller.createMaterial(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar material.
router.patch('/:id', verifyToken, async (req, res) => {
  controller.updateMaterial(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar material.
router.delete('/:id', verifyToken, async (req, res) => {
  controller.deleteMaterial(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
