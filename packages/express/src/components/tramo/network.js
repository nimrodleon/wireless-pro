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


export default router
