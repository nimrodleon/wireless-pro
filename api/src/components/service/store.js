import {Service} from './model'

// CRUD - services.
export class ServiceStore {
  // Listar servicios.
  static async getServices(clientId) {
    return Service.find({clientId: clientId, isDeleted: false})
  }

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

  // lista de servicios temporales.
  static async getTemporalServices() {
    return Service.find({temporal: true, isDeleted: false})
      .populate({path: 'clientId', select: 'fullName'})
  }

  // reporte clientes por cobrar.
  static async reporteClientesPorCobrar(date, type) {
    return Service.find({
      status: 'HABILITADO', paymentType: type, lastPayment: {$exists: true}, paidUpTo: {$lt: date}, isDeleted: false
    }).populate({path: 'clientId', select: 'fullName'})
  }

  // reporte servicios sin registro de pago.
  static async reporteServicioSinRegistroDePago() {
    return Service.find({status: 'HABILITADO', lastPayment: {$exists: false}, isDeleted: false})
      .populate({path: 'clientId', select: 'fullName'})
  }

}
