import {Material} from './model'

// Listar materiales.
export async function getMaterials(query = '') {
  return Material.find({
    $or: [
      {description: {$regex: query}}
    ]
  })
}

// devolver material por id.
export async function getMaterial(id) {
  return Material.findById(id)
}

// registrar material.
export async function createMaterial(data) {
  let _material = new Material(data)
  await _material.save()
  return _material
}

// actualizar material.
export async function updateMaterial(id, data) {
  return Material.findByIdAndUpdate(id, data, {new: true})
}

// borrar material.
export async function deleteMaterial(id) {
  let _material = await getMaterial(id)
  _material.isDeleted = true
  return updateMaterial(id, _material)
}
