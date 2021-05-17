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
export async function createTramo(tramo) {
  let _tramo = new Tramo(tramo)
  await _tramo.save()
  return _tramo
}

// actualizar tramo.
export async function updateTramo(id, tramo) {
  return Tramo.findByIdAndUpdate(id, tramo, {new: true})
}

// borrar tramo.
export async function deleteTramo(id) {
  return Tramo.findByIdAndDelete(id)
}
