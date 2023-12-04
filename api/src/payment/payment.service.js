const {Payment} = require("./payment.model")
const {ServiceService} = require("../service/service.service")

const serviceService = new ServiceService()

// CRUD - payment.
class PaymentService {
  // Listar pagos.
  async getPayments(serviceId, year) {
    return Payment.find({serviceId: serviceId, year: year, isDeleted: false})
      .populate({path: "user", select: "fullName"})
  }

  // devolver pago por id.
  async getPayment(id) {
    return Payment.findById(id)
  }

  // registrar pago.
  async createPayment(data, userId) {
    let _payment = new Payment(data)
    _payment.user = userId
    await _payment.save()
    let _service = await serviceService.getService(_payment.serviceId)
    _service.lastPayment = _payment._id
    _service.paidUpTo = _payment.payUp
    await ServiceStore.updateService(_service._id, _service)
    return _payment
  }

  // borrar pago.
  async deletePayment(id) {
    let _payment = await this.getPayment(id)
    _payment.isDeleted = true
    return Payment.findByIdAndUpdate(id, _payment, {new: true})
  }

  // reporte pago diario.
  async reportePagosDiario(date, method) {
    return Payment.find({createdAt: date, paymentMethod: method, isDeleted: false})
      .populate({path: "clientId", select: "fullName"})
      .populate({path: "serviceId", select: "ipAddress"})
  }

}

module.exports = {
  PaymentService
}
