import * as store from './store'

// Listar equipos.
export function getDevices(id, type = 'T0') {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getDevices(id, type))
    } catch (err) {
      reject(err)
    }
  })
}

// devolver equipo por id.
export function getDevice(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getDevice(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar equipos.
export function createDevice(data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createDevice(data))
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar equipos.
export function updateDevice(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateDevice(id, data))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar equipo.
export function deleteDevice(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deleteDevice(id))
    } catch (err) {
      reject(err)
    }
  })
}

// buscador select2.
export function getDevicesS2(term) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getDevicesS2(term))
    } catch (err) {
      reject(err)
    }
  })
}
