const {CoverageStore} = require("./store")

// Lógica - area cobertura.
class CoverageController {
  // Lista de areas cobertura.
  static getCoverages(query) {
    return new Promise((resolve, reject) => {
      try {
        resolve(CoverageStore.getCoverages(query))
      } catch (err) {
        reject(err)
      }
    })
  }

  // obtener area cobertura por id.
  static getCoverage(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(CoverageStore.getCoverage(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar area cobertura.
  static createCoverage(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(CoverageStore.createCoverage(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar area cobertura.
  static updateCoverage(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(CoverageStore.updateCoverage(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar area cobertura.
  static deleteCoverage(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(CoverageStore.deleteCoverage(id))
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = {
  CoverageController
}
