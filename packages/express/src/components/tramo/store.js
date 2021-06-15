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

  // Lista de tramos v1.
  static async getTramosV1() {
    return Tramo.find({isDeleted: false})
  }

  // devolver tramo por id.
  static async getTramo(id) {
    return Tramo.findById(id)
  }

  // registrar tramo.
  static async createTramo({_id, ...data}) {
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

  // areas de cobertura de los tramos.
  static async getTramosByDistinctCoverage() {
    return Tramo.find({isDeleted: false}).distinct('coverage')
  }

  // areas de cobertura x tramos.
  static async getCoveragesByTramos() {
    return CoverageStore.getCoveragesByTramosOrTowers(await this.getTramosByDistinctCoverage())
  }

  // obtener tramos por area cobertura.
  static async getTramosByCoverage(id) {
    return Tramo.find({coverage: id})
  }
}
