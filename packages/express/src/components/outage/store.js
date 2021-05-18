import {Outage} from './model'

// Listar outages.
export async function getOutages(idService) {
  return Outage.find({service: idService}).hint({$natural: -1}).limit(12)
}

// devolver outage por id.
export async function getOutage(id) {
  return Outage.findById(id)
}

// register outage.
export async function createOutage(data) {
  let _outage = new Outage(data)
  await _outage.save()
  return _outage
}
