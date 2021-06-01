import _ from 'lodash'
import {Service} from './model'

// CRUD - services.
export class ServiceStore {
  // Listar servicios.
  static async getServices(clientId) {
    return Service.find({client: clientId})
      .populate('servicePlan')
  }

  // Listado de servicios sin => [servicePlan]
  static async getServicesV2(clientId) {
    return Service.find({client: clientId})
  }

  // devolver servicio por id.
  static async getService(id) {
    return Service.findById(id)
  }

  // registrar servicio.
  static async createService(data, userId) {
    let _service = new Service(data)
    _service.user = userId
    await _service.save()
    return _service
  }

  // actualizar servicio.
  static async updateService(id, data) {
    return Service.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar servicio.
  static async deleteService(id) {
    let _service = await this.getService(id)
    _service.isDeleted = true
    return this.updateService(id, _service)
  }

  // reporte instalaciones diarias.
  static async reportDailyInstallations(date) {
    return Service.find({createdAt: date})
      .populate({path: 'client', select: 'fullName'})
      .populate({path: 'servicePlan', select: 'name priceMonthly'})
  }

  // lista de servicios sin registro de pago.
  static async reportServicesWithoutPayment() {
    return Service.find({isActive: true, payment: {$exists: false}})
      .populate({path: 'client', select: 'fullName is_active', match: {'is_active': true}})
  }

  // Lista de servicios suspendidos.
  static async reportDisconnectedServices() {
    return Service.find({isActive: false})
      .populate({path: 'client', select: 'fullName'})
      .populate({path: 'servicePlan', select: 'name priceMonthly'})
  }

  // Lista de servicios según tarifa de pago.
  static async reportServicesByServicePlan(id) {
    return Service.find({isActive: true, servicePlan: id})
      .populate({path: 'client', select: 'fullName'})
      .populate('servicePlan')
  }

  // Lista de Clientes por Cobrar.
  static async reportServicesPayable(date) {
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
}
