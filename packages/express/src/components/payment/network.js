import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {PaymentController} from './controller'

const router = express.Router()

// http://<HOST>/api/payments/:id/:year
router.get('/:id/:year', [verifyToken], getPayments)

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
router.get('/:id', [verifyToken], getPayment)

// obtener pago por id.
function getPayment(req, res = response) {
  PaymentController.getPayment(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/payments
router.post('/', [verifyToken], addPayment)

// crear nuevo pago.
function addPayment(req, res = response) {
  PaymentController.createPayment(req.body, req.userId).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/payments/:id
router.delete('/:id', [verifyToken], deletePayment)

// borrar pago existente.
function deletePayment(req, res = response) {
  PaymentController.deletePayment(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
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
