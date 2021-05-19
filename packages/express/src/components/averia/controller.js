import * as store from './store'

// Lista de averias.
export function getAverias(query, status) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getAverias(query, status))
    } catch (err) {
      reject(err)
    }
  })
}

// devolver averia por id.
export function getAveria(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getAveria(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar averia.
export function createAveria(data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createAveria(data))
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar averia.
export function updateAveria(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateAveria(id, data))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar averia.
export function deleteAveria(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deleteAveria(id))
    } catch (err) {
      reject(err)
    }
  })
}
