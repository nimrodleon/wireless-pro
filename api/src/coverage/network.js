const express = require("express")
const {response} = require("express")
const {checkRolAdmin, validate, verifyToken} = require("../middlewares")
const {CoverageController} = require("./controller")
const {check} = require("express-validator")

const router = express.Router()

// http://<HOST>/api/coverages
router.get("/", [verifyToken], getCoverages)

// Lista areas de cobertura.
function getCoverages(req, res = response) {
  let query = req.query.search || ""
  CoverageController.getCoverages(query.toUpperCase()).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/coverages/:id
router.get("/:id", [verifyToken], getCoverage)

// Obtener area cobertura por id.
function getCoverage(req, res = response) {
  CoverageController.getCoverage(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/coverages
router.post("/", [
  verifyToken,
  check("name", "El nombre es obligatorio").not().isEmpty(),
  validate
], addCoverage)

// registrar area cobertura.
function addCoverage(req, res = response) {
  CoverageController.createCoverage(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/coverages/:id
router.patch("/:id", [
  verifyToken,
  check("name", "El nombre es obligatorio").not().isEmpty(),
  validate
], updateCoverage)

// actualizar area cobertura.
function updateCoverage(req, res = response) {
  CoverageController.updateCoverage(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/coverages/:id
router.delete("/:id", [
  verifyToken,
  checkRolAdmin,
], deleteCoverage)

// borrar area cobertura.
function deleteCoverage(req, res = response) {
  CoverageController.deleteCoverage(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(400).json(err)
  })
}

module.exports = {
  coverageRouter: router
}
