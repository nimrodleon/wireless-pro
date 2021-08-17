import express, {response} from 'express'
import {checkRolAdmin, verifyToken} from '../middlewares'
import {OrderController} from './controller'

const router = express.Router()

// http://<HOST>/api/work_orders
router.get('/', [verifyToken], getOrderList)

// Lista de ordenes de trabajo.
function getOrderList(req, res = response) {
  let {search = ''} = req.query
  OrderController.getOrderList(search).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/:year/:month/report
router.get('/:year/:month/report', [verifyToken], getOrderListByYearMonth)

// Lista de ordenes filtrado por mes y año.
function getOrderListByYearMonth(req, res = response) {
  let {search = ''} = req.query
  let {year, month} = req.params
  OrderController.getOrderListByYearMonth(year, month, search).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/:id
router.get('/:id', [verifyToken], getOrderById)

// Obtener orden de instalación por id.
function getOrderById(req, res = response) {
  OrderController.getOrderById(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/:id/client
router.get('/:id/client', [verifyToken], getOrderByClientId)

// Obtener orden de instalación por id del cliente.
function getOrderByClientId(req, res = response) {
  OrderController.getOrderByClientId(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders
router.post('/', [verifyToken], addOrder)

// Registrar orden de instalación.
function addOrder(req, res = response) {
  OrderController.addOrder(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/:id
router.patch('/:id', [verifyToken], updateOrder)

// actualizar orden de instalación.
function updateOrder(req, res = response) {
  OrderController.updateOrder(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/:id
router.delete('/:id', [verifyToken, checkRolAdmin], deleteOrder)

// Borrar orden de instalación.
function deleteOrder(req, res = response) {
  OrderController.deleteOrder(req.params.id).then(result => {
    res.json(result)
  })
}

// ========================================
// http://<HOST>/api/work_orders/:id/material
router.get('/:id/material', [verifyToken], getMaterials)

// Lista de materiales.
function getMaterials(req, res = response) {
  OrderController.getMaterials(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/show/material/:id
router.get('/show/material/:id', [verifyToken], getMaterial)

// Obtener material por id.
function getMaterial(req, res = response) {
  OrderController.getMaterial(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/add/material
router.post('/add/material', [verifyToken], addMaterial)

// registrar material.
function addMaterial(req, res = response) {
  OrderController.addMaterial(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/update/material/:id
router.patch('/update/material/:id', [verifyToken], updateMaterial)

// actualizar material.
function updateMaterial(req, res = response) {
  OrderController.updateMaterial(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/delete/material/:id
router.delete('/delete/material/:id', [verifyToken], deleteMaterial)

// borrar material.
function deleteMaterial(req, res = response) {
  OrderController.deleteMaterial(req.params.id).then(result => {
    res.json(result)
  })
}

export const workOrderRouter = router
