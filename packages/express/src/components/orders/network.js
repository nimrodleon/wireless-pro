import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {OrderController} from './controller'

const router = express.Router()

// http://<HOST>/api/installation_orders
router.get('/', [verifyToken], getOrderList)

// Lista de ordenes de instalación.
function getOrderList(req, res = response) {
  let {search = ''} = req.query
  console.info(search)
  OrderController.getOrderList(search).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/installation_orders
// Lista de ordenes filtrado por mes y año.

// http://<HOST>/api/installation_orders/:id
router.get('/:id', [verifyToken], getOrderById)

// Obtener orden de instalación por id.
function getOrderById(req, res = response) {
  OrderController.getOrderById(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/installation_orders
router.post('/', [verifyToken], addOrderInstallation)

// Registrar orden de instalación.
function addOrderInstallation(req, res = response) {
  OrderController.addOrder(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/installation_orders/:id
router.patch('/:id', [verifyToken], updateOrder)

// actualizar orden de instalación.
function updateOrder(req, res = response) {
  OrderController.updateOrder(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// Borrar orden de instalación.

// ========================================
// Lista de materiales.

// Obtener material por id.
// registrar material.
// actualizar material.
// borrar material.

export const installationOrderRouter = router
