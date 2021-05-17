import {Coverage} from './model'

// Listar areas cobertura.
export async function getCoverages(query) {

}

// devolver cobertura por id.
export async function getCoverage(id) {
  return Coverage.findById(id)
}

// registrar cobertura.
export async function createCoverage(coverage) {
  const _coverage = new Coverage(coverage)
  await _coverage.save()
  return _coverage
}

// actualizar cobertura.
export async function updateCoverage(id, coverage) {
  return Coverage.findByIdAndUpdate(id, coverage, {new: true})
}

// borrar cobertura.
export async function deleteCoverage(id) {
  return Coverage.findByIdAndDelete(id)
}
