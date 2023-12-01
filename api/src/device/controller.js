const {DeviceStore} = require("./store")

// Lógica - Equipos.
class DeviceController {
  // Listar equipos.
  // static getDevices(id, type = 'T0') {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       resolve(DeviceStore.getDevices(id, type))
  //     } catch (err) {
  //       reject(err)
  //     }
  //   })
  // }

  // Obtener equipos por tramos.
  static getDevicesByTramo(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(DeviceStore.getDevicesByTramo(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // devolver equipo por ID.
  static getDevice(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(DeviceStore.getDevice(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar equipos.
  static createDevice(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(DeviceStore.createDevice(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar equipos.
  static updateDevice(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(DeviceStore.updateDevice(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar equipo.
  static deleteDevice(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(DeviceStore.deleteDevice(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // buscador select2.
  static getDevicesS2(term) {
    return new Promise((resolve, reject) => {
      try {
        resolve(DeviceStore.getDevicesS2(term))
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = {
  DeviceController
}
