import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {AveriaController} from './controller'

const router = express.Router()

// http://<HOST>/api/averias
router.get('/', [verifyToken], getAverias)

// Lista de averias.
function getAverias(req, res = response) {
  let {archived, search} = req.query
  if (!search) {
    search = ''
  }
  archived = archived === 'true'
  AveriaController.getAverias(search, archived).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/averias/:id
router.get('/:id', [verifyToken], getAveria)

// devolver averia por id.
function getAveria(req, res = response) {
  AveriaController.getAveria(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/averias
router.post('/', [verifyToken], addAveria)

// registrar averia.
function addAveria(req, res = response) {
  AveriaController.createAveria(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/averias/:id
router.patch('/:id', [verifyToken], updateAveria)

// actualizar averia.
function updateAveria(req, res = response) {
  AveriaController.updateAveria(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/averias
router.delete('/:id', [verifyToken], deleteAveria)

// borrar averia.
function deleteAveria(req, res = response) {
  AveriaController.deleteAveria(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const averiaRouter = router
