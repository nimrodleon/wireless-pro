import _ from 'lodash'
import {Averia} from './model'

// CRUD - averia.
export class AveriaStore {
  // Lista de averias.
  static async getAverias(query, status) {
    let _averias = await Averia.find({
      isDeleted: false,
      archived: status,
    }).populate({
      path: 'client',
      select: 'fullName phone',
      match: {fullName: {$regex: query}}
    }).populate({
      path: 'user',
      select: 'fullName'
    }).hint({$natural: -1}).limit(50)
    return _.filter(_averias, obj => obj.client != null)
  }

  // Lista de averias por servicio.
  static async getAveriasByServiceId(serviceId, year) {
    return Averia.find({serviceId: serviceId, year: year, isDeleted: false})
      .populate({path: 'user', select: 'fullName'}).hint({$natural: -1})
  }

  // Devolver averia por id.
  static async getAveria(id) {
    return Averia.findById(id)
  }

  // Crear averia.
  static async createAveria(data) {
    const _averia = new Averia(data)
    _averia.archived = false
    _averia.status = 'P'
    await _averia.save()
    return _averia
  }

  // Actualizar averia.
  static async updateAveria(id, data) {
    return Averia.findByIdAndUpdate(id, data, {new: true})
  }

  // Eliminar averia.
  static async deleteAveria(id) {
    let _averia = await this.getAveria(id)
    _averia.isDeleted = true
    return this.updateAveria(id, _averia)
  }
}
