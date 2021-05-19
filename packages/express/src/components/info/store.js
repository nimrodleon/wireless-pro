import {Info} from './model'

// devolver info por id.
export async function getInfo() {
  if (Info.find().countDocuments() <= 0) {
    let _info = new Info({company: 'EMPRESA 1'})
    await _info.save()
  }
  return Info.findOne({})
}

// actualizar info.
export async function updateInfo(id, info) {
  return Info.findByIdAndUpdate(id, info, {new: true})
}
