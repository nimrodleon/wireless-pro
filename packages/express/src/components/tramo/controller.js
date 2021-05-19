import * as store from './store'
import {countDevicesByTramo} from '../device/store'

// Lista de tramos.
export function getTramos(query) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getTramos(query))
    } catch (err) {
      reject(err)
    }
  })
}

// devolver tramo por id.
export function getTramo(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getTramo(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar tramo.
export function createTramo(data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createTramo(data))
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar tramo.
export function updateTramo(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateTramo(id, data))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar tramo.
export function deleteTramo(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deleteTramo(id))
    } catch (err) {
      reject(err)
    }
  })
}

// Total de equipos para el tramo {id}.
export function countDevices(tramoId) {
  return new Promise((resolve, reject) => {
    try {
      resolve(countDevicesByTramo(tramoId))
    } catch (err) {
      reject(err)
    }
  })
}
