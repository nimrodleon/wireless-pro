const {PaymentStore} = require("./store")

// Lógica - payment.
class PaymentController {
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

  // obtener pago por ID.
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
  static reportePagosDiario(date, method) {
    return new Promise((resolve, reject) => {
      try {
        resolve(PaymentStore.reportePagosDiario(date, method))
      } catch (err) {
        reject(err)
      }
    })
  }

}

module.exports = {
  PaymentController
}
