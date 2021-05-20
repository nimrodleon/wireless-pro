import * as store from './store'

// Lista de planes de servicio.
export function getServicePlans(query = '') {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getServicePlans(query))
    } catch (err) {
      reject(err)
    }
  })
}

// devolver plan de servicio por id.
export function getServicePlan(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getServicePlan(id))
    } catch (err) {
      reject(id)
    }
  })
}

// registrar plan de servicio.
export function createServicePlan(data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createServicePlan(data))
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar plan de servicio.
export function updateServicePlan(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateServicePlan(id, data))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar plan de servicio.
export function deleteServicePlan(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deleteServicePlan(id))
    } catch (err) {
      reject(err)
    }
  })
}
