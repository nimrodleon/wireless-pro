import {Averia} from './model'

// Lista de averias.
export async function getAverias(query, status) {

}

// Devolver averia por id.
export async function getAveria(id) {
  return Averia.findById(id).populate({path: 'client', select: 'fullName'})
}

// Crear averia.
export async function createAveria(data) {
  const _averia = new Averia(data)
  _averia.archived = false
  _averia.status = 'P'
  await _averia.save()
  return _averia
}

// Actualizar averia.
export async function updateAveria(id, data) {
  return Averia.findByIdAndUpdate(id, data, {new: true})
}

// Eliminar averia.
export async function deleteAveria(id) {
  return Averia.findByIdAndDelete(id)
}
