import {TramoStore} from './store'
import {DeviceStore} from '../device/store'

// Lógica - Tramos.
export class TramoController {
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

  // Total de equipos para el tramo {id}.
  static countDevices(tramoId) {
    return new Promise((resolve, reject) => {
      try {
        resolve(DeviceStore.countDevicesByTramo(tramoId))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Test coverages uniq.
  static tramosByDistinctCoverage() {
    return new Promise((resolve, reject) => {
      try {
        resolve(TramoStore.getTramosByDistinctCoverage())
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

}
