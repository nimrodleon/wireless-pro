import {Tower} from './model'

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
export async function createTower(tower) {
  let _tower = new Tower(tower)
  await _tower.save()
  return _tower
}

// actualizar torre.
export async function updateTower(id, tower) {
  return Tower.findByIdAndUpdate(id, tower, {new: true})
}

// borrar torre.
export async function deleteTower(id) {
  let _tower = await getTower(id)
  _tower.isDeleted = true
  return updateTower(id, _tower)
}
