import {PaymentStore} from './store'

// Lógica - payment.
export class PaymentController {
  // Listar pagos.
  static getPayments(serviceId, year) {
    return new Promise((resolve, reject) => {
      try {
        resolve(PaymentStore.getPayments(serviceId, year))
      } catch (err) {
        reject(err)
      }
    })
  }

  // obtener pago por id.
  static getPayment(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(PaymentStore.getPayment(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar pago.
  static createPayment(data, userId) {
    return new Promise((resolve, reject) => {
      try {
        resolve(PaymentStore.createPayment(data, userId))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar pago.
  static deletePayment(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(PaymentStore.deletePayment(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // reporte pago diario.
  static reportePagosDiario(date) {
    return new Promise((resolve, reject) => {
      try {
        resolve(PaymentStore.reportePagosDiario(date))
      } catch (err) {
        reject(err)
      }
    })
  }

}
