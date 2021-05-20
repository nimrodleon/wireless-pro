import * as store from './store'

// Listar materiales.
export function getMaterials(query = '') {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getMaterials(query))
    } catch (err) {
      reject(err)
    }
  })
}

// obtener material por id.
export function getMaterial(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getMaterial(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar material.
export function createMaterial(data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createMaterial(data))
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar material.
export function updateMaterial(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateMaterial(id, data))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar  material.
export function deleteMaterial(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deleteMaterial(id))
    } catch (err) {
      reject(err)
    }
  })
}
