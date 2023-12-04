const express = require("express")
const {response} = express
const {verifyToken} = require("../middlewares")
const {OutageService} = require("./outage.service")

const router = express.Router()
const outageService = new OutageService()

// http://<HOST>/api/outages/:id/service
router.get("/:id/service", [verifyToken], getOutages)

// Lista de cortes.
function getOutages(req, res = response) {
  outageService.getOutages(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// // http://<HOST>/api/services/outages/:id
// router.get('/:id', [verifyToken], getOutage)
//
// // obtener corte por id.
// function getOutage(req, res = response) {
//   OutageController.getOutage(req.params.id).then(result => {
//     res.json(result)
//   }).catch(err => {
//     res.status(500).json(err)
//   })
// }
//
// // http://<HOST>/api/services/outages
// router.post('/', [verifyToken], addOutage)
//
// // registrar corte.
// function addOutage(req, res = response) {
//   OutageController.createOutage(req.body).then(result => {
//     res.json(result)
//   }).catch(err => {
//     res.status(500).json(err)
//   })
// }

module.exports = {
  outageRouter: router
}

