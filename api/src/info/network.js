const express = require("express")
const {response} = require("express")
const {checkRolAdmin, verifyToken} = require("../middlewares")
const {InfoController} = require("./controller")

const router = express.Router()

// http://<HOST>/api/info
router.get("/", [
  verifyToken,
], getInfoCompany)

// obtener info empresa.
function getInfoCompany(req, res = response) {
  InfoController.getInfo().then(result => {
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
  InfoController.updateInfo(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

module.exports = {
  infoRouter: router
}
