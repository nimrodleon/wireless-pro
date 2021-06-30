import {OrderStore} from './store'

// Lógica - Orden de Instalación.
export class OrderController {
  // Lista de ordenes de instalación.
  static async getOrderList(query) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OrderStore.getOrderList(query))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Lista de ordenes filtrado por mes y año.
  static async getOrderListByYearMonth(year, month, query) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OrderStore.getOrderListByYearMonth(year, month, query))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Obtener orden de instalación por id.
  static async getOrderById(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OrderStore.getOrderById(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Registrar orden de instalación.
  static async addOrder(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OrderStore.addOrder(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar orden de instalación.
  static async updateOrder(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OrderStore.updateOrder(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Borrar orden de instalación.
  static async deleteOrder(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OrderStore.deleteOrder(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // ========================================
  // Lista de materiales.
  static async getMaterials(orderId) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OrderStore.getMaterials(orderId))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Obtener material por id.
  static async getMaterial(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OrderStore.getMaterial(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar material.
  static async addMaterial(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OrderStore.addMaterial(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar material.
  static async updateMaterial(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OrderStore.updateMaterial(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar material.
  static async deleteMaterial(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(OrderStore.deleteMaterial(id))
      } catch (err) {
        reject(err)
      }
    })
  }

}
