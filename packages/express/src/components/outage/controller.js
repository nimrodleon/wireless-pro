import * as store from './store'

// Lista de cortes.
export function getOutages(idService) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getOutages(idService))
    } catch (err) {
      reject(err)
    }
  })
}

// obtener el corte por id.
export function getOutage(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getOutage(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar corte.
export function createOutage(data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createOutage(data))
    } catch (err) {
      reject(err)
    }
  })
}
