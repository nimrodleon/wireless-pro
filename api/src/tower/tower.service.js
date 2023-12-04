const {Tower} = require("./tower.model")
const {CoverageStore} = require("../coverage/coverage.service")

// CRUD - tower.
class TowerService {
  // Listar torres.
  async getTowers(query = "") {
    return Tower.find({
      isDeleted: false,
      tower: {
        $regex: query
      }
    }).populate("coverage")
  }

  // Lista de torres v1.
  async getTowersV1() {
    return Tower.find({isDeleted: false})
  }

  // devuelve una torre por id.
  async getTower(id) {
    return Tower.findById(id)
  }

  // registrar torre.
  async createTower({_id, ...data}) {
    let _tower = new Tower(data)
    await _tower.save()
    return _tower
  }

  // actualizar torre.
  async updateTower(id, data) {
    return Tower.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar torre.
  async deleteTower(id) {
    let _tower = await this.getTower(id)
    _tower.isDeleted = true
    return this.updateTower(id, _tower)
  }

  // torres por area cobertura.
  async getTowerByDistinctCoverage() {
    return Tower.find().distinct("coverage")
  }

  // areas de cobertura x torres.
  async getCoveragesByTowers() {
    return CoverageStore.getCoveragesByTramosOrTowers(this.getTowerByDistinctCoverage())
  }
}

module.exports = {
  TowerService
}
