const express = require("express")
const {response} = express
const {checkRolAdmin, validate, verifyToken, checkRolRedes} = require("../middlewares")
const {check} = require("express-validator")
const {TowerService} = require("./tower.service")

const router = express.Router()
const towerService = new TowerService()

// http://<HOST>/api/tower
router.get("/", [verifyToken], getTowers)

// Lista de torres.
function getTowers(req, res = response) {
  const query = req.query.search || ""
  towerService.getTowers(query.toUpperCase()).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower/v1/all
router.get("/v1/all", [verifyToken], getTowersV1)

// Lista de torres.
function getTowersV1(req, res = response) {
  towerService.getTowersV1().then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/tower/:id
router.get("/:id", [verifyToken], getTower)

// devolver torre por id.
function getTower(req, res = response) {
  towerService.getTower(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower/coverages/all
router.get("/coverages/all", [verifyToken], getCoveragesByTower)

// areas cobertura por torre.
function getCoveragesByTower(req, res = response) {
  towerService.getCoveragesByTowers().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower/v1/all
router.get("/v1/all", [verifyToken], getAllTowers)

// Todas las torres.
function getAllTowers(req, res = response) {
  towerService.getTowers().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower
router.post("/", [
  verifyToken,
  checkRolRedes,
  check("tower", "La torre es obligatorio").not().isEmpty(),
  check("coverage", "La area cobertura es obligatorio").not().isEmpty(),
  validate
], addTower)

// registrar torre.
function addTower(req, res = response) {
  towerService.createTower(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower/:id
router.patch("/:id", [
  verifyToken,
  checkRolRedes,
  check("tower", "La torre es obligatorio").not().isEmpty(),
  check("coverage", "La area cobertura es obligatorio").not().isEmpty(),
  validate
], updateTower)

// actualizar torre.
function updateTower(req, res = response) {
  towerService.updateTower(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

// http://<HOST>/api/tower/:id
router.delete("/:id", [
  verifyToken,
  checkRolAdmin,
], deleteTower)

// borrar torre.
function deleteTower(req, res = response) {
  towerService.deleteTower(req.params.id).then(result => {
    res.status(200).send()
  }).catch(err => {
    res.status(400).json(err)
  })
}

module.exports = {
  towerRouter: router
}
