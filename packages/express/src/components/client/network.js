import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {ClientController} from './controller'

const router = express.Router()

// http://<HOST>/api/clients
router.get('/', [verifyToken], getClients)

// Lista de clientes.
function getClients(req, res = response) {
  const {search = ''} = req.query
  ClientController.getClients(search).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients/select2/:q?
router.get('/select2/:q?', [verifyToken], getClientsS2)

// Buscador de clientes => select2.
function getClientsS2(req, res = response) {
  let {term = ''} = req.query
  ClientController.getClientsS2(term).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients/:id
router.get('/:id', [verifyToken], getClient)

// Obtener un cliente por id.
function getClient(req, res = response) {
  ClientController.getClient(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients
router.post('/', [verifyToken], addClient)

// registrar nuevo cliente.
function addClient(req, res = response) {
  ClientController.createClient(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients/:id
router.patch('/:id', [verifyToken], updateClient)

// actualizar cliente.
function updateClient(req, res = response) {
  ClientController.updateClient(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients
router.delete('/:id', [verifyToken], deleteClient)

// borrar cliente.
function deleteClient(req, res = response) {
  ClientController.deleteClient(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients/active-clients
router.get('/active-clients', [verifyToken], getActiveClients)

// lista de clientes activos.
function getActiveClients(req, res = response) {
  ClientController.getClientsActive(true).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients/clients-disconnected
router.get('/clients-disconnected', [verifyToken], getClientsDisconnected)

// lista de clientes archivados.
function getClientsDisconnected(req, res = response) {
  ClientController.getClientsActive(false).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

export const clientRouter = router
