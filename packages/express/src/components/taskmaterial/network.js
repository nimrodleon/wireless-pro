import express from 'express'
import * as controller from './controller'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

// Lista de taskMaterials.
router.get('/:id/material', verifyToken, async (req, res) => {
  controller.getTaskMaterials(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// devolver taskMaterial por id.
router.get('/material/:id', verifyToken, async (req, res) => {
  controller.getTaskMaterial(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// registrar taskMaterial.
router.post('/material', verifyToken, async (req, res) => {
  controller.createTaskMaterial(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar taskMaterial.
router.patch('/material/:id', verifyToken, async (req, res) => {
  controller.updateTaskMaterial(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar taskMaterial por id.
router.delete('/material/:id', verifyToken, async (req, res) => {
  controller.deleteTaskMaterial(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
