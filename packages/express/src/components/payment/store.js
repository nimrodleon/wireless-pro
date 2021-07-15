import {Payment} from './model'
import {ServiceStore} from '../service/store'

// CRUD - payment.
export class PaymentStore {
  // Listar pagos.
  static async getPayments(clientId, year) {
    return Payment.find({clientId: clientId, year: year, isDeleted: false})
      .populate({path: 'user', select: 'userName'})
  }

  // devolver pago por id.
  static async getPayment(id) {
    return Payment.findById(id)
  }

  // registrar pago.
  static async createPayment(data, userId) {
    return new Promise(async (resolve, reject) => {
      let _payment = new Payment(data)
      _payment.user = userId
      if (!_payment.service) {
        reject(new Error('No Existe Servicio!'))
      } else {
        await _payment.save()
        let _service = await ServiceStore.getService(_payment.service)
        // registrar el último pago.
        _service.payment = _payment._id
        await ServiceStore.updateService(_service._id, _service)
        resolve(_payment)
      }
    })
  }

  // borrar pago.
  static async deletePayment(id) {
    let _payment = await this.getPayment(id)
    _payment.isDeleted = true
    return Payment.findByIdAndUpdate(id, _payment, {new: true})
  }

  // reporte pago diario.
  static async reportDailyPay(date) {
    return Payment.find({
      created_date: date
    }).populate({path: 'client', select: 'fullName'})
      .populate({path: 'service', select: 'ipAddress'})
  }
}
