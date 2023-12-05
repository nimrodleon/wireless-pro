const express = require("express")
const {response} = require("express")
const {check} = require("express-validator")
const {checkRolAdmin, validate, verifyToken, checkAnyRole} = require("../middlewares")
const {ClientService} = require("./client.service")

const router = express.Router()
const clientService = new ClientService()

// http://<HOST>/api/clients
router.get("/", [
  verifyToken, checkAnyRole
], getClients)

// Lista de clientes.
function getClients(req, res = response) {
  const {search = ""} = req.query
  clientService.getClients(search.toUpperCase()).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients/select2/:q?
router.get("/select2/:q?", [
  verifyToken, checkAnyRole
], getClientsS2)

// Buscador de clientes => select2.
function getClientsS2(req, res = response) {
  let {term = ""} = req.query
  clientService.getClientsS2(term).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients/:id
router.get("/:id", [
  verifyToken,
  checkAnyRole,
  check("id", "No es un ID válido").isMongoId(),
  validate
], getClient)

// Obtener un cliente por ID.
function getClient(req, res = response) {
  clientService.getClient(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients
router.post("/", [
  verifyToken,
  checkAnyRole,
  check("dni", "El D.N.I. es obligatorio").not().isEmpty(),
  check("fullName", "El nombre es obligatorio").not().isEmpty(),
  check("fullAddress", "La dirección es obligatorio").not().isEmpty(),
  check("phone", "El teléfono es obligatorio").not().isEmpty(),
  validate
], addClient)

// registrar nuevo cliente.
function addClient(req, res = response) {
  clientService.createClient(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients/:id
router.patch("/:id", [
  verifyToken,
  checkAnyRole,
  check("id", "No es un ID válido").isMongoId(),
  check("dni", "El D.N.I. es obligatorio").not().isEmpty(),
  check("fullName", "El nombre es obligatorio").not().isEmpty(),
  check("fullAddress", "La dirección es obligatorio").not().isEmpty(),
  check("phone", "El teléfono es obligatorio").not().isEmpty(),
  validate
], updateClient)

// actualizar cliente.
function updateClient(req, res = response) {
  clientService.updateClient(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients
router.delete("/:id", [
  verifyToken,
  checkRolAdmin,
  check("id", "No es un ID válido").isMongoId(),
  validate
], deleteClient)

// borrar cliente.
function deleteClient(req, res = response) {
  clientService.deleteClient(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(400).json(err)
  })
}

// // http://<HOST>/api/clients/reporte/listaDeClientes
// router.get('/reporte/listaDeClientes', [verifyToken], reporteListaDeClientes)
//
// // exportar lista de clientes.
// function reporteListaDeClientes(req, res = response) {
//   ClientController.getClientList().then(result => {
//     let workbook = new excel.Workbook()
//     let worksheet = workbook.addWorksheet('REPORTE')
//     worksheet.columns = [
//       {header: 'D.N.I/R.U.C', key: 'dni', width: 20},
//       {header: 'NOMBRES Y APELLIDOS', key: 'fullName', width: 50},
//       {header: 'DIRECCIÓN', key: 'address', width: 50},
//       {header: 'TELÉFONO', key: 'phoneNumber', width: 20}
//     ]
//     let arrData = []
//     Array.from(result).forEach(obj => {
//       arrData.push({dni: obj.dni, fullName: obj.fullName, address: obj.fullAddress, phoneNumber: obj.phone})
//     })
//     worksheet.addRows(arrData)
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
//     res.setHeader('Content-Disposition', 'attachment; filename=Lista-de-clientes.xlsx')
//     return workbook.xlsx.write(res).then(() => {
//       res.status(200).end()
//     })
//   })
// }

module.exports = {
  clientRouter: router
}
