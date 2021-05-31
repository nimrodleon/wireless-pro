import express from 'express'
import * as controller from './controller'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

// Listar equipos.
router.get('/:id/:type', verifyToken, async (req, res) => {
  controller.getDevices(req.params.id, req.params.type).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// obtener equipo por id.
router.get('/:id', verifyToken, async (req, res) => {
  controller.getDevice(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// buscador select2.
router.get('/v1/select2/:q?', async (req, res) => {
  let term = req.query.term || ''
  controller.getDevicesS2(term).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// registrar equipo.
router.post('/', verifyToken, async (req, res) => {
  controller.createDevice(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar equipo.
router.patch('/:id', verifyToken, async (req, res) => {
  controller.updateDevice(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar equipo.
router.delete('/:id', verifyToken, async (req, res) => {
  controller.deleteDevice(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
