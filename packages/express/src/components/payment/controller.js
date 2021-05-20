import * as store from './store'

// Listar pagos.
export function getPayments(clientId) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getPayments(clientId))
    } catch (err) {
      reject(err)
    }
  })
}

// obtener pago por id.
export function getPayment(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getPayment(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar pago.
export function createPayment(data, userId) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createPayment(data, userId))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar pago.
export function deletePayment(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deletePayment(id))
    } catch (err) {
      reject(err)
    }
  })
}

// reporte pago diario.
export function reportDailyPay(date) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.reportDailyPay(date))
    } catch (err) {
      reject(err)
    }
  })
}
