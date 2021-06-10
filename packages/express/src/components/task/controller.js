import {TaskStore} from './store'

// Lógica - tareas.
export class TaskController {
  // obtener tareas por id.
  static getTask(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TaskStore.getTask(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar tarea.
  static createTask(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TaskStore.createTask(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar tarea.
  static updateTask(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TaskStore.updateTask(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar tarea.
  static deleteTask(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TaskStore.deleteTask(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // buscar tareas por mes y año.
  static getTasksByYearAndMonth(query, year, month) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TaskStore.getTasksByYearAndMonth(query, year, month))
      } catch (err) {
        reject(err)
      }
    })
  }

  // filtrar por status v1.
  // static getTasksByStatusV1(status) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       resolve(TaskStore.getTasksByStatusV1(status))
  //     } catch (err) {
  //       reject(err)
  //     }
  //   })
  // }

  // filtrar por status v2.
  static getTasksByStatusV2(status, query) {
    return new Promise((resolve, reject) => {
      try {
        resolve(TaskStore.getTasksByStatusV2(status, query))
      } catch (err) {
        reject(err)
      }
    })
  }

}
