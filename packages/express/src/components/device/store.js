import _ from 'lodash'
import {Device} from './model'

// CRUD - equipos.
export class DeviceStore {
  // Listar dispositivos.
  // static async getDevices(id, type = 'T0') {
  //   if (type === 'T0') {
  //     return Device.find({tramo: id})
  //   } else {
  //     return Device.find({tower: id})
  //   }
  // }

  // obtener dispositivos por tramos.
  static async getDevicesByTramo(id) {
    return Device.find({tramo: id, isDeleted: false})
  }

  // devolver dispositivo por id.
  static async getDevice(id) {
    return Device.findById(id)
  }

  // registrar dispositivo.
  static async createDevice(data) {
    let _device = new Device(data)
    await _device.save()
    return _device
  }

  //  actualizar dispositivo.
  static async updateDevice(id, data) {
    return Device.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar dispositivo.
  static async deleteDevice(id) {
    let _device = await this.getDevice(id)
    _device.isDeleted = true
    return this.updateDevice(id, _device)
  }

  // total de equipos para el tramo {id}.
  static async countDevicesByTramo(tramoId) {
    return Device.find({tramo: tramoId}).countDocuments()
  }

  // total de equipos por torre.
  static async countDevicesByTower(towerId) {
    return Device.find({tower: towerId}).countDocuments()
  }

  // Buscador select2.
  static async getDevicesS2(term) {
    let _devices = await Device.find({
      mode: 'P', $or: [
        {ipAddress: {$regex: term}},
        {name: {$regex: term}}
      ]
    }).limit(10)
    let data = {results: []}
    await _.forEach(_devices, value => {
      data.results.push({id: value._id, text: `${value.name} - ${value.ipAddress}`})
    })
    return data
  }
}
