import express, {response} from 'express'
import {checkRolAdmin, validate, verifyToken} from '../middlewares'
import {MaterialController} from './controller'
import {check} from 'express-validator'

const router = express.Router()

// http://<HOST>/api/material
router.get('/', [verifyToken], getMaterials)

// Listar materiales.
function getMaterials(req, res = response) {
  let query = req.query.search || ''
  MaterialController.getMaterials(query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/material/:id
router.get('/:id', [verifyToken], getMaterial)

// obtener material por id.
function getMaterial(req, res = response) {
  MaterialController.getMaterial(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/material
router.post('/', [
  verifyToken,
  check('und', 'La und es obligatorio').not().isEmpty(),
  check('description', 'La descripción es obligatorio').not().isEmpty(),
  check('price', 'El precio es obligatorio').not().isEmpty(),
  validate
], addMaterial)

// registrar material.
function addMaterial(req, res = response) {
  MaterialController.createMaterial(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/material/:id
router.patch('/:id', [
  verifyToken,
  check('und', 'La und es obligatorio').not().isEmpty(),
  check('description', 'La descripción es obligatorio').not().isEmpty(),
  check('price', 'El precio es obligatorio').not().isEmpty(),
  validate
], updateMaterial)

// actualizar material.
function updateMaterial(req, res = response) {
  MaterialController.updateMaterial(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/material/:id
router.delete('/:id', [
  verifyToken,
  checkRolAdmin,
], deleteMaterial)

// borrar material.
function deleteMaterial(req, res = response) {
  MaterialController.deleteMaterial(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/material/select2/:q?
router.get('/select2/:q?', [verifyToken], getMaterialWithSelect2)

// buscar material con select2.
function getMaterialWithSelect2(req, res = response) {
  let {term = ''} = req.query
  MaterialController.getMaterialWithSelect2(term).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

export const materialRouter = router
