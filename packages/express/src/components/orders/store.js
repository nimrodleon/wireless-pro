import {Order, OrderMaterial} from './model'
import {Client} from '../client/model'

// CRUD - Ordenes de Instalación.
export class OrderStore {
  // Lista de ordenes de instalación.
  static async getOrderList(query) {
    return Client.aggregate([
      {
        $match: {
          fullName: {$regex: query}
        }
      },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'clientId',
          as: 'InstallationOrder'
        }
      },
      {
        $project: {
          fullName: true,
          phone: true,
          InstallationOrder: {
            $filter: {
              input: '$InstallationOrder',
              as: 'ord',
              cond: {
                $or: [
                  {$eq: ['$$ord.statusOrder', 'PENDIENTE']},
                  {$eq: ['$$ord.statusOrder', 'EN PROCESO']},
                ]
              }
            }
          }
        }
      },
      {
        $unwind: '$InstallationOrder'
      }
    ])
  }

  // Lista de ordenes filtrado por mes y año.
  static async getOrderListByYearMonth(year, month, query) {
    return Client.aggregate([
      {
        $match: {
          fullName: {$regex: query}
        }
      },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'clientId',
          as: 'InstallationOrder'
        }
      },
      {
        $project: {
          fullName: true,
          InstallationOrder: {
            $filter: {
              input: '$InstallationOrder',
              as: 'order',
              cond: {
                $and: [
                  {$eq: {'$$order.year': year}},
                  {$eq: {'$$order.month': month}},
                ]
              }
            }
          }
        }
      },
      {
        $unwind: '$InstallationOrder'
      }
    ])
  }

  // Obtener orden de instalación por id.
  static async getOrderById(id) {
    return Order.findById(id)
  }

  // Registrar orden de instalación.
  static async addOrder(data) {
    let _order = new Order(data)
    await _order.save()
    return _order
  }

  // actualizar orden de instalación.
  static async updateOrder(id, data) {
    return Order.findByIdAndUpdate(id, data, {new: true})
  }

  // Borrar orden de instalación.
  static async deleteOrder(id) {
    let _order = await this.getOrderById(id)
    _order.isDeleted = true
    return this.updateOrder(id, _order)
  }

  // ========================================
  // Lista de materiales.
  static async getMaterials(orderId) {
    return OrderMaterial.find({orderId: orderId})
  }

  // Obtener material por id.
  static async getMaterial(id) {
    return OrderMaterial.findById(id)
  }

  // registrar material.
  static async addMaterial(data) {
    let _material = new OrderMaterial(data)
    await _material.save()
    return _material
  }

  // actualizar material.
  static async updateMaterial(id, data) {
    return OrderMaterial.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar material.
  static async deleteMaterial(id) {
    return OrderMaterial.findByIdAndDelete(id)
  }

}
