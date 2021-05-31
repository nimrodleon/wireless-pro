import {AveriaStore} from './store'

// Lógica - averias.
export class AveriaController {
  // Lista de averias.
  static getAverias(query, status) {
    return new Promise((resolve, reject) => {
      try {
        resolve(AveriaStore.getAverias(query, status))
      } catch (err) {
        reject(err)
      }
    })
  }

  // devolver averia por id.
  static getAveria(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(AveriaStore.getAveria(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar averia.
  static createAveria(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(AveriaStore.createAveria(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar averia.
  static updateAveria(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(AveriaStore.updateAveria(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar averia.
  static deleteAveria(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(AveriaStore.deleteAveria(id))
      } catch (err) {
        reject(err)
      }
    })
  }
}
