const {Outage} = require("./model")

// CRUD - cortes de internet.
class OutageStore {
  // Listar outages.
  static async getOutages(idService) {
    return Outage.find({service: idService}).hint({$natural: -1}).limit(12)
  }

  // // devolver outage por id.
  // static async getOutage(id) {
  //   return Outage.findById(id)
  // }
  //
  // // register outage.
  // static async createOutage(data) {
  //   let _outage = new Outage(data)
  //   await _outage.save()
  //   return _outage
  // }
  //
  // // update outage.
  // static async updateOutage(id, data) {
  //   return Outage.findByIdAndUpdate(id, data, {new: true})
  // }
  //
  // // borrar outage.
  // static async deleteOutage(id) {
  //   let _outage = await this.getOutage(id)
  //   _outage.isDeleted = true
  //   return this.updateOutage(id, _outage)
  // }
}

module.exports = {
  OutageStore
}
