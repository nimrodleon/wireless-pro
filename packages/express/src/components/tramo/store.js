import {Tramo} from './model'
import {CoverageStore} from '../coverage/store'

// CRUD - Tramos.
export class TramoStore {
  // Listar tramos.
  static async getTramos(query = '') {
    return Tramo.find({
      isDeleted: false,
      tramo: {
        $regex: query
      }
    }).populate('coverage')
  }

  // devolver tramo por id.
  static async getTramo(id) {
    return Tramo.findById(id)
  }

  // registrar tramo.
  static async createTramo(data) {
    let _tramo = new Tramo(data)
    await _tramo.save()
    return _tramo
  }

  // actualizar tramo.
  static async updateTramo(id, data) {
    return Tramo.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar tramo.
  static async deleteTramo(id) {
    let _tramo = await this.getTramo(id)
    _tramo.isDeleted = true
    return this.updateTramo(id, _tramo)
  }

  // tramos de por areas de cobertura.
  static async getTramosByDistinctCoverage() {
    return Tramo.find().distinct('coverage')
  }

  // areas de cobertura x tramos.
  static async getCoveragesByTramos() {
    return CoverageStore.getCoveragesByTramosOrTowers(this.getTramosByDistinctCoverage())
  }
}
