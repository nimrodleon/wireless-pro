import {Ethernet, Mikrotik} from './model'

// CRUD - Mikrotik.
export class MikrotikStore {
  // Lista de mikrotik.
  static async getMikrotikList() {
    return Mikrotik.find({isDeleted: false})
  }

  // Obtener por id.
  static async getMikrotik(id) {
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
    let _mikrotik = await this.getMikrotik(id)
    _mikrotik.isDeleted = true
    return this.updateMikrotik(id, _mikrotik)
  }

  // ============================================================

  // lista de interfaces.
  static async getEthernetList() {
    return Ethernet.find({isDeleted: false})
  }

  // obtener interfaz por id.
  static async getEthernet(id) {
    return Ethernet.findById(id)
  }

  // registrar interfaz.
  static async createEthernet(data) {
    let _ethernet = new Ethernet(data)
    await _ethernet.save()
    return _ethernet
  }

  // actualizar interfaz.
  static async updateEthernet(id, data) {
    return Ethernet.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar interfaz.
  static async deleteEthernet(id) {
    let _ethernet = await this.getEthernet(id)
    _ethernet.isDeleted = true
    return this.updateEthernet(id, _ethernet)
  }

}
