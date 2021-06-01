import {OutageStore} from './store'

// Lógica - cortes de  internet.
export class OutageController {
  // Lista de cortes.
  static getOutages(idService) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OutageStore.getOutages(idService))
      } catch (err) {
        reject(err)
      }
    })
  }

  // obtener el corte por id.
  static getOutage(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OutageStore.getOutage(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar corte.
  static createOutage(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OutageStore.createOutage(data))
      } catch (err) {
        reject(err)
      }
    })
  }

}
