const {Coverage} = require("./coverage.model")

// CRUD - areas cobertura.
class CoverageService {
  // Listar áreas cobertura.
  async getCoverages(query) {
    return Coverage.find({
      isDeleted: false,
      $or: [{name: {$regex: query}}]
    }).sort({"name": 1})
  }

  // devolver cobertura por id.
  async getCoverage(id) {
    return Coverage.findById(id)
  }

  // registrar cobertura.
  async createCoverage({_id, ...data}) {
    const _coverage = new Coverage(data)
    await _coverage.save()
    return _coverage
  }

  // actualizar cobertura.
  async updateCoverage(id, data) {
    return Coverage.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar cobertura.
  async deleteCoverage(id) {
    let _coverage = await this.getCoverage(id)
    _coverage.isDeleted = true
    return this.updateCoverage(id, _coverage)
  }

  // areas de cobertura x => tramos/torres.
  // recibe un array de ids; x cada tramo de red o torre.
  async getCoveragesByTramosOrTowers(ids) {
    return Coverage.find({_id: {$in: ids}})
  }
}

module.exports = {
  CoverageService
}
