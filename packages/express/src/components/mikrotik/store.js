import {Interface, Mikrotik} from './model'
import {Service} from '../service/model'

// CRUD - Mikrotik.
export class MikrotikStore {
  // Lista de mikrotik.
  static async getMikrotikList() {
    return Mikrotik.find({isDeleted: false})
  }

  // Obtener por id.
  static async getMikrotikById(id) {
    return Mikrotik.findById(id)
  }

  // registrar.
  static async createMikrotik(data) {
    let _mikrotik = new Mikrotik(data)
    await _mikrotik.save()
    return _mikrotik
  }

  // actualizar.
  static async updateMikrotik(id, data) {
    return Mikrotik.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar.
  static async deleteMikrotik(id) {
    let _mikrotik = await this.getMikrotikById(id)
    _mikrotik.isDeleted = true
    return this.updateMikrotik(id, _mikrotik)
  }

  // ============================================================

  // total servicios de mikrotik.
  static async totalStatusServices(id, status) {
    return Service.find({mikrotikId: id, status: status, isDeleted: false}).countDocuments()
  }

  // ============================================================

  // lista de interfaces.
  static async getInterfaceList(id) {
    return Interface.find({mikrotikId: id, isDeleted: false})
  }

  // obtener interfaz por id.
  static async getInterfaceById(id) {
    return Interface.findById(id)
  }

  // registrar interfaz.
  static async createInterface(data) {
    let _interface = new Interface(data)
    await _interface.save()
    return _interface
  }

  // actualizar interfaz.
  static async updateInterface(id, data) {
    return Interface.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar interfaz.
  static async deleteInterface(id) {
    let _interface = await this.getInterfaceById(id)
    _interface.isDeleted = true
    return this.updateInterface(id, _interface)
  }

}
