import express, {response} from 'express'
import {check} from 'express-validator'
import {validate, verifyToken} from '../middlewares'
import {PaymentController} from './controller'

const router = express.Router()

// http://<HOST>/api/payments/:id/:year
router.get('/:id/:year', [
  verifyToken,
  check('id', 'No es un ID válido').isMongoId(),
  validate
], getPayments)

// Listar pagos.
function getPayments(req, res = response) {
  let {id, year} = req.params
  PaymentController.getPayments(id, year).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/payments/:id
router.get('/:id', [
  verifyToken,
  check('id', 'No es un ID válido').isMongoId(),
  validate
], getPayment)

// obtener pago por id.
function getPayment(req, res = response) {
  PaymentController.getPayment(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/payments
router.post('/', [
  verifyToken,
  check('clientId', 'El cliente es obligatorio').not().isEmpty(),
  check('serviceId', 'El servicio es obligatorio').not().isEmpty(),
  check('year', 'El año es obligatorio').not().isEmpty(),
  check('month', 'El mes es obligatorio').not().isEmpty(),
  check('amount', 'El monto es obligatorio').not().isEmpty(),
  check('amount', 'El formato del monto no es válido').isNumeric(),
  check('paymentMethod', 'El método de pago es obligatorio').not().isEmpty(),
  check('payFrom', 'La fecha de inicio es obligatorio').not().isEmpty(),
  check('payUp', 'La fecha hasta es obligatorio').not().isEmpty(),
  validate
], addPayment)

// crear nuevo pago.
function addPayment(req, res = response) {
  PaymentController.createPayment(req.body, req.currentUser._id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/payments/:id
router.delete('/:id', [
  verifyToken,
  check('id', 'No es un ID válido').isMongoId(),
  validate
], deletePayment)

// borrar pago existente.
function deletePayment(req, res = response) {
  PaymentController.deletePayment(req.params.id).then(() => {
    res.status(200).send()
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/payments/report/payment-journal/:date
router.get('/report/payment-journal/:date', [verifyToken], reportDailyPay)

// reporte de pagos diarios.
function reportDailyPay(req, res = response) {
  PaymentController.reportDailyPay(req.params.date).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const paymentRouter = router
