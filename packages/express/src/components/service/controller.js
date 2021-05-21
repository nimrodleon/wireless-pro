import * as store from './store'

// Lista de servicios.
export function getServices(clientId) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getServices(clientId))
    } catch (err) {
      reject(err)
    }
  })
}

// obtener servicio por id.
export function getService(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getService(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar servicio.
export function createService(data, userId) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createService(data, userId))
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar servicio.
export function updateService(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateService(id, data))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar servicio.
export function deleteService(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deleteService(id))
    } catch (err) {
      reject(err)
    }
  })
}

// reporte instalaciones diarias.
export function reportDailyInstallations(date) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.reportDailyInstallations(date))
    } catch (err) {
      reject(err)
    }
  })
}
