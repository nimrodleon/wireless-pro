import {ServicePlan} from './model'

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
  return ServicePlan.findByIdAndDelete(id)
}
