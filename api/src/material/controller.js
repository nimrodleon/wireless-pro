const {MaterialStore} = require("./store")

// Lógica - materiales.
class MaterialController {
  // Listar materiales.
  static getMaterials(query = "") {
    return new Promise((resolve, reject) => {
      try {
        resolve(MaterialStore.getMaterials(query))
      } catch (err) {
        reject(err)
      }
    })
  }

  // obtener material por id.
  static getMaterial(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MaterialStore.getMaterial(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar material.
  static createMaterial(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MaterialStore.createMaterial(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar material.
  static updateMaterial(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MaterialStore.updateMaterial(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar  material.
  static deleteMaterial(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MaterialStore.deleteMaterial(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // buscar material con select2.
  static getMaterialWithSelect2(term) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MaterialStore.getMaterialWithSelect2(term))
      } catch (err) {
        reject(err)
      }
    })
  }

}

module.exports = {
  MaterialController
}
