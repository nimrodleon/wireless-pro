import {Tramo} from './model'

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

// tramos de coverages uniq.
export async function getTramosByCoverageUniq() {
  return Tramo.find().distinct('coverage')
}
