// import _ from 'lodash'
import {Service} from './model'

// CRUD - services.
export class ServiceStore {
  // Listar servicios.
  static async getServices(clientId) {
    return Service.find({clientId: clientId, isDeleted: false})
  }

  // Listado de servicios sin => [servicePlan]
  // static async getServicesV2(clientId) {
  //   return Service.find({client: clientId})
  // }

  // devolver servicio por id.
  static async getService(id) {
    return Service.findById(id)
  }

  // registrar servicio.
  static async createService(data) {
    let _service = new Service(data)
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

  // cambiar plan de servicio.
  static async changeServicePlan(id, servicePlanId) {
    let _service = await this.getService(id)
    _service.servicePlanId = servicePlanId
    return this.updateService(id, _service)
  }

  // reporte clientes por cobrar.
  static async reporteClientesPorCobrar(date) {
    return Service.find({
      status: 'H', lastPayment: {$exists: true}, paidUpTo: {$lt: date}, isDeleted: false
    }).populate({path: 'clientId', select: 'fullName'})
  }

  // reporte servicios sin registro de pago.
  static async reporteServicioSinRegistroDePago() {
    return Service.find({status: 'H', lastPayment: {$exists: false}, isDeleted: false})
      .populate({path: 'clientId', select: 'fullName'})
  }

  // reporte instalaciones diarias.
  // static async reportDailyInstallations(date) {
  //   return Service.find({createdAt: date})
  //     .populate({path: 'client', select: 'fullName'})
  //     .populate({path: 'servicePlan', select: 'name priceMonthly'})
  // }

  // Lista de servicios suspendidos.
  // static async reportDisconnectedServices() {
  //   return Service.find({isActive: false})
  //     .populate({path: 'client', select: 'fullName'})
  //     .populate({path: 'servicePlan', select: 'name priceMonthly'})
  // }

  // Lista de servicios según tarifa de pago.
  // static async reportServicesByServicePlan(id) {
  //   return Service.find({isActive: true, servicePlan: id})
  //     .populate({path: 'client', select: 'fullName'})
  //     .populate('servicePlan')
  // }

}
