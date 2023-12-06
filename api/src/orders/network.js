const express = require("express")
const {response} = express
const {checkRolAdmin, verifyToken, checkAnyRole} = require("../middlewares")
const {OrderService} = require("./order.service")

const router = express.Router()
const orderService = new OrderService()

// http://<HOST>/api/work_orders
router.get("/", [
  verifyToken, checkAnyRole
], getOrderList)

// Lista de ordenes de trabajo.
function getOrderList(req, res = response) {
  const {search = ""} = req.query
  orderService.getOrderList(search.toUpperCase())
    .then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/:year/:month/report
router.get("/:year/:month/report", [
  verifyToken, checkAnyRole
], getOrderListByYearMonth)

// Lista de órdenes, filtrado por mes y año.
function getOrderListByYearMonth(req, res = response) {
  const {search = ""} = req.query
  const {year, month} = req.params
  orderService.getOrderListByYearMonth(year, month, search).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/:id
router.get("/:id", [
  verifyToken, checkAnyRole
], getOrderById)

// Obtener orden de instalación por ID.
function getOrderById(req, res = response) {
  orderService.getOrderById(req.params.id)
    .then(result => {
      res.json(result)
    })
}

// http://<HOST>/api/work_orders/:id/client
router.get("/:id/client", [
  verifyToken, checkAnyRole
], getOrderByClientId)

// Obtener orden de instalación por ID del cliente.
function getOrderByClientId(req, res = response) {
  orderService.getOrderByClientId(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders
router.post("/", [
  verifyToken, checkAnyRole
], addOrder)

// Registrar orden de instalación.
function addOrder(req, res = response) {
  orderService.addOrder(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/:id
router.patch("/:id", [
  verifyToken, checkAnyRole
], updateOrder)

// actualizar orden de instalación.
function updateOrder(req, res = response) {
  orderService.updateOrder(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/:id
router.delete("/:id", [
  verifyToken, checkRolAdmin
], deleteOrder)

// Borrar orden de instalación.
function deleteOrder(req, res = response) {
  orderService.deleteOrder(req.params.id).then(result => {
    res.json(result)
  })
}

// ====================================================================================================

// http://<HOST>/api/work_orders/:id/material
router.get("/:id/material", [
  verifyToken, checkAnyRole
], getMaterials)

// Lista de materiales.
function getMaterials(req, res = response) {
  orderService.getMaterials(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/show/material/:id
router.get("/show/material/:id", [
  verifyToken, checkAnyRole
], getMaterial)

// Obtener material por id.
function getMaterial(req, res = response) {
  orderService.getMaterial(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/add/material
router.post("/add/material", [
  verifyToken, checkAnyRole
], addMaterial)

// registrar material.
function addMaterial(req, res = response) {
  orderService.addMaterial(req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/update/material/:id
router.patch("/update/material/:id", [
  verifyToken, checkAnyRole
], updateMaterial)

// actualizar material.
function updateMaterial(req, res = response) {
  orderService.updateMaterial(req.params.id, req.body).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/work_orders/delete/material/:id
router.delete("/delete/material/:id", [
  verifyToken, checkAnyRole
], deleteMaterial)

// borrar material.
function deleteMaterial(req, res = response) {
  orderService.deleteMaterial(req.params.id).then(result => {
    res.json(result)
  })
}

module.exports = {
  workOrderRouter: router
}
