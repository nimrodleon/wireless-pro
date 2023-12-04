const _ = require("lodash")
const {Device} = require("./device.model")

// CRUD - equipos.
class DeviceService {
  // Listar dispositivos.
  // static async getDevices(id, type = 'T0') {
  //   if (type === 'T0') {
  //     return Device.find({tramo: id})
  //   } else {
  //     return Device.find({tower: id})
  //   }
  // }

  // obtener dispositivos por tramos.
  async getDevicesByTramo(id) {
    return Device.find({tramo: id, isDeleted: false})
  }

  // devolver dispositivo por id.
  async getDevice(id) {
    return Device.findById(id)
  }

  // Registrar dispositivo.
  // Excluir (_id) del objeto para registrar el equipo.
  async createDevice({_id, ...data}) {
    let _device = new Device(data)
    await _device.save()
    return _device
  }

  //  actualizar dispositivo.
  async updateDevice(id, data) {
    return Device.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar dispositivo.
  async deleteDevice(id) {
    let _device = await this.getDevice(id)
    _device.isDeleted = true
    return this.updateDevice(id, _device)
  }

  // total de equipos para el tramo {id}.
  async countDevicesByTramo(tramoId) {
    return Device.find({tramo: tramoId}).countDocuments()
  }

  // total de equipos por torre.
  async countDevicesByTower(towerId) {
    return Device.find({tower: towerId}).countDocuments()
  }

  // Buscador select2.
  async getDevicesS2(term) {
    let _devices = await Device.find({
      mode: "P", $or: [
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

module.exports = {
  DeviceService
}
