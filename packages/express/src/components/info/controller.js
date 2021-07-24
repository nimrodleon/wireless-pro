import {InfoStore} from './store'

// Lógica - Info.
export class InfoController {
  // obtener la info empresa.
  static getInfo() {
    return new Promise((resolve, reject) => {
      try {
        resolve(InfoStore.getInfo())
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar info empresa.
  static updateInfo(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(InfoStore.updateInfo(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // ============================================================
  // Lista de aplicaciones.
  static getApplications() {
    return new Promise((resolve, reject) => {
      try {
        resolve(InfoStore.getApplications())
      } catch (err) {
        reject(err)
      }
    })
  }

  // Obtener aplicación por id.
  static getApplicationId(appId) {
    return new Promise((resolve, reject) => {
      try {
        resolve(InfoStore.getApplicationId(appId))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar aplicación.
  static createApplication(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(InfoStore.createApplication(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar aplicación.
  static deleteApplication(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(InfoStore.deleteApplication(id))
      } catch (err) {
        reject(err)
      }
    })
  }

}
