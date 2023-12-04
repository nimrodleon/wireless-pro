const _ = require("lodash")
const {Averia} = require("./averia.model")

// CRUD - averia.
class AveriaService {
  // Lista de averias.
  async getAverias(query) {
    let _averias = await Averia.find({
      isDeleted: false,
      archived: false,
    }).populate({
      path: "client",
      select: "fullName phone",
      match: {fullName: {$regex: query}}
    }).populate({
      path: "user",
      select: "fullName"
    }).hint({$natural: -1})
    return _.filter(_averias, obj => obj.client != null)
  }

  // Lista de averias por servicio.
  async getAveriasByServiceId(serviceId, year) {
    return Averia.find({serviceId: serviceId, year: year, isDeleted: false})
      .populate({path: "user", select: "fullName"}).hint({$natural: -1})
  }

  // Devolver averia por id.
  async getAveria(id) {
    return Averia.findById(id)
  }

  // Crear averia.
  async createAveria(data) {
    const _averia = new Averia(data)
    _averia.archived = false
    _averia.status = "P"
    await _averia.save()
    return _averia
  }

  // Actualizar averia.
  async updateAveria(id, data) {
    return Averia.findByIdAndUpdate(id, data, {new: true})
  }

  // Eliminar averia.
  async deleteAveria(id) {
    let _averia = await this.getAveria(id)
    _averia.isDeleted = true
    return this.updateAveria(id, _averia)
  }
}

module.exports = {AveriaService}
