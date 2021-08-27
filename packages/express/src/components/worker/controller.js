import axios from 'axios'
import {WorkerStore} from './store'

// Lógica bitWorker.
export class WorkerController {
  // Habilitar servicio.
  static async enableService(serviceId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.post(`${URL}/api/Service/Enable/${serviceId}`)
  }

  // Suspender servicio.
  static async suspendService(serviceId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.post(`${URL}/api/Service/Suspend/${serviceId}`)
  }

  // Cambiar plan de servicio.
  static async changeServicePlan(serviceId, servicePlanId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.post(`${URL}/api/Service/ChangeServicePlan/${serviceId}/${servicePlanId}`)
  }

  // Agregar servicio.
  static async addService(serviceId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.post(`${URL}/api/Service/Add/${serviceId}`)
  }

  // Actualizar servicio.
  static async updateService(serviceId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.put(`${URL}/api/Service/Update/${serviceId}`)
  }

  // Borrar servicio.
  static async deleteService(serviceId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.delete(`${URL}/api/Service/Delete/${serviceId}`)
  }

  // ====================================================================================================

  // Lista de estado de cambios.
  static getWorkerActivities(serviceId, year) {
    return new Promise((resolve, reject) => {
      try {
        resolve(WorkerStore.getWorkerActivities(serviceId, year))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registra el cambio de estado.
  static createWorkerActivity(data, user) {
    return new Promise((resolve, reject) => {
      try {
        resolve(WorkerStore.createWorkerActivity(data, user))
      } catch (err) {
        reject(err)
      }
    })
  }

}
