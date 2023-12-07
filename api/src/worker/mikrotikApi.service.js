const axios = require("axios")

class MikrotikApiService {
  constructor() {
    this.URL = process.env.URL_BIT_WORKER
    this.token = process.env.TOKEN_BIT_WORKER
    this.baseURL = `${this.URL}/api/Service`
    this.headers = {
      Authorization: `Bearer ${this.token}`,
    }
  }

  async makeRequest(method, endpoint, data = null) {
    const config = {
      method,
      url: `${this.baseURL}/${endpoint}`,
      headers: this.headers,
      data,
    }

    return axios(config)
  }

  async changeStatusService(serviceId, status) {
    return this.makeRequest("post", `ChangeStatusService/${serviceId}/${status}`)
  }

  async changeServicePlan(serviceId, servicePlanId) {
    return this.makeRequest("post", `ChangeServicePlan/${serviceId}/${servicePlanId}`)
  }

  async addService(serviceId) {
    return this.makeRequest("post", `Add/${serviceId}`)
  }

  async updateService(serviceId) {
    return this.makeRequest("put", `Update/${serviceId}`)
  }

  async deleteService(serviceId) {
    return this.makeRequest("delete", `Delete/${serviceId}`)
  }
}

module.exports = {
  MikrotikApiService,
}
