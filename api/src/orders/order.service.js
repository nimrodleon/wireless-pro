const {Order, OrderMaterial} = require("./order.model")
const {Client} = require("../client/client.model")

// CRUD - órdenes de Trabajo.
class OrderService {
  // Lista de ordenes de trabajo.
  async getOrderList(query) {
    return Client.aggregate([
      {
        $match: {
          fullName: {$regex: query}
        }
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "clientId",
          as: "WorkOrder"
        }
      },
      {
        $project: {
          fullName: true,
          phone: true,
          WorkOrder: {
            $filter: {
              input: "$WorkOrder",
              as: "ord",
              cond: {
                $and: [
                  {$in: ["$$ord.statusOrder", ["PENDIENTE", "EN PROCESO"]]},
                  {$eq: ["$$ord.isDeleted", false]},
                ]
              }
            }
          }
        }
      },
      {
        $unwind: "$WorkOrder"
      }
    ])
  }

  // Lista de órdenes y filtrado por mes y año.
  async getOrderListByYearMonth(year, month, query) {
    return Client.aggregate([
      {
        $match: {
          fullName: {$regex: query}
        }
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "clientId",
          as: "WorkOrder"
        }
      },
      {
        $project: {
          fullName: true,
          phone: true,
          WorkOrder: {
            $filter: {
              input: "$WorkOrder",
              as: "ord",
              cond: {
                $and: [
                  {$eq: ["$$ord.year", year]},
                  {$eq: ["$$ord.month", month]},
                  {$eq: ["$$ord.isDeleted", false]}
                ]
              }
            }
          }
        }
      },
      {
        $unwind: "$WorkOrder"
      }
    ])
  }

  // Obtener orden de instalación por ID.
  async getOrderById(id) {
    return Order.findById(id)
  }

  // Obtener orden de instalación por ID cliente.
  async getOrderByClientId(id) {
    return Order.find({clientId: id, isDeleted: false})
  }

  // Registrar orden de instalación.
  async addOrder(data) {
    let _order = new Order(data)
    await _order.save()
    return _order
  }

  // actualizar orden de instalación.
  async updateOrder(id, data) {
    return Order.findByIdAndUpdate(id, data, {new: true})
  }

  // Borrar orden de instalación.
  async deleteOrder(id) {
    let _order = await this.getOrderById(id)
    _order.isDeleted = true
    return this.updateOrder(id, _order)
  }

  // ====================================================================================================

  // Lista de materiales.
  async getMaterials(orderId) {
    return OrderMaterial.find({orderId: orderId})
  }

  // Obtener material por id.
  async getMaterial(id) {
    return OrderMaterial.findById(id)
  }

  // registrar material.
  async addMaterial(data) {
    let _material = new OrderMaterial(data)
    await _material.save()
    return _material
  }

  // actualizar material.
  async updateMaterial(id, data) {
    return OrderMaterial.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar material.
  async deleteMaterial(id) {
    return OrderMaterial.findByIdAndDelete(id)
  }

}

module.exports = {
  OrderService
}
