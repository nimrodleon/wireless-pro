const {Tramo} = require("./tramo.model")
const {CoverageService} = require("../coverage/coverage.service")

const coverageService = new CoverageService()

// CRUD - Tramos.
class TramoService {
  // Listar tramos.
  async getTramos(query = "") {
    return Tramo.find({
      isDeleted: false,
      tramo: {
        $regex: query
      }
    }).populate("coverage")
  }

  // Lista de tramos v1.
  async getTramosV1() {
    return Tramo.find({isDeleted: false})
  }

  // devolver tramo por id.
  async getTramo(id) {
    return Tramo.findById(id)
  }

  // registrar tramo.
  async createTramo({_id, ...data}) {
    let _tramo = new Tramo(data)
    await _tramo.save()
    return _tramo
  }

  // actualizar tramo.
  async updateTramo(id, data) {
    return Tramo.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar tramo.
  async deleteTramo(id) {
    let _tramo = await this.getTramo(id)
    _tramo.isDeleted = true
    return this.updateTramo(id, _tramo)
  }

  // areas de cobertura de los tramos.
  async getTramosByDistinctCoverage() {
    return Tramo.find({isDeleted: false}).distinct("coverage")
  }

  // areas de cobertura x tramos.
  async getCoveragesByTramos() {
    return coverageService.getCoveragesByTramosOrTowers(await this.getTramosByDistinctCoverage())
  }

  // obtener tramos por area cobertura.
  async getTramosByCoverage(id) {
    return Tramo.find({coverage: id})
  }
}

module.exports = {
  TramoService
}
