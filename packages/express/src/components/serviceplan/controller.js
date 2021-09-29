import {ServicePlanStore} from './store'

// Lógica - Tarifa de internet.
export class ServicePlanController {
  // Lista de planes de servicio.
  static getServicePlans(query = '') {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServicePlanStore.getServicePlans(query))
      } catch (err) {
        reject(err)
      }
    })
  }

  // devolver plan de servicio por id.
  static getServicePlan(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServicePlanStore.getServicePlan(id))
      } catch (err) {
        reject(id)
      }
    })
  }

  // registrar plan de servicio.
  static createServicePlan(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServicePlanStore.createServicePlan(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar plan de servicio.
  static updateServicePlan(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServicePlanStore.updateServicePlan(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar plan de servicio.
  static deleteServicePlan(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServicePlanStore.deleteServicePlan(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Lista de planes de servicios activos de un cliente especifico.
  static getServicePlansActive(clientId) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServicePlanStore.getServicePlansActive(clientId))
      } catch (err) {
        reject(err)
      }
    })
  }

  // ============================================================

  // total servicios activos.
  static totalEnabledServices(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServicePlanStore.totalStatusServices(id, 'HABILITADO'))
      } catch (err) {
        reject(err)
      }
    })
  }

  // total servicios suspendidos.
  static totalSuspendedServices(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ServicePlanStore.totalStatusServices(id, 'SUSPENDIDO'))
      } catch (err) {
        reject(err)
      }
    })
  }

}
