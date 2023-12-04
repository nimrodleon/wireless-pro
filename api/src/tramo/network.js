const express = require("express")
const {response} = express
const {checkRolAdmin, checkRolNetwork, validate, verifyToken} = require("../middlewares")
const {check} = require("express-validator")
const {TramoService} = require("./tramo.service")

const router = express.Router()
const tramoService = new TramoService()

// http://<HOST>/api/tramo
router.get("/", [verifyToken], getTramos)

// Lista de tramos.
function getTramos(req, res = response) {
  const query = req.query.search || ""
  tramoService.getTramos(query.toUpperCase()).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tramo/v1/all
router.get("/v1/all", [verifyToken], getTramosV1)

// Lista de tramos v1.
function getTramosV1(req, res = response) {
  tramoService.getTramosV1().then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/tramo/:id
router.get("/:id", [verifyToken], getTramo)

// devolver un tramo por id.
function getTramo(req, res = response) {
  tramoService.getTramo(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tramo/coverages/all
router.get("/coverages/all", [verifyToken], getCoveragesByTramos)

// Lista de areas cobertura.
function getCoveragesByTramos(req, res = response) {
  tramoService.getCoveragesByTramos().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tramo/coverage/id
router.get("/coverage/:id", [
  verifyToken,
  check("id", "No es un ID válido").isMongoId(),
  validate,
], getTramosByCoverage)

// Obtener tramos por areas cobertura.
function getTramosByCoverage(req, res = response) {
  tramoService.getTramosByCoverage(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/tramo
router.post("/", [
  verifyToken,
  checkRolNetwork,
  check("tramo", "El nombre es obligatorio").not().isEmpty(),
  check("coverage", "La area cobertura es obligatorio").not().isEmpty(),
  validate
], addTramo)

// registrar tramo.
function addTramo(req, res = response) {
  tramoService.createTramo(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tramo/:id
router.patch("/:id", [
  verifyToken,
  checkRolNetwork,
  check("tramo", "El nombre es obligatorio").not().isEmpty(),
  check("coverage", "La area cobertura es obligatorio").not().isEmpty(),
  validate
], updateTramo)

// actualizar tramo.
function updateTramo(req, res = response) {
  tramoService.updateTramo(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tramo/:id
router.delete("/:id", [
  verifyToken,
  checkRolAdmin,
], deleteTramo)

// borrar tramo.
function deleteTramo(req, res = response) {
  tramoService.deleteTramo(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(400).json(err)
  })
}

module.exports = {
  tramoRouter: router
}
