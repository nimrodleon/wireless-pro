import {Coverage} from './model'

// Listar areas cobertura.
export async function getCoverages(query) {
  return Coverage.find({
    $or: [{name: {$regex: query}}]
  }).sort({'name': 1})
}

// devolver cobertura por id.
export async function getCoverage(id) {
  return Coverage.findById(id)
}

// registrar cobertura.
export async function createCoverage(data) {
  const _coverage = new Coverage(data)
  await _coverage.save()
  return _coverage
}

// actualizar cobertura.
export async function updateCoverage(id, data) {
  return Coverage.findByIdAndUpdate(id, data, {new: true})
}

// borrar cobertura.
export async function deleteCoverage(id) {
  let _coverage = await getCoverage(id)
  _coverage.isDeleted = true
  return updateCoverage(id, _coverage)
}

// areas de cobertura x => tramos/torres.
// recibe un array de ids; x cada tramo de red o torre.
export async function getCoveragesByTramosOrTowers(ids) {
  return Coverage.find({_id: {$in: ids}})
}
