import {Material} from './model'

// CRUD - materiales.
export class MaterialStore {
  // Listar materiales.
  static async getMaterials(query = '') {
    return Material.find({
      $or: [
        {description: {$regex: query}}
      ]
    })
  }

  // devolver material por id.
  static async getMaterial(id) {
    return Material.findById(id)
  }

  // registrar material.
  static async createMaterial(data) {
    let _material = new Material(data)
    await _material.save()
    return _material
  }

  // actualizar material.
  static async updateMaterial(id, data) {
    return Material.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar material.
  static async deleteMaterial(id) {
    let _material = await this.getMaterial(id)
    _material.isDeleted = true
    return this.updateMaterial(id, _material)
  }
}
