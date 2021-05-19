import {Service} from './model'

// Listar servicios.
export async function getServices(clientId) {
  return Service.find({client: clientId})
    .populate('servicePlan')
}

// devolver servicio por id.
export async function getService(id) {
  return Service.findById(id)
}

// registrar servicio.
export async function createService(data, userId) {
  let _service = new Service(data)
  _service.user = userId
  await _service.save()
  return _service
}

// actualizar servicio.
export async function updateService(id, data) {
  return Service.findByIdAndUpdate(id, data, {new: true})
}

// borrar servicio.
export async function deleteService(id) {
  let _service = await getService(id)
  _service.isDeleted = true
  return updateService(id, _service)
}
