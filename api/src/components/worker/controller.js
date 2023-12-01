const axios = require("axios")
const {WorkerStore} = require("./store")

// Lógica bitWorker.
class WorkerController {
  // Cambiar estado del servicio.
  static async changeStatusService(serviceId, status) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return axios.post(`${URL}/api/Service/ChangeStatusService/${serviceId}/${status}`)
  }

  // Cambiar plan de servicio.
  static async changeServicePlan(serviceId, servicePlanId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return axios.post(`${URL}/api/Service/ChangeServicePlan/${serviceId}/${servicePlanId}`)
  }

  // Agregar servicio.
  static async addService(serviceId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return axios.post(`${URL}/api/Service/Add/${serviceId}`)
  }

  // Actualizar servicio.
  static async updateService(serviceId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return axios.put(`${URL}/api/Service/Update/${serviceId}`)
  }

  // Borrar servicio.
  static async deleteService(serviceId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
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

module.exports = {
  WorkerController
}
