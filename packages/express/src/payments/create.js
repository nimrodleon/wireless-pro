const Payment = require('./payments')
const Service = require('../services/services')

// Registra un Nuevo Pago.
const create = async (body, user) => {
  try {
    const payment = new Payment(body)
    payment.user = user
    if (!payment.service) {
      throw new Error('No Existe Servicio!')
    } else {
      await payment.save()
      const service = await Service.findById(payment.service)
      // registrar el último pago.
      service.payment = payment._id
      const updateService = await Service.findByIdAndUpdate(service._id, service, { new: true })
      await updateService.save()
      return payment
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = create
