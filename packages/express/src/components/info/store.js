import {Application, Info} from './model'

// CRUD - info.
export class InfoStore {
  // devolver info por id.
  static async getInfo() {
    if (Info.find().countDocuments() <= 0) {
      let _info = new Info({company: 'EMPRESA 1'})
      await _info.save()
    }
    return Info.findOne({})
  }

  // actualizar info.
  static async updateInfo(id, info) {
    return Info.findByIdAndUpdate(id, info, {new: true})
  }

  // ============================================================
  // Lista de aplicaciones.
  static async getApplications() {
    return Application.find({isDeleted: false})
  }

  // Obtener aplicación por id.
  static async getApplicationId(appId) {
    return Application.findById(appId)
  }

  // Agregar aplicación.
  static async createApplication(data) {
    let _application = new Application(data)
    await _application.save()
    return _application
  }

  // actualizar aplicación.
  static async updateApplication(id, data) {
    return Application.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar aplicación.
  static async deleteApplication(id) {
    let _application = await Application.findById(id)
    _application.isDeleted = true
    return Application.findByIdAndUpdate(id, _application)
  }

}
