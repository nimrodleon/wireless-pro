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
export async function createMaterial(material) {
  let _material = new Material(material)
  await _material.save()
  return _material
}

// actualizar material.
export async function updateMaterial(id, material) {
  return Material.findByIdAndUpdate(id, material, {new: true})
}

// borrar material.
export async function deleteMaterial(id) {
  return Material.findByIdAndDelete(id)
}
