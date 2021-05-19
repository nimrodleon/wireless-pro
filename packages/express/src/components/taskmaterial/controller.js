import * as store from './store'

// Lista de materiales
export function getTaskMaterials(taskId) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getTaskMaterials(taskId))
    } catch (err) {
      reject(err)
    }
  })
}

// devolver material por id.
export function getTaskMaterial(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getTaskMaterial(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar taskMaterial.
export function createTaskMaterial(data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createTaskMaterial(data))
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar taskMaterial.
export function updateTaskMaterial(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateTaskMaterial(id, data))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar taskMaterial.
export function deleteTaskMaterial(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deleteTaskMaterial(id))
    } catch (err) {
      reject(err)
    }
  })
}
