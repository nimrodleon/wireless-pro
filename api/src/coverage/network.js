const express = require("express")
const {response} = express
const {checkRolAdmin, validate, verifyToken} = require("../middlewares")
const {check} = require("express-validator")
const {CoverageService} = require("./coverage.service")

const router = express.Router()
const coverageService = new CoverageService()

// http://<HOST>/api/coverages
router.get("/", [verifyToken], getCoverages)

// Lista áreas de cobertura.
function getCoverages(req, res = response) {
  const query = req.query.search || ""
  coverageService.getCoverages(query.toUpperCase()).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/coverages/:id
router.get("/:id", [verifyToken], getCoverage)

// Obtener area cobertura por id.
function getCoverage(req, res = response) {
  coverageService.getCoverage(req.params.id).then(result => {
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
  coverageService.createCoverage(req.body).then(result => {
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
  coverageService.updateCoverage(req.params.id, req.body).then(result => {
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
  coverageService.deleteCoverage(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(400).json(err)
  })
}

module.exports = {
  coverageRouter: router
}
