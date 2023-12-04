const express = require("express")
const {response} = express
const {checkRolAdmin, verifyToken} = require("../middlewares")
const {InfoService} = require("./info.service")

const router = express.Router()
const infoService = new InfoService()

// http://<HOST>/api/info
router.get("/", [
  verifyToken,
], getInfoCompany)

// obtener info empresa.
function getInfoCompany(req, res = response) {
  infoService.getInfo().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/info/:id
router.patch("/:id", [
  verifyToken,
  checkRolAdmin,
], updateInfoCompany)

// actualizar info empresa.
function updateInfoCompany(req, res = response) {
  infoService.updateInfo(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

module.exports = {
  infoRouter: router
}
