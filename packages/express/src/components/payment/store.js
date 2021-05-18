import {Payment} from './model'
import * as service from '../service/store'

// Listar pagos.
export async function getPayments(clientId) {
  return Payment.find({client: clientId})
    .populate('service')
    .populate({path: 'user', select: 'userName'})
}

// devolver pago por id.
export async function getPayment(id) {
  return Payment.findById(id)
}

// registrar pago.
export async function createPayment(data, userId) {
  return new Promise(async (resolve, reject) => {
    let _payment = new Payment(data)
    _payment.user = userId
    if (!_payment.service) {
      reject(new Error('No Existe Servicio!'))
    } else {
      await _payment.save()
      let _service = await service.getService(_payment.service)
      // registrar el último pago.
      _service.payment = _payment._id
      await service.updateService(_service._id, _service)
      resolve(_payment)
    }
  })
}

// borrar pago.
export async function deletePayment(id) {
  let _payment = await getPayment(id)
  _payment.isDeleted = true
  return Payment.findByIdAndUpdate(id, _payment, {new: true})
}
