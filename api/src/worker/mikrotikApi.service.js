const axios = require("axios")

// Lógica bitWorker.
class MikrotikApiService {
  // Cambiar estado del servicio.
  async changeStatusService(serviceId, status) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return axios.post(`${URL}/api/Service/ChangeStatusService/${serviceId}/${status}`)
  }

  // Cambiar plan de servicio.
  async changeServicePlan(serviceId, servicePlanId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return axios.post(`${URL}/api/Service/ChangeServicePlan/${serviceId}/${servicePlanId}`)
  }

  // Agregar servicio.
  async addService(serviceId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return axios.post(`${URL}/api/Service/Add/${serviceId}`)
  }

  // Actualizar servicio.
  async updateService(serviceId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return axios.put(`${URL}/api/Service/Update/${serviceId}`)
  }

  // Borrar servicio.
  async deleteService(serviceId) {
    const URL = process.env.URL_BIT_WORKER
    const token = process.env.TOKEN_BIT_WORKER
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return axios.delete(`${URL}/api/Service/Delete/${serviceId}`)
  }

}

module.exports = {
  MikrotikApiService
}
