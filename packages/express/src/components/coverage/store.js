import {Coverage} from './model'

// CRUD - areas cobertura.
export class CoverageStore {
  // Listar areas cobertura.
  static async getCoverages(query) {
    return Coverage.find({
      isDeleted: false,
      $or: [{name: {$regex: query}}]
    }).sort({'name': 1})
  }

  // devolver cobertura por id.
  static async getCoverage(id) {
    return Coverage.findById(id)
  }

  // registrar cobertura.
  static async createCoverage(data) {
    const _coverage = new Coverage(data)
    await _coverage.save()
    return _coverage
  }

  // actualizar cobertura.
  static async updateCoverage(id, data) {
    return Coverage.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar cobertura.
  static async deleteCoverage(id) {
    let _coverage = await this.getCoverage(id)
    _coverage.isDeleted = true
    return this.updateCoverage(id, _coverage)
  }

  // areas de cobertura x => tramos/torres.
  // recibe un array de ids; x cada tramo de red o torre.
  static async getCoveragesByTramosOrTowers(ids) {
    return Coverage.find({_id: {$in: ids}})
  }
}
