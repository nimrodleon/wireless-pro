import _ from 'lodash'
import {Service} from './model'

// Listar servicios.
export async function getServices(clientId) {
  return Service.find({client: clientId})
    .populate('servicePlan')
}

// Listado de servicios sin => [servicePlan]
export async function getServicesV2(clientId) {
  return Service.find({client: clientId})
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

// reporte instalaciones diarias.
export async function reportDailyInstallations(date) {
  return Service.find({createdAt: date})
    .populate({path: 'client', select: 'fullName'})
    .populate({path: 'servicePlan', select: 'name priceMonthly'})
}

// lista de servicios sin registro de pago.
export async function reportServicesWithoutPayment() {
  return Service.find({isActive: true, payment: {$exists: false}})
    .populate({path: 'client', select: 'fullName is_active', match: {'is_active': true}})
}

// Lista de servicios suspendidos.
export async function reportDisconnectedServices() {
  return Service.find({isActive: false})
    .populate({path: 'client', select: 'fullName'})
    .populate({path: 'servicePlan', select: 'name priceMonthly'})
}

// Lista de servicios según tarifa de pago.
export async function reportServicesByServicePlan(id) {
  return Service.find({isActive: true, servicePlan: id})
    .populate({path: 'client', select: 'fullName'})
    .populate('servicePlan')
}

// Lista de Clientes por Cobrar.
export async function reportServicesPayable(date) {
  let _services = await Service.find({
    isActive: true, payment: {$exists: true}
  }).select('ipAddress isActive')
    .populate({
      path: 'payment', select: 'payUp',
      match: {payUp: {$lt: date}}
    }).populate({path: 'client', select: 'fullName'})
  let arrServices = []
  await _.forEach(_services, value => {
    if (value.payment) {
      arrServices.push(value)
    }
  })
  return arrServices
}
