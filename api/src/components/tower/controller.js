const {TowerStore} = require("./store")
const {DeviceStore} = require("../device/store")

// Lógica - Tower.
class TowerController {
  // Lista de torres.
  static getTowers(query = "") {
    return new Promise((resolve, reject) => {
      try {
        resolve(TowerStore.getTowers(query))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Lista de torres.
  static getTowersV1() {
    return new Promise((resolve, reject) => {
      try {
        resolve(TowerStore.getTowersV1())
      } catch (err) {
        reject(err)
      }
    })
  }

  // devolver torre por id.
  static getTower(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TowerStore.getTower(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar torre.
  static createTower(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TowerStore.createTower(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar torre.
  static updateTower(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TowerStore.updateTower(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar torre.
  static deleteTower(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TowerStore.deleteTower(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // torres por ares cobertura.
  static getTowerByDistinctCoverage() {
    return new Promise((resolve, reject) => {
      try {
        resolve(TowerStore.getTowerByDistinctCoverage())
      } catch (err) {
        reject(err)
      }
    })
  }

  // areas cobertura x torres.
  static getCoveragesByTowers() {
    return new Promise((resolve, reject) => {
      try {
        resolve(TowerStore.getCoveragesByTowers())
      } catch (err) {
        reject(err)
      }
    })
  }

  // total de equipos de la torre.
  static countDevices(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(DeviceStore.countDevicesByTower(id))
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = {
  TowerController
}
