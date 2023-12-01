const {Material} = require("./model")
const _ = require("lodash")

// CRUD - materiales.
class MaterialStore {
  // Listar materiales.
  static async getMaterials(query = "") {
    return Material.find({
      isDeleted: false,
      $or: [
        {description: {$regex: query}}
      ]
    }).hint({$natural: -1}).limit(50)
  }

  // devolver material por id.
  static async getMaterial(id) {
    return Material.findById(id)
  }

  // registrar material.
  static async createMaterial({_id, ...data}) {
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

  // buscar materiales con select2.
  static async getMaterialWithSelect2(term) {
    let _materials = await Material.find({
      isDeleted: false, $or: [{description: {$regex: term}}]
    }).limit(10)
    let data = {results: []}
    await _.forEach(_materials, value => {
      data.results.push({id: value._id, text: value.description})
    })
    return data
  }
}

module.exports = {
  MaterialStore
}
