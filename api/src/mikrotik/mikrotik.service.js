const {Interface, Mikrotik} = require("./mikrotik.model")
const {Service} = require("../service/model")

// CRUD - Mikrotik.
class MikrotikService {
  // Lista de mikrotik.
  async getMikrotikList() {
    return Mikrotik.find({isDeleted: false})
  }

  // Obtener por ID.
  async getMikrotikById(id) {
    return Mikrotik.findById(id)
  }

  // registrar.
  async createMikrotik(data) {
    let _mikrotik = new Mikrotik(data)
    await _mikrotik.save()
    return _mikrotik
  }

  // actualizar.
  async updateMikrotik(id, data) {
    return Mikrotik.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar.
  async deleteMikrotik(id) {
    let _mikrotik = await this.getMikrotikById(id)
    _mikrotik.isDeleted = true
    return this.updateMikrotik(id, _mikrotik)
  }

  // ============================================================

  // total servicios de mikrotik.
  async totalStatusServices(id, status) {
    return Service.find({
      mikrotikId: id, status: status, isDeleted: false,
      servicePlanId: {$exists: true}, interfaceId: {$exists: true}, coverageId: {$exists: true},
      ipAddress: {$exists: true}, macAddress: {$exists: true}, paymentType: {$exists: true},
    }).countDocuments()
  }

  // Lista de servicios por mikrotik.
  async getServicesList(id) {
    return Service.find({
      mikrotikId: id, status: {$in: ["HABILITADO", "SUSPENDIDO"]}, isDeleted: false,
      servicePlanId: {$exists: true}, interfaceId: {$exists: true}, coverageId: {$exists: true},
      ipAddress: {$exists: true}, macAddress: {$exists: true}, paymentType: {$exists: true},
    })
  }

  // ============================================================

  // lista de interfaces.
  async getInterfaceList(id) {
    return Interface.find({mikrotikId: id, isDeleted: false})
  }

  // obtener interfaz por id.
  async getInterfaceById(id) {
    return Interface.findById(id)
  }

  // registrar interfaz.
  async createInterface(data) {
    let _interface = new Interface(data)
    await _interface.save()
    return _interface
  }

  // actualizar interfaz.
  async updateInterface(id, data) {
    return Interface.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar interfaz.
  async deleteInterface(id) {
    let _interface = await this.getInterfaceById(id)
    _interface.isDeleted = true
    return this.updateInterface(id, _interface)
  }

}

module.exports = {
  MikrotikService
}
