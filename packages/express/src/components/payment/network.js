import express from 'express'
import * as controller from './controller'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

// Listar pagos.
router.get('/:client/client', verifyToken, async (req, res) => {
  controller.getPayments(req.params.client).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// obtener pago por id.
router.get('/:id', verifyToken, async (req, res) => {
  controller.getPayment(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// crear nuevo pago.
router.post('/', verifyToken, async (req, res) => {
  controller.createPayment(req.body, req.userId).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar pago existente.
router.delete('/:id', verifyToken, async (req, res) => {
  controller.deletePayment(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
  })
})

// reporte de pagos diarios.
router.get('/report/payment-journal/:date', verifyToken, async (req, res) => {
  controller.reportDailyPay(req.params.date).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
