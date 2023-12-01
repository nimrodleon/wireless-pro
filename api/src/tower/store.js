const {Tower} = require("./model")
const {CoverageStore} = require("../coverage/store")

// CRUD - tower.
class TowerStore {
  // Listar torres.
  static async getTowers(query = "") {
    return Tower.find({
      isDeleted: false,
      tower: {
        $regex: query
      }
    }).populate("coverage")
  }

  // Lista de torres v1.
  static async getTowersV1() {
    return Tower.find({isDeleted: false})
  }

  // devuelve una torre por id.
  static async getTower(id) {
    return Tower.findById(id)
  }

  // registrar torre.
  static async createTower({_id, ...data}) {
    let _tower = new Tower(data)
    await _tower.save()
    return _tower
  }

  // actualizar torre.
  static async updateTower(id, data) {
    return Tower.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar torre.
  static async deleteTower(id) {
    let _tower = await this.getTower(id)
    _tower.isDeleted = true
    return this.updateTower(id, _tower)
  }

  // torres por area cobertura.
  static async getTowerByDistinctCoverage() {
    return Tower.find().distinct("coverage")
  }

  // areas de cobertura x torres.
  static async getCoveragesByTowers() {
    return CoverageStore.getCoveragesByTramosOrTowers(this.getTowerByDistinctCoverage())
  }
}

module.exports = {
  TowerStore
}
