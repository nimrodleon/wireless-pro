const {ServiceStore} = require("./store")

// Lógica - services.
class ServiceController {
  // Lista de servicios.
  static getServices(clientId) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServiceStore.getServices(clientId))
      } catch (err) {
        reject(err)
      }
    })
  }

  // obtener servicio por id.
  static getService(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServiceStore.getService(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar servicio.
  static createService(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServiceStore.createService(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar servicio.
  static updateService(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServiceStore.updateService(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar servicio.
  static deleteService(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServiceStore.deleteService(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Lista de servicios temporales.
  static getTemporalServices() {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServiceStore.getTemporalServices())
      } catch (err) {
        reject(err)
      }
    })
  }

  // reporte clientes por cobrar.
  static reporteClientesPorCobrar(date, type) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServiceStore.reporteClientesPorCobrar(date, type))
      } catch (err) {
        reject(err)
      }
    })
  }

  // reporte servicios sin registro de pago.
  static reporteServicioSinRegistroDePago() {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServiceStore.reporteServicioSinRegistroDePago())
      } catch (err) {
        reject(err)
      }
    })
  }

}

module.exports = {
  ServiceController
}
