import express, {response} from 'express'
import {check} from 'express-validator'
import excel from 'exceljs'
import {checkRolAdmin, checkRolNetwork, validate, verifyToken} from '../middlewares'
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
router.get('/:id', [
  verifyToken,
  check('id', 'No es un ID válido').isMongoId(),
  validate
], getService)

// obtener servicio por id.
function getService(req, res = response) {
  ServiceController.getService(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services
router.post('/', [
  verifyToken,
  checkRolNetwork,
  check('ipAddress', 'La dirección es obligatorio').not().isEmpty(),
  check('status', 'El estado es obligatorio').not().isEmpty(),
  check('servicePlanId', 'El plan de servicio es obligatorio').not().isEmpty(),
  check('initialDate', 'La fecha inicial es obligatorio').not().isEmpty(),
  check('mikrotikId', 'El servidor mikrotik es obligatorio').not().isEmpty(),
  check('interfaceId', 'La interfaz mikrotik es obligatorio').not().isEmpty(),
  check('accessPoint', 'El punto de acceso es obligatorio').not().isEmpty(),
  check('macAddress', 'La dirección MAC es obligatorio').not().isEmpty(),
  check('address', 'La dirección es obligatorio').not().isEmpty(),
  check('city', 'La ciudad es obligatorio').not().isEmpty(),
  check('region', 'La región es obligatorio').not().isEmpty(),
  check('coverageId', 'La area cobertura es obligatorio').not().isEmpty(),
  check('paymentType', 'El tipo de pago es obligatorio').not().isEmpty(),
  check('price', 'El precio es obligatorio').not().isEmpty(),
  check('price', 'El formato del precio no es válido').isNumeric(),
  check('commonPayment', 'La frecuencia de pago es obligatorio').not().isEmpty(),
  validate
], addService)

// registrar servicio.
function addService(req, res = response) {
  ServiceController.createService(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services/:id
router.patch('/:id', [
  verifyToken,
  checkRolNetwork,
  check('id', 'No es un ID válido').isMongoId(),
  check('ipAddress', 'La dirección es obligatorio').not().isEmpty(),
  check('status', 'El estado es obligatorio').not().isEmpty(),
  check('servicePlanId', 'El plan de servicio es obligatorio').not().isEmpty(),
  check('initialDate', 'La fecha inicial es obligatorio').not().isEmpty(),
  check('mikrotikId', 'El servidor mikrotik es obligatorio').not().isEmpty(),
  check('interfaceId', 'La interfaz mikrotik es obligatorio').not().isEmpty(),
  check('accessPoint', 'El punto de acceso es obligatorio').not().isEmpty(),
  check('address', 'La dirección es obligatorio').not().isEmpty(),
  check('city', 'La ciudad es obligatorio').not().isEmpty(),
  check('region', 'La región es obligatorio').not().isEmpty(),
  check('coverageId', 'La area cobertura es obligatorio').not().isEmpty(),
  check('paymentType', 'El tipo de pago es obligatorio').not().isEmpty(),
  check('price', 'El precio es obligatorio').not().isEmpty(),
  check('price', 'El formato del precio no es válido').isNumeric(),
  check('commonPayment', 'La frecuencia de pago es obligatorio').not().isEmpty(),
  validate
], updateService)

// actualizar servicio.
function updateService(req, res = response) {
  ServiceController.updateService(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services/:id
router.delete('/:id', [
  verifyToken,
  checkRolAdmin,
  check('id', 'No es un ID válido').isMongoId(),
  validate
], deleteService)

// borrar servicio.
function deleteService(req, res = response) {
  ServiceController.deleteService(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services/:id/changeServicePlan
router.put('/:id/changeServicePlan', [
  verifyToken,
  check('id', 'No es un ID válido').isMongoId(),
  validate
], changeServicePlan)

// cambiar plan de servicio.
function changeServicePlan(req, res = response) {
  let {servicePlanId} = req.body
  ServiceController.changeServicePlan(req.params.id, servicePlanId).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/services/reporte/clientesPorCobrar/:date
router.get('/reporte/clientesPorCobrar/:date', [verifyToken], reporteClientesPorCobrar)

// reporte clientes por cobrar.
function reporteClientesPorCobrar(req, res = response) {
  ServiceController.reporteClientesPorCobrar(req.params.date).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/services/reporte/servicioSinRegistroDePago
router.get('/reporte/servicioSinRegistroDePago', [verifyToken], reporteServicioSinRegistroDePago)

// lista de servicios sin registro de pago.
function reporteServicioSinRegistroDePago(req, res = response) {
  ServiceController.reporteServicioSinRegistroDePago().then(result => {
    let workbook = new excel.Workbook()
    let worksheet = workbook.addWorksheet('REPORTE')
    worksheet.columns = [
      {header: 'NOMBRES Y APELLIDOS', key: 'fullName', width: 60},
      {header: 'DIRECCIÓN IP', key: 'ipAddress', width: 20},
    ]
    let arrData = []
    Array.from(result).forEach(obj => {
      arrData.push({fullName: obj.clientId.fullName, ipAddress: obj.ipAddress})
    })
    worksheet.addRows(arrData)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=servicios-sin-registro-de-pago.xlsx')
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end()
    })
  })
}

// http://<HOST>/api/services/reporte/serviciosPorEstado
router.get('/reporte/serviciosPorEstado', [verifyToken], reporteServiciosPorEstado)

// reporte servicios por estado.
async function reporteServiciosPorEstado(req, res = response) {
  let workbook = new excel.Workbook()
  const servicesHab = await ServiceController.getServicesByStatus('H')
  let worksheetHab = workbook.addWorksheet('HABILITADOS')
  let serviceHeader = [
    {header: 'NOMBRES Y APELLIDOS', key: 'fullName', width: 60},
    {header: 'DIRECCIÓN IP', key: 'ipAddress', width: 20},
  ]
  worksheetHab.columns = serviceHeader
  let arrDataHab = []
  Array.from(servicesHab).forEach(obj => {
    arrDataHab.push({fullName: obj.clientId.fullName, ipAddress: obj.ipAddress})
  })
  worksheetHab.addRows(arrDataHab)
  const servicesSus = await ServiceController.getServicesByStatus('S')
  let worksheetSus = workbook.addWorksheet('SUSPENDIDOS')
  worksheetSus.columns = serviceHeader
  let arrDataSus = []
  Array.from(servicesSus).forEach(obj => {
    arrDataSus.push({fullName: obj.clientId.fullName, ipAddress: obj.ipAddress})
  })
  worksheetSus.addRows(arrDataSus)
  // let servicesDes = await ServiceController.getServicesByStatus('D')
  // let worksheetDes = workbook.addWorksheet('DESHABILITADOS')
  // worksheetDes.columns = serviceHeader
  // let arrDataDes = []
  // Array.from(servicesDes).forEach(obj => {
  //   arrDataDes.push({fullName: obj.clientId.fullName, ipAddress: obj.ipAddress})
  // })
  // worksheetDes.addRows(arrDataDes)
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Content-Disposition', 'attachment; filename=servicios-por-estado.xlsx')
  return workbook.xlsx.write(res).then(() => {
    res.status(200).end()
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

export const serviceRouter = router
