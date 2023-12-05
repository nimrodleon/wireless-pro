const express = require("express")
const {response} = express
const {check} = require("express-validator")
const {checkRolAdmin, validate, verifyToken, checkRolCajero} = require("../middlewares")
const {PaymentService} = require("./payment.service")

const router = express.Router()
const paymentService = new PaymentService()

// http://<HOST>/api/payments/:id/:year
router.get("/:id/:year", [
  verifyToken,
  check("id", "No es un ID válido").isMongoId(),
  validate
], getPayments)

// Listar pagos.
function getPayments(req, res = response) {
  const {id, year} = req.params
  paymentService.getPayments(id, year).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/payments/:id
router.get("/:id", [
  verifyToken,
  check("id", "No es un ID válido").isMongoId(),
  validate
], getPayment)

// obtener pago por ID.
function getPayment(req, res = response) {
  paymentService.getPayment(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/payments
router.post("/", [
  verifyToken,
  checkRolCajero,
  check("clientId", "El cliente es obligatorio").not().isEmpty(),
  check("serviceId", "El servicio es obligatorio").not().isEmpty(),
  check("year", "El año es obligatorio").not().isEmpty(),
  check("month", "El mes es obligatorio").not().isEmpty(),
  check("amount", "El monto es obligatorio").not().isEmpty(),
  check("amount", "El formato del monto no es válido").isNumeric(),
  check("paymentMethod", "El método de pago es obligatorio").not().isEmpty(),
  check("payFrom", "La fecha de inicio es obligatorio").not().isEmpty(),
  check("payUp", "La fecha hasta es obligatorio").not().isEmpty(),
  validate
], addPayment)

// crear nuevo pago.
function addPayment(req, res = response) {
  paymentService.createPayment(req.body, req.currentUser._id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/payments/:id
router.delete("/:id", [
  verifyToken,
  checkRolAdmin,
  check("id", "No es un ID válido").isMongoId(),
  validate
], deletePayment)

// borrar pago existente.
function deletePayment(req, res = response) {
  paymentService.deletePayment(req.params.id).then(() => {
    res.status(200).send()
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/payments/reporte/pagosDiario/:date/:method
router.get("/reporte/pagosDiario/:date/:method", [verifyToken], reportePagosDiario)

// reporte de pagos diarios.
function reportePagosDiario(req, res = response) {
  paymentService.reportePagosDiario(req.params.date, req.params.method).then(result => {
    res.json(result)
  })
}

module.exports = {
  paymentRouter: router
}
