import express from 'express'
import * as controller from './controller'
import verifyToken from '../auth/verifyToken'

const router = express.Router()

// Lista de averias.
router.get('/', verifyToken, async (req, res) => {
  let {archived, search} = req.query
  if (!search) {
    search = ''
  }
  archived = archived === 'true'
  controller.getAverias(search, archived).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// devolver averia por id.
router.get('/:id', verifyToken, async (req, res) => {
  controller.getAveria(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// registrar averia.
router.post('/', verifyToken, async (req, res) => {
  controller.createAveria(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar averia.
router.patch('/:id', verifyToken, async (req, res) => {
  controller.updateAveria(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar averia.
router.delete('/:id', verifyToken, async (req, res) => {
  controller.deleteAveria(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
