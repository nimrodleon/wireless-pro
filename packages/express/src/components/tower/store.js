import {Tower} from './model'
import {getCoveragesByTramosOrTowers} from '../coverage/store'

// Listar torres.
export async function getTowers(query = '') {
  return Tower.find({
    tower: {
      $regex: query
    }
  }).populate('coverage')
}

// devuelve una torre por id.
export async function getTower(id) {
  return Tower.findById(id)
}

// registrar torre.
export async function createTower(data) {
  let _tower = new Tower(data)
  await _tower.save()
  return _tower
}

// actualizar torre.
export async function updateTower(id, data) {
  return Tower.findByIdAndUpdate(id, data, {new: true})
}

// borrar torre.
export async function deleteTower(id) {
  let _tower = await getTower(id)
  _tower.isDeleted = true
  return updateTower(id, _tower)
}

// torres por area cobertura.
export async function getTowerByDistinctCoverage() {
  return Tower.find().distinct('coverage')
}

// areas de cobertura x torres.
export async function getCoveragesByTowers() {
  return getCoveragesByTramosOrTowers(getTowerByDistinctCoverage())
}
