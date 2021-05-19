import * as store from './store'

// Lista de areas cobertura.
export function getCoverages(query) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getCoverages(query))
    } catch (err) {
      reject(err)
    }
  })
}

// obtener area cobertura por id.
export function getCoverage(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getCoverage(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar area cobertura.
export function createCoverage(data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createCoverage(data))
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar area cobertura.
export function updateCoverage(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateCoverage(id, data))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar area cobertura.
export function deleteCoverage(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deleteCoverage(id))
    } catch (err) {
      reject(err)
    }
  })
}
