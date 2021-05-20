import {ServicePlan} from './model'
import {getServicesV2} from '../service/store'
import _ from 'lodash'

// Listar planes de servicios.
export async function getServicePlans(query = '') {
  return ServicePlan.find({
    $or: [{name: {$regex: query}}]
  }).sort({'name': 1})
}

// devolver plan de servicio por id.
export async function getServicePlan(id) {
  return ServicePlan.findById(id)
}

// registrar plan de servicio.
export async function createServicePlan(data) {
  let _servicePlan = new ServicePlan(data)
  await _servicePlan.save()
  return _servicePlan
}

// actualizar plan de servicio.
export async function updateServicePlan(id, data) {
  return ServicePlan.findByIdAndUpdate(id, data, {new: true})
}

// borrar plan de servicio.
export async function deleteServicePlan(id) {
  let _servicePlan = await getServicePlan(id)
  _servicePlan.isDeleted = true
  return updateServicePlan(id, _servicePlan)
}

// Lista de planes de servicios activos de un cliente en especifico.
export async function getServicePlansActive(clientId) {
  let _services = await getServicesV2(clientId)
  let idArrServicePlan = []
  await _.forEach(_services, value => {
    idArrServicePlan.push(value.servicePlan)
  })
  return ServicePlan.find({_id: {$in: idArrServicePlan}})
}
