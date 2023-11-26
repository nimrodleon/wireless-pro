const express = require("express")
const {response} = require("express")
const {check} = require("express-validator")
const {checkRolAdmin, validate, verifyToken} = require("../middlewares")
const {ClientController} = require("./controller")

const router = express.Router()

// http://<HOST>/api/clients
router.get("/", [verifyToken], getClients)

// Lista de clientes.
function getClients(req, res = response) {
  const {search = ""} = req.query
  ClientController.getClients(search.toUpperCase()).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients/select2/:q?
router.get("/select2/:q?", [verifyToken], getClientsS2)

// Buscador de clientes => select2.
function getClientsS2(req, res = response) {
  let {term = ""} = req.query
  ClientController.getClientsS2(term).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients/:id
router.get("/:id", [
  verifyToken,
  check("id", "No es un ID válido").isMongoId(),
  validate
], getClient)

// Obtener un cliente por id.
function getClient(req, res = response) {
  ClientController.getClient(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients
router.post("/", [
  verifyToken,
  check("dni", "El D.N.I. es obligatorio").not().isEmpty(),
  check("fullName", "El nombre es obligatorio").not().isEmpty(),
  check("fullAddress", "La dirección es obligatorio").not().isEmpty(),
  check("phone", "El teléfono es obligatorio").not().isEmpty(),
  validate
], addClient)

// registrar nuevo cliente.
function addClient(req, res = response) {
  ClientController.createClient(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/clients/:id
router.patch("/:id", [
  verifyToken,
  check("id", "No es un ID válido").isMongoId(),
  check("dni", "El D.N.I. es obligatorio").not().isEmpty(),
  check("fullName", "El nombre es obligatorio").not().isEmpty(),
  check("fullAddress", "La dirección es obligatorio").not().isEmpty(),
  check("phone", "El teléfono es obligatorio").not().isEmpty(),
  validate
], updateClient)

// actualizar cliente.
function updateClient(req, res = response) {
  ClientController.updateClient(req.params.id, req.body).then(result => {
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
  ClientController.deleteClient(req.params.id).then(result => {
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
