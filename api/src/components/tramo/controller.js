const {TramoStore} = require( './store')

// Lógica - Tramos.
 class TramoController {
  // Lista de tramos.
  static getTramos(query) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TramoStore.getTramos(query))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Lista de tramos v1.
  static getTramosV1() {
    return new Promise((resolve, reject) => {
      try {
        resolve(TramoStore.getTramosV1())
      } catch (err) {
        reject(err)
      }
    })
  }

  // devolver tramo por id.
  static getTramo(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TramoStore.getTramo(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar tramo.
  static createTramo(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TramoStore.createTramo(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar tramo.
  static updateTramo(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TramoStore.updateTramo(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar tramo.
  static deleteTramo(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TramoStore.deleteTramo(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // obtener todas las coberturas por tramos.
  static getCoveragesByTramos() {
    return new Promise((resolve, reject) => {
      try {
        resolve(TramoStore.getCoveragesByTramos())
      } catch (err) {
        reject(err)
      }
    })
  }

  // Obtener tramos por areas cobertura.
  static getTramosByCoverage(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TramoStore.getTramosByCoverage(id))
      } catch (err) {
        reject(err)
      }
    })
  }

}

module.exports = {
  TramoController
}
