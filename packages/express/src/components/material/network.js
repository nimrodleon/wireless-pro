import express, {response} from 'express'
import verifyToken from '../middlewares/verifyToken'
import {MaterialController} from './controller'

const router = express.Router()

// http://<HOST>/api/material
router.get('/', [verifyToken], getMaterials)

// Listar materiales.
function getMaterials(req, res = response) {
  let query = req.query.search || ''
  MaterialController.getMaterials(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/material/:id
router.get('/:id', [verifyToken], getMaterial)

// obtener material por id.
function getMaterial(req, res = response) {
  MaterialController.getMaterial(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/material
router.post('/', [verifyToken], addMaterial)

// registrar material.
function addMaterial(req, res = response) {
  MaterialController.createMaterial(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/material/:id
router.patch('/:id', [verifyToken], updateMaterial)

// actualizar material.
function updateMaterial(req, res = response) {
  MaterialController.updateMaterial(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/material/:id
router.delete('/:id', [verifyToken], deleteMaterial)

// borrar material.
function deleteMaterial(req, res = response) {
  MaterialController.deleteMaterial(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const materialRouter = router
