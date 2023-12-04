const _ = require("lodash")
const {ServicePlan} = require("./servicePlan.model")
const {ServiceService} = require("../service/service.service")
const {Service} = require("../service/service.model")

const serviceService = new ServiceService()

// CRUD - Tarifa de internet.
class ServicePlanService {
  // Listar planes de servicios.
  async getServicePlans(query = "") {
    return ServicePlan.find({
      isDeleted: false,
      $or: [{name: {$regex: query}}]
    }).sort({"name": 1})
  }

  // devolver plan de servicio por id.
  async getServicePlan(id) {
    return ServicePlan.findById(id)
  }

  // registrar plan de servicio.
  async createServicePlan(data) {
    let _servicePlan = new ServicePlan(data)
    await _servicePlan.save()
    return _servicePlan
  }

  // actualizar plan de servicio.
   async updateServicePlan(id, data) {
    return ServicePlan.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar plan de servicio.
  async deleteServicePlan(id) {
    let _servicePlan = await this.getServicePlan(id)
    _servicePlan.isDeleted = true
    return this.updateServicePlan(id, _servicePlan)
  }

  // Lista de planes de servicios activos de un cliente en espécifico.
   async getServicePlansActive(clientId) {
    let _services = await serviceService.getServices(clientId)
    let idArrServicePlan = []
    await _.forEach(_services, value => {
      idArrServicePlan.push(value.servicePlan)
    })
    return ServicePlan.find({_id: {$in: idArrServicePlan}})
  }

  // Total, servicios del plan de servicio.
  async totalStatusServices(id, status) {
    return Service.find({
      servicePlanId: id, status: status, isDeleted: false,
      mikrotikId: {$exists: true}, interfaceId: {$exists: true}, coverageId: {$exists: true},
      ipAddress: {$exists: true}, macAddress: {$exists: true}, paymentType: {$exists: true},
      arpId: {$exists: true}, simpleQueueId: {$exists: true},
    }).countDocuments()
  }

  // Lista de servicios por tarifa.
  async getServicesList(id) {
    return Service.find({
      servicePlanId: id, status: {$in: ["HABILITADO", "SUSPENDIDO"]},
      mikrotikId: {$exists: true}, interfaceId: {$exists: true}, coverageId: {$exists: true},
      ipAddress: {$exists: true}, macAddress: {$exists: true}, paymentType: {$exists: true},
      arpId: {$exists: true}, simpleQueueId: {$exists: true}, isDeleted: false
    })
  }

}

module.exports = {
  ServicePlanService
}
