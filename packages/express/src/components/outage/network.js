import express from 'express'
import * as controller from './controller'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

// Lista de cortes.
router.get('/:id/service', verifyToken, async (req, res) => {
  controller.getOutages(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// obtener corte por id.
router.get('/:id', verifyToken, async (req, res) => {
  controller.getOutage(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// registrar corte.
router.post('/', verifyToken, async (req, res) => {
  controller.createOutage(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
