import express from 'express'
import * as controller from './controller'
import verifyToken from '../auth/verifyToken'

const router = express.Router()

// Lista de clientes.
router.get('/', verifyToken, async (req, res) => {
  let {status, search} = req.query
  if (!search) {
    search = ''
  }
  status = status === 'true'
  controller.getClients(search, status).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// Buscador de clientes => select2.
router.get('/select2/:q?', async (req, res) => {
  let term = req.query.term || ''
  controller.getClientsS2(term).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// Obtener un cliente por id.
router.get('/:id', verifyToken, async (req, res) => {
  controller.getClient(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// registrar nuevo cliente.
router.post('/', verifyToken, async (req, res) => {
  controller.createClient(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar cliente.
router.patch('/:id', verifyToken, async (req, res) => {
  controller.updateClient(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar cliente.
router.delete('/:id', verifyToken, async (req, res) => {
  controller.deleteClient(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(200).json(err)
  })
})

export default router
