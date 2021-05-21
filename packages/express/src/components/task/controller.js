import * as store from './store'

// obtener tareas por id.
export function getTask(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getTask(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar tarea.
export function createTask(data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createTask(data))
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar tarea.
export function updateTask(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateTask(id, data))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar tarea.
export function deleteTask(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deleteTask(id))
    } catch (err) {
      reject(err)
    }
  })
}

// buscar tareas por mes y año.
export function getTasksByYearAndMonth(query, year, month) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getTasksByYearAndMonth(query, year, month))
    } catch (err) {
      reject(err)
    }
  })
}

// filtrar por status v1.
export function getTasksByStatusV1(status) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getTasksByStatusV1(status))
    } catch (err) {
      reject(err)
    }
  })
}

// filtrar por status v2.
export function getTasksByStatusV2(status, query) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getTasksByStatusV2(status, query))
    } catch (err) {
      reject(err)
    }
  })
}
