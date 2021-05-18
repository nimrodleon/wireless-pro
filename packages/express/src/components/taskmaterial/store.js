import {TaskMaterial} from './model'

// Listar materiales.
export async function getTaskMaterials(taskId) {
  return TaskMaterial.find({task: taskId}).populate('material')
}

// devolver material por id.
export async function getTaskMaterial(id) {
  return TaskMaterial.findById(id)
}

// registrar material.
export async function createTaskMaterial(data) {
  let _taskMaterial = new TaskMaterial(data)
  await _taskMaterial.save()
  return _taskMaterial
}

// actualizar material.
export async function updateTaskMaterial(id, data) {
  return TaskMaterial.findByIdAndUpdate(id, data, {new: true})
}

// borrar material.
export async function deleteTaskMaterial(id) {
  return TaskMaterial.findByIdAndDelete(id)
}
