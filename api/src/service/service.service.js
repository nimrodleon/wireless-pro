const {Service} = require("./service.model")

// CRUD - services.
class ServiceService {
  // Listar servicios.
  async getServices(clientId) {
    return Service.find({clientId: clientId, isDeleted: false})
  }

  // devolver servicio por ID.
  async getService(id) {
    return Service.findById(id)
  }

  // registrar servicio.
  async createService(data) {
    let _service = new Service(data)
    await _service.save()
    return _service
  }

  // actualizar servicio.
  async updateService(id, data) {
    return Service.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar servicio.
  async deleteService(id) {
    let _service = await this.getService(id)
    _service.isDeleted = true
    return this.updateService(id, _service)
  }

  // lista de servicios temporales.
  async getTemporalServices() {
    return Service.find({temporal: true, isDeleted: false})
      .populate({path: "clientId", select: "fullName"})
  }

  // reporte clientes por cobrar.
  async reporteClientesPorCobrar(date, type) {
    return Service.find({
      status: "HABILITADO", paymentType: type, lastPayment: {$exists: true}, paidUpTo: {$lt: date}, isDeleted: false
    }).populate({path: "clientId", select: "fullName"})
  }

  // reporte servicios sin registro de pago.
  async reporteServicioSinRegistroDePago() {
    return Service.find({status: "HABILITADO", lastPayment: {$exists: false}, isDeleted: false})
      .populate({path: "clientId", select: "fullName"})
  }

}

module.exports = {
  ServiceService
}
