import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {ServiceController} from './controller'

const router = express.Router()

// http://<HOST>/api/services/:client/client
router.get('/:id/client', [verifyToken], getServices)

// Lista de servicio.
function getServices(req, res = response) {
  ServiceController.getServices(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services/:id
router.get('/:id', [verifyToken], getService)

// obtener servicio por id.
function getService(req, res = response) {
  ServiceController.getService(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services
router.post('/', [verifyToken], addService)

// registrar servicio.
function addService(req, res = response) {
  ServiceController.createService(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services/:id
router.patch('/:id', [verifyToken], updateService)

// actualizar servicio.
function updateService(req, res = response) {
  ServiceController.updateService(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services/:id
router.delete('/:id', [verifyToken], deleteService)

// borrar servicio.
function deleteService(req, res = response) {
  ServiceController.deleteService(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// // http://<HOST>/api/services/report/daily/:date
// router.get('/report/daily/:date', [verifyToken], reportInstallations)
//
// // instalaciones diarias.
// function reportInstallations(req, res = response) {
//   ServiceController.reportDailyInstallations(req.params.date).then(result => {
//     res.json(result)
//   }).catch(err => {
//     res.status(500).json(err)
//   })
// }

// // http://<HOST>/api/services/report/services-without-payment
// router.get('/report/services-without-payment', [verifyToken], reportServicesWithoutPayment)
//
// // lista de servicios sin registro de pago.
// function reportServicesWithoutPayment(req, res = response) {
//   ServiceController.reportServicesWithoutPayment().then(result => {
//     res.json(result)
//   }).catch(err => {
//     res.status(500).json(err)
//   })
// }

// // http://<HOST>/api/services/report/disconnected-services
// router.get('/report/disconnected-services', [verifyToken], reportDisconnectedServices)
//
// // Lista de servicios suspendidos.
// function reportDisconnectedServices(req, res = response) {
//   ServiceController.reportDisconnectedServices().then(result => {
//     res.json(result)
//   }).catch(err => {
//     res.status(500).json(err)
//   })
// }

// // http://<HOST>/api/services/report/customers-by-service-plan/:id
// router.get('/report/customers-by-service-plan/:id', [verifyToken], clientsByServicePlans)
//
// // Lista de servicios según tarifa de pago.
// function clientsByServicePlans(req, res = response) {
//   ServiceController.reportServicesByServicePlan(req.params.id).then(result => {
//     res.json(result)
//   }).catch(err => {
//     res.status(500).json(err)
//   })
// }

// // http://<HOST>/api/services/report/receivables/:date
// router.get('/report/receivables/:date', [verifyToken], reportServicesPayable)
//
// // Lista de clientes por cobrar.
// function reportServicesPayable(req, res = response) {
//   ServiceController.reportServicesPayable(req.params.date).then(result => {
//     res.json(result)
//   }).catch(err => {
//     res.status(500).json(err)
//   })
// }

export const serviceRouter = router
