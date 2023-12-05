const express = require("express")
const {response} = express
const {check} = require("express-validator")
const excel = require("exceljs")
const {checkRolAdmin, validate, verifyToken, checkRolRedes} = require("../middlewares")
const {ServiceService} = require("./service.service")

const router = express.Router()
const serviceService = new ServiceService()

// http://<HOST>/api/services/:client/client
router.get("/:id/client", [verifyToken], getServices)

// Lista de servicio.
function getServices(req, res = response) {
  serviceService.getServices(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services/:id
router.get("/:id", [
  verifyToken,
  check("id", "No es un ID válido").isMongoId(),
  validate
], getService)

// obtener servicio por ID.
function getService(req, res = response) {
  serviceService.getService(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services
router.post("/", [
  verifyToken,
  checkRolRedes,
  check("ipAddress", "La dirección es obligatorio").not().isEmpty(),
  check("status", "El estado es obligatorio").not().isEmpty(),
  check("servicePlanId", "El plan de servicio es obligatorio").not().isEmpty(),
  check("initialDate", "La fecha inicial es obligatorio").not().isEmpty(),
  check("mikrotikId", "El servidor mikrotik es obligatorio").not().isEmpty(),
  check("interfaceId", "La interfaz mikrotik es obligatorio").not().isEmpty(),
  check("accessPoint", "El punto de acceso es obligatorio").not().isEmpty(),
  check("macAddress", "La dirección MAC es obligatorio").not().isEmpty(),
  check("address", "La dirección es obligatorio").not().isEmpty(),
  check("city", "La ciudad es obligatorio").not().isEmpty(),
  check("region", "La región es obligatorio").not().isEmpty(),
  check("coverageId", "La area cobertura es obligatorio").not().isEmpty(),
  check("paymentType", "El tipo de pago es obligatorio").not().isEmpty(),
  check("price", "El precio es obligatorio").not().isEmpty(),
  check("price", "El formato del precio no es válido").isNumeric(),
  check("commonPayment", "La frecuencia de pago es obligatorio").not().isEmpty(),
  validate
], addService)

// registrar servicio.
function addService(req, res = response) {
  serviceService.createService(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services/:id
router.patch("/:id", [
  verifyToken,
  checkRolRedes,
  check("id", "No es un ID válido").isMongoId(),
  check("ipAddress", "La dirección es obligatorio").not().isEmpty(),
  check("status", "El estado es obligatorio").not().isEmpty(),
  check("servicePlanId", "El plan de servicio es obligatorio").not().isEmpty(),
  check("initialDate", "La fecha inicial es obligatorio").not().isEmpty(),
  check("mikrotikId", "El servidor mikrotik es obligatorio").not().isEmpty(),
  check("interfaceId", "La interfaz mikrotik es obligatorio").not().isEmpty(),
  check("accessPoint", "El punto de acceso es obligatorio").not().isEmpty(),
  check("address", "La dirección es obligatorio").not().isEmpty(),
  check("city", "La ciudad es obligatorio").not().isEmpty(),
  check("region", "La región es obligatorio").not().isEmpty(),
  check("coverageId", "La area cobertura es obligatorio").not().isEmpty(),
  check("paymentType", "El tipo de pago es obligatorio").not().isEmpty(),
  check("price", "El precio es obligatorio").not().isEmpty(),
  check("price", "El formato del precio no es válido").isNumeric(),
  check("commonPayment", "La frecuencia de pago es obligatorio").not().isEmpty(),
  validate
], updateService)

// actualizar servicio.
function updateService(req, res = response) {
  serviceService.updateService(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services/:id
router.delete("/:id", [
  verifyToken,
  checkRolAdmin,
  check("id", "No es un ID válido").isMongoId(),
  validate
], deleteService)

// borrar servicio.
function deleteService(req, res = response) {
  serviceService.deleteService(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/services/reporte/getTemporalServices
router.get("/reporte/getTemporalServices", [verifyToken], getTemporalServices)

// Lista de servicios temporales.
function getTemporalServices(req, res = response) {
  serviceService.getTemporalServices().then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/services/reporte/clientesPorCobrar/:date/:type
router.get("/reporte/clientesPorCobrar/:date/:type", [verifyToken], reporteClientesPorCobrar)

// reporte clientes por cobrar.
function reporteClientesPorCobrar(req, res = response) {
  serviceService.reporteClientesPorCobrar(req.params.date, req.params.type).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/services/reporte/servicioSinRegistroDePago
router.get("/reporte/servicioSinRegistroDePago", [verifyToken], reporteServicioSinRegistroDePago)

// lista de servicios sin registro de pago.
function reporteServicioSinRegistroDePago(req, res = response) {
  serviceService.reporteServicioSinRegistroDePago().then(result => {
    let workbook = new excel.Workbook()
    let worksheet = workbook.addWorksheet("REPORTE")
    worksheet.columns = [
      {header: "NOMBRES Y APELLIDOS", key: "fullName", width: 60},
      {header: "DIRECCIÓN IP", key: "ipAddress", width: 20},
    ]
    let arrData = []
    Array.from(result).forEach(obj => {
      arrData.push({fullName: obj.clientId.fullName, ipAddress: obj.ipAddress})
    })
    worksheet.addRows(arrData)
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    res.setHeader("Content-Disposition", "attachment; filename=servicios-sin-registro-de-pago.xlsx")
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end()
    })
  })
}

module.exports = {
  serviceRouter: router
}
