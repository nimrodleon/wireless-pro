import {Tramo} from './model'
import {getCoveragesByTramosOrTowers} from '../coverage/store'

// Listar tramos.
export async function getTramos(query = '') {
  return Tramo.find({
    tramo: {
      $regex: query
    }
  }).populate('coverage')
}

// devolver tramo por id.
export async function getTramo(id) {
  return Tramo.findById(id)
}

// registrar tramo.
export async function createTramo(data) {
  let _tramo = new Tramo(data)
  await _tramo.save()
  return _tramo
}

// actualizar tramo.
export async function updateTramo(id, data) {
  return Tramo.findByIdAndUpdate(id, data, {new: true})
}

// borrar tramo.
export async function deleteTramo(id) {
  let _tramo = await getTramo(id)
  _tramo.isDeleted = true
  return updateTramo(id, _tramo)
}

// tramos de por areas de cobertura.
export async function getTramosByDistinctCoverage() {
  return Tramo.find().distinct('coverage')
}

// areas de cobertura x tramos.
export async function getCoveragesByTramos() {
  return getCoveragesByTramosOrTowers(getTramosByDistinctCoverage())
}
