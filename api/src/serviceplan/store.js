const _ = require("lodash")
const {ServicePlan} = require("./model")
const {ServiceStore} = require("../service/service.service")
const {Service} = require("../service/service.model")

// CRUD - Tarifa de internet.
class ServicePlanStore {
  // Listar planes de servicios.
  static async getServicePlans(query = "") {
    return ServicePlan.find({
      isDeleted: false,
      $or: [{name: {$regex: query}}]
    }).sort({"name": 1})
  }

  // devolver plan de servicio por id.
  static async getServicePlan(id) {
    return ServicePlan.findById(id)
  }

  // registrar plan de servicio.
  static async createServicePlan(data) {
    let _servicePlan = new ServicePlan(data)
    await _servicePlan.save()
    return _servicePlan
  }

  // actualizar plan de servicio.
  static async updateServicePlan(id, data) {
    return ServicePlan.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar plan de servicio.
  static async deleteServicePlan(id) {
    let _servicePlan = await this.getServicePlan(id)
    _servicePlan.isDeleted = true
    return this.updateServicePlan(id, _servicePlan)
  }

  // Lista de planes de servicios activos de un cliente en especifico.
  static async getServicePlansActive(clientId) {
    let _services = await ServiceStore.getServicesV2(clientId)
    let idArrServicePlan = []
    await _.forEach(_services, value => {
      idArrServicePlan.push(value.servicePlan)
    })
    return ServicePlan.find({_id: {$in: idArrServicePlan}})
  }

  // total servicios del plan de servicio.
  static async totalStatusServices(id, status) {
    return Service.find({
      servicePlanId: id, status: status, isDeleted: false,
      mikrotikId: {$exists: true}, interfaceId: {$exists: true}, coverageId: {$exists: true},
      ipAddress: {$exists: true}, macAddress: {$exists: true}, paymentType: {$exists: true},
      arpId: {$exists: true}, simpleQueueId: {$exists: true},
    }).countDocuments()
  }

  // Lista de servicios por tarifa.
  static async getServicesList(id) {
    return Service.find({
      servicePlanId: id, status: {$in: ["HABILITADO", "SUSPENDIDO"]},
      mikrotikId: {$exists: true}, interfaceId: {$exists: true}, coverageId: {$exists: true},
      ipAddress: {$exists: true}, macAddress: {$exists: true}, paymentType: {$exists: true},
      arpId: {$exists: true}, simpleQueueId: {$exists: true}, isDeleted: false
    })
  }

}

module.exports = {
  ServicePlanStore
}
