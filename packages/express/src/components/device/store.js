import _ from 'lodash'
import {Device} from './model'

// Listar dispositivos.
export async function getDevices(id, type = 'T0') {
  if (type === 'T0') {
    return Device.find({tramo: id})
  } else {
    return Device.find({tower: id})
  }
}

// devolver dispositivo por id.
export async function getDevice(id) {
  return Device.findById(id)
}

// registrar dispositivo.
export async function createDevice(data) {
  let _device = new Device(data)
  await _device.save()
  return _device
}

//  actualizar dispositivo.
export async function updateDevice(id, data) {
  return Device.findByIdAndUpdate(id, data, {new: true})
}

// borrar dispositivo.
export async function deleteDevice(id) {
  let _device = await getDevice(id)
  _device.isDeleted = true
  return updateDevice(id, _device)
}

// total de equipos para el tramo {id}.
export async function countDevicesByTramo(tramoId) {
  return Device.find({tramo: tramoId}).countDocuments()
}

// total de equipos por torre.
export async function countDevicesByTower(towerId) {
  return Device.find({tower: towerId}).countDocuments()
}

// Buscador select2.
export async function getDevicesS2(term) {
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
